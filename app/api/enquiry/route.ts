import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export const runtime='nodejs';
const rate=new Map<string,{count:number,reset:number}>();
export async function POST(req:Request){
 try {
  const key=(req.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();const now=Date.now();const previous=rate.get(key);const entry=previous&&previous.reset>now?previous:{count:0,reset:now+60_000};entry.count++;rate.set(key,entry);if(entry.count>5)return NextResponse.json({error:'Too many requests. Please try again in a minute.'},{status:429});
  if(Number(req.headers.get('content-length')||0)>15000)return NextResponse.json({error:'Request too large'},{status:413});
  const data=await req.json();if(data.website)return NextResponse.json({ok:true});
  const value=(k:string,max=200)=>typeof data[k]==='string'?data[k].trim().slice(0,max):'';
  const name=value('name',120),email=value('email'),category=value('category',120),area=value('area',120),budget=value('budget',120),timeframe=value('timeframe',100),message=value('message',5000);
  if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!['Residential project','Business / organisation','Community partnership','General question'].includes(category)||message.length<15||data.consent!=='yes')return NextResponse.json({error:'Please check the required fields.'},{status:400});
  const {SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASSWORD,ENQUIRY_TO,ENQUIRY_FROM}=process.env;
  if(!SMTP_HOST||!SMTP_USER||!SMTP_PASSWORD||!ENQUIRY_TO||!ENQUIRY_FROM)return NextResponse.json({error:'Enquiries are not yet configured. Please try again later.'},{status:503});
  const transporter=nodemailer.createTransport({host:SMTP_HOST,port:Number(SMTP_PORT||587),secure:Number(SMTP_PORT||587)===465,auth:{user:SMTP_USER,pass:SMTP_PASSWORD}});
  await transporter.sendMail({from:ENQUIRY_FROM,to:ENQUIRY_TO,replyTo:{name,address:email},subject:'New Belgicana Interior enquiry: '+category,text:[`Name: ${name}`,`Email: ${email}`,`Category: ${category}`,`Area: ${area}`,`Budget: ${budget}`,`Timescale: ${timeframe}`,'',`Message:\n${message}`].join('\n')});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'We could not send your enquiry at this time.'},{status:500});}
}
