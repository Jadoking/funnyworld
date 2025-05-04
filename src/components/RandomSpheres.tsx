import React from 'react';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

type Props = {
  count?: number;
};

export default function RandomSpheres({ count = 100 }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const spheres = useMemo(() => {
    const data: {
      position: [number, number, number];
      radius: number;
      color: THREE.Color;
    }[] = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 0.5 + 0.1;

      const x = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      const y = radius; 

      const color = new THREE.Color(Math.random(), Math.random(), Math.random());

      data.push({
        position: [x, y, z],
        radius,
        color,
      });
    }

    return data;
  }, [count]);

  return (
    <group ref={groupRef}>
      {spheres.map(({ position, radius, color }, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
