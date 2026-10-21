'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei/core/Environment';
import { RoundedBox } from '@react-three/drei/core/RoundedBox';
import { useRef } from 'react';
import * as THREE from 'three';
function Interior() {
 const group = useRef<THREE.Group>(null);
 useFrame(({pointer}) => { if(group.current){ group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -.18 + pointer.x * .09, .025); group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * -.035, .025); }});
 return <group ref={group} rotation={[0,-.18,0]}>
  <mesh position={[0,-1.45,0]} receiveShadow><boxGeometry args={[7,.14,5.6]}/><meshStandardMaterial color="#b99d7f" roughness={.85}/></mesh>
  <mesh position={[0,.9,-2.67]} receiveShadow><boxGeometry args={[7,4.6,.16]}/><meshStandardMaterial color="#eadfd1" roughness={1}/></mesh>
  <mesh position={[-3.43,.9,0]} receiveShadow><boxGeometry args={[.14,4.6,5.5]}/><meshStandardMaterial color="#dbccba" roughness={1}/></mesh>
  {/* wall art */}
  <mesh position={[.7,1.16,-2.54]}><boxGeometry args={[1.55,1.45,.05]}/><meshStandardMaterial color="#8b6f54"/></mesh>
  <mesh position={[.7,1.16,-2.48]}><planeGeometry args={[1.37,1.27]}/><meshStandardMaterial color="#e3d4bc"/></mesh>
  <mesh position={[.7,1.12,-2.43]} rotation={[0,0,-.3]}><torusGeometry args={[.4,.12,10,48,Math.PI*1.6]}/><meshStandardMaterial color="#a88f76"/></mesh>
  {/* sofa */}
  <RoundedBox args={[3.2,.64,1.18]} radius={.18} smoothness={4} position={[-.36,-.84,-.88]} castShadow><meshStandardMaterial color="#eee1cb" roughness={.94}/></RoundedBox>
  <RoundedBox args={[3.26,.78,.35]} radius={.15} smoothness={4} position={[-.36,-.37,-1.47]} castShadow><meshStandardMaterial color="#d6c4a8"/></RoundedBox>
  {[-1.66,.94].map(x=><RoundedBox key={x} args={[.35,.65,1.13]} radius={.14} position={[x,-.51,-.86]} castShadow><meshStandardMaterial color="#d8c7aa"/></RoundedBox>)}
  <RoundedBox args={[.68,.12,.56]} radius={.1} position={[-.96,-.39,-.9]} rotation={[0,0,.15]}><meshStandardMaterial color="#a88367"/></RoundedBox>
  <RoundedBox args={[.62,.12,.53]} radius={.1} position={[.27,-.35,-.95]} rotation={[0,0,-.22]}><meshStandardMaterial color="#f5ece0"/></RoundedBox>
  {/* rug */}
  <mesh position={[.12,-1.358,.7]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[3.65,2.3]}/><meshStandardMaterial color="#c7b69e" roughness={1}/></mesh>
  {/* low table */}
  <mesh position={[.1,-.75,.73]} castShadow><cylinderGeometry args={[.83,.83,.1,48]}/><meshStandardMaterial color="#987458" roughness={.65}/></mesh>
  <mesh position={[.1,-1.08,.73]} castShadow><cylinderGeometry args={[.39,.5,.6,32]}/><meshStandardMaterial color="#a98a68"/></mesh>
  <mesh position={[.1,-.64,.73]}><cylinderGeometry args={[.14,.14,.06,32]}/><meshStandardMaterial color="#e4d9c7"/></mesh>
  {/* floor lamp */}
  <mesh position={[2.36,-.1,-1.55]}><cylinderGeometry args={[.025,.03,2.8,14]}/><meshStandardMaterial color="#8c745d" metalness={.48}/></mesh>
  <mesh position={[2.36,1.3,-1.55]}><cylinderGeometry args={[.4,.28,.7,32]}/><meshStandardMaterial color="#f4e1c2" side={THREE.DoubleSide}/></mesh>
  {/* plant */}
  <mesh position={[-2.65,-1.05,.85]} castShadow><cylinderGeometry args={[.3,.22,.65,24]}/><meshStandardMaterial color="#b18a70"/></mesh>
  {Array.from({length:9},(_,i)=>{let a=i*Math.PI*2/9;return <mesh key={i} position={[-2.65+Math.cos(a)*.22,-.27+((i%3)*.13),.85+Math.sin(a)*.22]} rotation={[Math.sin(a)*.5,0,Math.cos(a)*-.48]}><sphereGeometry args={[.17,.55,.12,10,10]}/><meshStandardMaterial color={i%2?'#596b4d':'#768367'}/></mesh>})}
 </group>
}
export default function RoomScene(){return <Canvas shadows dpr={[1,1.6]} camera={{position:[5,2.5,8],fov:35}} gl={{antialias:true,alpha:true}}><ambientLight intensity={1.65}/><directionalLight position={[0,6,5]} intensity={2.5} castShadow shadow-mapSize={[1024,1024]}/><Interior/><Environment preset="apartment"/></Canvas>}
