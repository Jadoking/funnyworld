import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import CameraController from './CameraController';
import PlayerCube from './PlayerCube';
import PositionHUD from './PositionHUD';
import RandomSpheres from './RandomSpheres';

function OriginManager({ playerRef }: { playerRef: React.RefObject<THREE.Object3D> }) {
  
  useFrame(() => {
    if (!playerRef.current) return;

    const maxDistance = 50;
    const playerPos = playerRef.current.position;
    const distanceFromOrigin = playerPos.length();

    if (distanceFromOrigin > maxDistance) {
      const shiftVector = playerPos.clone();

      playerRef.current.position.sub(shiftVector);

      console.log(`World shifted by`, shiftVector);
    }
  }); 

  return null;
}

export default function ThreeScene() {
  const cubeRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <PositionHUD playerRef={cubeRef as React.RefObject<THREE.Object3D>} />
      <Canvas style={{ width: '100vw', height: '100vh', backgroundColor: 'black'}}>
        <CameraController targetRef={cubeRef as React.RefObject<THREE.Object3D>} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <gridHelper args={[20, 20]} />
        <RandomSpheres count={100} />
        <OriginManager playerRef={cubeRef as React.RefObject<THREE.Object3D>} />
        <PlayerCube ref={cubeRef} />    
      </Canvas>
    </>
  );
}
