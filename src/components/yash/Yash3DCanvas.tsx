import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface Yash3DCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export const Yash3DCanvas: React.FC<Yash3DCanvasProps> = ({ scrollYProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.04);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Center 3D Holographic Core (Icosahedron + Torus Rings + Data Nodes)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing core
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x005577,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Solid pulsing nucleus
    const nucGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const nucMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x4c1d95,
      roughness: 0.1,
      metalness: 0.9,
    });
    const nucleus = new THREE.Mesh(nucGeo, nucMat);
    coreGroup.add(nucleus);

    // Orbital Holographic Rings
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.8, 0.012, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // Orbiting Data Spheres
    const orbGroup = new THREE.Group();
    coreGroup.add(orbGroup);

    const orbColors = [0x00d4ff, 0x7c3aed, 0xec4899, 0xf97316];
    const orbs: THREE.Mesh[] = [];

    for (let i = 0; i < 6; i++) {
      const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({
        color: orbColors[i % orbColors.length],
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 2.4 + (i % 2) * 0.6;
      orb.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.5, Math.sin(angle) * radius);
      orbGroup.add(orb);
      orbs.push(orb);
    }

    // 3. Cyber Wireframe Ground Grid
    const gridHelper = new THREE.GridHelper(30, 40, 0x00d4ff, 0x27272a);
    gridHelper.position.y = -3.5;
    scene.add(gridHelper);

    // 4. Floating Star Particle Cloud
    const particleCount = 600;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const palette = [new THREE.Color('#00D4FF'), new THREE.Color('#7C3AED'), new THREE.Color('#EC4899')];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 2.5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 2.0, 20);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Camera Spline Path Points based on Scroll (Hero -> About -> Projects -> Contact)
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse smooth lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 3D Core Animations
      innerMesh.rotation.x = elapsed * 0.15;
      innerMesh.rotation.y = elapsed * 0.25;

      ring1.rotation.z = elapsed * 0.2;
      ring2.rotation.x = -elapsed * 0.15;
      ring3.rotation.y = elapsed * 0.18;

      orbGroup.rotation.y = elapsed * 0.35;
      particles.rotation.y = elapsed * 0.02;

      // Camera Trajectory Driven by Scroll
      const p = scrollYProgress.get();

      // Spline camera calculation
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 8;
      let targetLookY = 0;

      if (p < 0.28) {
        // Phase 0: Hero front view with slight right offset
        const t0 = p / 0.28;
        targetCamX = 1.2 + mouseRef.current.x * 0.6;
        targetCamY = 0.2 + mouseRef.current.y * 0.4;
        targetCamZ = 7.5 - t0 * 1.0;
        targetLookY = 0;
      } else if (p < 0.62) {
        // Phase 1: About & Skills 3D Orbit angle
        const t1 = (p - 0.28) / (0.62 - 0.28);
        const angle = Math.PI * 0.2 + t1 * Math.PI * 0.8;
        targetCamX = Math.sin(angle) * 5.5 + mouseRef.current.x * 0.5;
        targetCamY = 0.5 + Math.sin(t1 * Math.PI) * 0.8 + mouseRef.current.y * 0.4;
        targetCamZ = Math.cos(angle) * 5.5;
        targetLookY = 0.2;
      } else if (p < 0.88) {
        // Phase 2: Projects Overview Angle
        const t2 = (p - 0.62) / (0.88 - 0.62);
        targetCamX = -1.5 + t2 * 3.0 + mouseRef.current.x * 0.5;
        targetCamY = 1.2 - t2 * 0.6 + mouseRef.current.y * 0.4;
        targetCamZ = 6.2;
        targetLookY = -0.5;
      } else {
        // Phase 3: Contact wide angle
        const t3 = (p - 0.88) / (1 - 0.88);
        targetCamX = mouseRef.current.x * 0.4;
        targetCamY = -0.2 + mouseRef.current.y * 0.3;
        targetCamZ = 8.5 + t3 * 0.5;
        targetLookY = 0;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(0, targetLookY, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollYProgress]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none -z-10" />;
};

export default Yash3DCanvas;
