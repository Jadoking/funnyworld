import { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PlayerCube = forwardRef<THREE.Mesh>((_, ref) => {
  const localRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(0); // vertical velocity (Y axis)
  const isGrounded = useRef(true);
  const gravity = -0.01;
  const jumpForce = 0.2;

  useImperativeHandle(ref, () => localRef.current!, []);

  const [movement, setMovement] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    space: false
  });

  // Listen to keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in movement) {
        setMovement((m) => ({ ...m, [e.key]: true }));
      }
      if (e.key === " ") {
        setMovement((m) => ({ ...m, space: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in movement) {
        setMovement((m) => ({ ...m, [e.key]: false }));
      }
      if (e.key === " ") {
        setMovement((m) => ({ ...m, space: false}));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Move on every frame
  useFrame(() => {
    const mesh = localRef.current;
    if (!mesh) return;

    const speed = 0.05;
    if (movement.w || movement.ArrowUp) mesh.position.z -= speed;
    if (movement.s || movement.ArrowDown) mesh.position.z += speed;
    if (movement.a || movement.ArrowLeft) mesh.position.x -= speed;
    if (movement.d || movement.ArrowRight) mesh.position.x += speed;

    // Apply jump force
    if (movement.space && isGrounded.current) {
      velocity.current = jumpForce;
      isGrounded.current = false;
    }

    // Apply gravity
    velocity.current += gravity;
    mesh.position.y += velocity.current;

    // Ground collision
    if (mesh.position.y <= 0.5) {
      mesh.position.y = 0.5;
      velocity.current = 0;
      isGrounded.current = true;
    }
  });

  return (
    <mesh ref={localRef} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
});

export default PlayerCube;
