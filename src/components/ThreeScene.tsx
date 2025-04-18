import { Canvas } from '@react-three/fiber';
import { PlayerCube } from './PlayerCube'; // adjust path as needed

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PlayerCube />
      <gridHelper args={[20, 20]} />
    </Canvas>
  );
}

