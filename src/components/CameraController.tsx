import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CameraController({ targetRef }: { targetRef: React.RefObject<THREE.Object3D>})  {
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

export default CameraController;
