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
    scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Character & Workstation Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Track animatable parts for procedural character
    let headMesh: THREE.Group | null = null;
    let bodyGroup: THREE.Group | null = null;
    let laptopScreenMat: THREE.MeshBasicMaterial | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    // -------------------------------------------------------------
    // ATTEMPT TO LOAD .GLB MODEL OR BUILD PROCEDURAL 3D DEVELOPER
    // -------------------------------------------------------------
    const loader = new GLTFLoader();
    loader.load(
      '/character.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.8, 1.8, 1.8);
        model.position.set(0, -2.5, 0);
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        stageGroup.add(model);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      () => {
        // Fallback: Build High-End Procedural 3D Developer Character & Cyber Desk
        const charGroup = new THREE.Group();
        stageGroup.add(charGroup);
        charGroup.position.set(0, -0.8, 0);

        // Body Group (Turtleneck & Shoulders)
        bodyGroup = new THREE.Group();
        charGroup.add(bodyGroup);

        // Dark Turtleneck Torso
        const torsoGeo = new THREE.CylinderGeometry(0.7, 0.85, 1.6, 32);
        const turtleneckMat = new THREE.MeshStandardMaterial({
          color: 0x18181b,
          roughness: 0.8,
          metalness: 0.1,
        });
        const torso = new THREE.Mesh(torsoGeo, turtleneckMat);
        torso.position.y = 0.8;
        torso.castShadow = true;
        bodyGroup.add(torso);

        // Turtleneck Collar
        const collarGeo = new THREE.TorusGeometry(0.35, 0.12, 16, 32);
        const collar = new THREE.Mesh(collarGeo, turtleneckMat);
        collar.rotation.x = Math.PI / 2;
        collar.position.y = 1.65;
        bodyGroup.add(collar);

        // Shoulders
        const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
        const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), shoulderMat);
        leftShoulder.position.set(-0.9, 1.45, 0);
        bodyGroup.add(leftShoulder);

        const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), shoulderMat);
        rightShoulder.position.set(0.9, 1.45, 0);
        bodyGroup.add(rightShoulder);

        // Arms resting toward desk
        const armMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
        const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.2, 16), armMat);
        leftArm.rotation.z = Math.PI / 6;
        leftArm.rotation.x = -Math.PI / 4;
        leftArm.position.set(-0.9, 0.8, 0.4);
        bodyGroup.add(leftArm);

        const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.2, 16), armMat);
        rightArm.rotation.z = -Math.PI / 6;
        rightArm.rotation.x = -Math.PI / 4;
        rightArm.position.set(0.9, 0.8, 0.4);
        bodyGroup.add(rightArm);

        // Head Group (Neck, Face, Hair, Glasses)
        headMesh = new THREE.Group();
        headMesh.position.set(0, 1.95, 0);
        charGroup.add(headMesh);

        // Neck
        const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.5, 24);
        const skinMat = new THREE.MeshStandardMaterial({
          color: 0xd4a373,
          roughness: 0.6,
          metalness: 0.05,
        });
        const neck = new THREE.Mesh(neckGeo, skinMat);
        neck.position.y = 0.15;
        headMesh.add(neck);

        // Head / Face
        const headGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const head = new THREE.Mesh(headGeo, skinMat);
        head.position.y = 0.65;
        head.scale.set(0.9, 1.05, 0.95);
        headMesh.add(head);

        // Hair
        const hairMat = new THREE.MeshStandardMaterial({ color: 0x0f0f11, roughness: 0.9 });
        const hairGeo = new THREE.SphereGeometry(0.58, 24, 24);
        const hair = new THREE.Mesh(hairGeo, hairMat);
        hair.position.set(0, 0.8, -0.08);
        hair.scale.set(0.95, 0.85, 0.95);
        headMesh.add(hair);

        // Glasses Frame (Dark Clear Glasses)
        const glassesGroup = new THREE.Group();
        glassesGroup.position.set(0, 0.68, 0.5);

        const frameMat = new THREE.MeshStandardMaterial({ color: 0x111115, metalness: 0.8, roughness: 0.2 });
        const lensMat = new THREE.MeshPhysicalMaterial({
          color: 0x00d4ff,
          transparent: true,
          opacity: 0.35,
          roughness: 0.1,
          transmission: 0.9,
        });

        // Left Lens & Rim
        const leftRim = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 16, 32), frameMat);
        leftRim.position.set(-0.24, 0, 0);
        glassesGroup.add(leftRim);

        const leftLens = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), lensMat);
        leftLens.position.set(-0.24, 0, 0);
        glassesGroup.add(leftLens);

        // Right Lens & Rim
        const rightRim = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 16, 32), frameMat);
        rightRim.position.set(0.24, 0, 0);
        glassesGroup.add(rightRim);

        const rightLens = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), lensMat);
        rightLens.position.set(0.24, 0, 0);
        glassesGroup.add(rightLens);

        // Bridge
        const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.16), frameMat);
        bridge.rotation.z = Math.PI / 2;
        bridge.position.set(0, 0.04, 0);
        glassesGroup.add(bridge);

        headMesh.add(glassesGroup);

        // -------------------------------------------------------------
        // CYBER WORKSTATION (Desk + Holographic Laptop + Ambient Lighting)
        // -------------------------------------------------------------
        const deskGroup = new THREE.Group();
        deskGroup.position.set(0, 0.1, 1.0);
        charGroup.add(deskGroup);

        // Glassmorphic Cyber Desk Surface
        const deskGeo = new THREE.BoxGeometry(3.6, 0.08, 1.6);
        const deskMat = new THREE.MeshStandardMaterial({
          color: 0x16161a,
          roughness: 0.2,
          metalness: 0.8,
        });
        const desk = new THREE.Mesh(deskGeo, deskMat);
        deskGroup.add(desk);

        // Desk Edge Neon LED Strip
        const ledGeo = new THREE.BoxGeometry(3.64, 0.02, 0.02);
        const ledMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(0, 0.04, 0.8);
        deskGroup.add(led);

        // Laptop Base
        const lapBase = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.03, 0.6),
          new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.9, roughness: 0.2 })
        );
        lapBase.position.set(0, 0.06, 0.2);
        deskGroup.add(lapBase);

        // Laptop Screen (Tilted)
        const screenGroup = new THREE.Group();
        screenGroup.position.set(0, 0.08, -0.08);
        screenGroup.rotation.x = -Math.PI / 8;
        deskGroup.add(screenGroup);

        const lapLid = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.6, 0.02),
          new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9 })
        );
        screenGroup.add(lapLid);

        // Glowing Screen Display with AI code reflection
        laptopScreenMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
        const screenDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.54), laptopScreenMat);
        screenDisplay.position.z = 0.015;
        screenGroup.add(screenDisplay);

        // Point Light illuminating Character from Laptop Screen
        const screenGlow = new THREE.PointLight(0x00d4ff, 2.5, 3.5);
        screenGlow.position.set(0, 0.4, 0.3);
        deskGroup.add(screenGlow);

        // Floating Holographic Rings around workspace
        const ring1 = new THREE.Mesh(
          new THREE.TorusGeometry(2.4, 0.015, 16, 80),
          new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4 })
        );
        ring1.rotation.x = Math.PI / 3;
        charGroup.add(ring1);

        const ring2 = new THREE.Mesh(
          new THREE.TorusGeometry(2.9, 0.012, 16, 80),
          new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.3 })
        );
        ring2.rotation.x = -Math.PI / 4;
        charGroup.add(ring2);
      }
    );

    // 3. Cyber Wireframe Floor Grid
    const gridHelper = new THREE.GridHelper(30, 40, 0x00d4ff, 0x27272a);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // 4. Ambient Floating Dust Particles
    const particleCount = 450;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color('#00D4FF'), new THREE.Color('#7C3AED'), new THREE.Color('#EC4899')];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 14;

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
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Key Light (Warm soft studio spotlight from top-left)
    const keyLight = new THREE.SpotLight(0xffffff, 4.0, 25, Math.PI / 4, 0.4);
    keyLight.position.set(4, 6, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cyan Rim Light (Cyber edge glow from right)
    const cyanRim = new THREE.DirectionalLight(0x00d4ff, 3.0);
    cyanRim.position.set(-6, 3, -3);
    scene.add(cyanRim);

    // Pink Fill Light from back
    const pinkFill = new THREE.DirectionalLight(0xec4899, 2.0);
    pinkFill.position.set(4, -2, -4);
    scene.add(pinkFill);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Render Loop with Camera Trajectory on Scroll
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (mixer) mixer.update(delta);

      // Mouse smooth lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Character procedural subtle breathing & head tracking
      if (bodyGroup) {
        bodyGroup.position.y = Math.sin(elapsed * 1.6) * 0.02;
      }
      if (headMesh) {
        headMesh.rotation.y = mouseRef.current.x * 0.35;
        headMesh.rotation.x = -mouseRef.current.y * 0.25;
        headMesh.position.y = 1.95 + Math.sin(elapsed * 1.6) * 0.015;
      }

      particles.rotation.y = elapsed * 0.02;

      // Camera Trajectory along 3D Spline Path driven by scroll
      const p = scrollYProgress.get();

      let targetCamX = 0;
      let targetCamY = 0.5;
      let targetCamZ = 7.5;
      let targetLookY = 0.2;

      if (p < 0.28) {
        // Section 0: Hero - Direct front portrait view with slight offset
        const t0 = p / 0.28;
        targetCamX = 0.8 + mouseRef.current.x * 0.5;
        targetCamY = 0.6 + mouseRef.current.y * 0.3;
        targetCamZ = 6.8 - t0 * 0.6;
        targetLookY = 0.4;
      } else if (p < 0.62) {
        // Section 1: About & Skills - 3D Orbit around Character
        const t1 = (p - 0.28) / (0.62 - 0.28);
        const angle = Math.PI * 0.15 + t1 * Math.PI * 0.7;
        targetCamX = Math.sin(angle) * 5.2 + mouseRef.current.x * 0.4;
        targetCamY = 0.8 + Math.sin(t1 * Math.PI) * 0.5 + mouseRef.current.y * 0.3;
        targetCamZ = Math.cos(angle) * 5.2;
        targetLookY = 0.5;
      } else if (p < 0.88) {
        // Section 2: Projects - Desk & Laptop view
        const t2 = (p - 0.62) / (0.88 - 0.62);
        targetCamX = -1.2 + t2 * 2.4 + mouseRef.current.x * 0.4;
        targetCamY = 1.0 - t2 * 0.4 + mouseRef.current.y * 0.3;
        targetCamZ = 5.8;
        targetLookY = 0.1;
      } else {
        // Section 3: Contact - Cinematic wide angle
        const t3 = (p - 0.88) / (1 - 0.88);
        targetCamX = mouseRef.current.x * 0.3;
        targetCamY = 0.4 + mouseRef.current.y * 0.2;
        targetCamZ = 7.8 + t3 * 0.6;
        targetLookY = 0.2;
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
