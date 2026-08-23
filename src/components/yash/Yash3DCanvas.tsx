import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
    scene.fog = new THREE.FogExp2(0x09090b, 0.03);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. 3D Cyber Environment Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    let mixer: THREE.AnimationMixer | null = null;

    // Load custom .glb if placed in public folder
    const loader = new GLTFLoader();
    loader.load(
      '/character.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.8, 1.8, 1.8);
        model.position.set(0, -2.5, 0);
        stageGroup.add(model);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      () => {
        // No heavy procedural dummy - clean ambient cyber rings and grid
      }
    );

    // 3. Cyber Wireframe Floor Grid
    const gridHelper = new THREE.GridHelper(32, 40, 0x00d4ff, 0x27272a);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // 4. Ambient Star Particle Universe
    const particleCount = 400;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color('#00D4FF'), new THREE.Color('#7C3AED'), new THREE.Color('#EC4899')];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 2.0, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 1.5, 20);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Render Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (mixer) mixer.update(delta);

      // Mouse smooth lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      particles.rotation.y = elapsed * 0.015;

      // Camera Trajectory along 3D Spline Path driven by scroll
      const p = scrollYProgress.get();

      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 7.5;
      let targetLookY = 0;

      if (p < 0.28) {
        // Section 0: Hero
        const t0 = p / 0.28;
        targetCamX = mouseRef.current.x * 0.4;
        targetCamY = mouseRef.current.y * 0.2;
        targetCamZ = 7.5 - t0 * 0.5;
        targetLookY = 0;
      } else if (p < 0.62) {
        // Section 1: About & Skills
        const t1 = (p - 0.28) / (0.62 - 0.28);
        targetCamX = Math.sin(t1 * Math.PI) * 1.5 + mouseRef.current.x * 0.3;
        targetCamY = 0.3 + mouseRef.current.y * 0.2;
        targetCamZ = 7.0;
        targetLookY = 0;
      } else if (p < 0.88) {
        // Section 2: Projects
        const t2 = (p - 0.62) / (0.88 - 0.62);
        targetCamX = -1.0 + t2 * 2.0 + mouseRef.current.x * 0.3;
        targetCamY = 0.5 + mouseRef.current.y * 0.2;
        targetCamZ = 6.8;
        targetLookY = -0.2;
      } else {
        // Section 3: Contact
        const t3 = (p - 0.88) / (1 - 0.88);
        targetCamX = mouseRef.current.x * 0.2;
        targetCamY = mouseRef.current.y * 0.2;
        targetCamZ = 8.0 + t3 * 0.5;
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
