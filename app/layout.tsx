import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Experience';
import './globals.css';
export const metadata:Metadata={title:{default:'Belgicana Interior | Beautiful Spaces. Real Budgets.',template:'%s | Belgicana Interior'},description:'Thoughtful, budget-conscious interior design, space planning and styling for homes, businesses and community spaces. Based near Luton.',openGraph:{title:'Belgicana Interior',description:'Beautiful spaces. Real budgets. Better wellbeing.',type:'website'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main id="main-content">{children}</main><Footer/></body></html>}
