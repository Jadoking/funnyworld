import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import PlayerCube from './PlayerCube'; // adjust path as needed

function CameraController({ targetRef}: { targetRef: React.RefObject<THREE.Object3D >}) {
  const camera = useThree((state) => state.camera);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!targetRef.current) return;

    const target = targetRef.current.position;
    
    camera.position.set(target.x, target.y + 2, target.z + 5);
    camera.lookAt(target);
  });
  
  return (
    <PerspectiveCamera
      makeDefault
      ref={cameraRef}
      fov={50}
    /> 
  );
}
 
export default function ThreeScene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  return (
    <Canvas style={{ width: '100vw', height: '100vh', backgroundColor: 'black'}}>
      <CameraController targetRef={cubeRef} />

      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <gridHelper args={[20, 20]} />
      <PlayerCube ref={cubeRef} />    
    </Canvas>
  );
}
