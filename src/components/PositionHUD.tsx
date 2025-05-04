import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function PositionHUD({ playerRef }: { playerRef: React.RefObject<THREE.Object3D> }) {
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setPosition(playerRef.current.position.clone());
      }
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [playerRef]);

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      padding: '8px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'lime',
      fontFamily: 'monospace',
      zIndex: 1000
    }}>
      <div>X: {position.x.toFixed(2)}</div>
      <div>Y: {position.y.toFixed(2)}</div>
      <div>Z: {position.z.toFixed(2)}</div>
    </div>
  );
}
