import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, Rocket, Award, Info, Move3d } from 'lucide-react';

interface PillarData {
  name: string;
  category: string;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
}

const PILLARS: PillarData[] = [
  {
    name: 'AI & Data Science',
    category: 'NLP & Deep Learning',
    color: '#7C3AED',
    icon: Brain,
    description: 'Published NLP research, LLM pipelines, prompt engineering with Claude & Antigravity.',
  },
  {
    name: 'Full-Stack Engineering',
    category: 'React, Node, Cloud',
    color: '#EC4899',
    icon: Code,
    description: 'Modern performant web apps, interactive 3D WebGL interfaces, robust architectures.',
  },
  {
    name: 'Founder & Builder',
    category: 'Ninzae & Ventures',
    color: '#F97316',
    icon: Rocket,
    description: 'Founder of Ninzae & Umar Iqbal Store, transforming AI concepts into production products.',
  },
  {
    name: 'Leadership & Community',
    category: 'ACM Chapter VP',
    color: '#38BDF8',
    icon: Award,
    description: 'Vice President of ACM Student Chapter, hackathon organizer, tech speaker.',
  },
];

export const NeuralCore3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPillar, setSelectedPillar] = useState<PillarData | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D core components
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Outer Icosahedron Wireframe with glowing points
    const icosaGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const icosaWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaWireMaterial);
    rootGroup.add(icosaMesh);

    // Outer vertex points
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xec4899,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const icosaPoints = new THREE.Points(icosaGeometry, pointsMaterial);
    rootGroup.add(icosaPoints);

    // 2. Inner Pulsing Core (Octahedron / Sphere Wireframe)
    const coreGeometry = new THREE.OctahedronGeometry(1.2, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Central glowing point
    const centerPointGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const centerPointMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    });
    const centerSphere = new THREE.Mesh(centerPointGeo, centerPointMat);
    rootGroup.add(centerSphere);

    // 3. Holographic Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    rootGroup.add(ring2);

    // 4. Floating 3D Data Orbs around the perimeter
    const orbGroup = new THREE.Group();
    rootGroup.add(orbGroup);

    const orbMeshes: { mesh: THREE.Mesh; data: PillarData; basePos: THREE.Vector3 }[] = [];
    const orbRadius = 3.3;

    PILLARS.forEach((pillar, i) => {
      const angle = (i / PILLARS.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbRadius;
      const y = Math.sin(angle) * (orbRadius * 0.45);
      const z = Math.sin(angle) * (orbRadius * 0.75);

      const orbGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillar.color),
        transparent: true,
        opacity: 0.9,
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      orbMesh.position.set(x, y, z);
      orbMesh.userData = { pillarName: pillar.name };

      // Surrounding halo ring for each orb
      const haloGeo = new THREE.RingGeometry(0.3, 0.36, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillar.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      orbMesh.add(haloMesh);

      orbGroup.add(orbMesh);
      orbMeshes.push({ mesh: orbMesh, data: pillar, basePos: new THREE.Vector3(x, y, z) });
    });

    // Raycaster for Hover & Click detection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // Mouse Drag Rotation Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let autoRotateSpeed = 0.008;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      mouseVector.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousMousePosition = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Click handler for 3D orbs
    const handleClick = () => {
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(orbMeshes.map((o) => o.mesh));
      if (intersects.length > 0) {
        const hitOrb = orbMeshes.find((o) => o.mesh === intersects[0].object);
        if (hitOrb) {
          setSelectedPillar(hitOrb.data);
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', handleClick);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth rotation dampening
      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }

      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.08;

      // Internal animations
      icosaMesh.rotation.y -= delta * 0.2;
      icosaMesh.rotation.z += delta * 0.1;

      coreMesh.rotation.x += delta * 0.4;
      coreMesh.rotation.y += delta * 0.3;

      // Dynamic breathing core scale
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      ring1.rotation.z += delta * 0.15;
      ring2.rotation.y += delta * 0.2;

      // Raycast hover detection
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(orbMeshes.map((o) => o.mesh));
      if (intersects.length > 0) {
        const hitOrb = orbMeshes.find((o) => o.mesh === intersects[0].object);
        if (hitOrb) {
          setHoveredPillar(hitOrb.data.name);
          document.body.style.cursor = 'pointer';
        }
      } else {
        setHoveredPillar(null);
        document.body.style.cursor = 'default';
      }

      // Billboard halos to camera
      orbMeshes.forEach((orb) => {
        orb.mesh.children.forEach((child) => {
          child.quaternion.copy(camera.quaternion);
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full min-h-[380px] sm:min-h-[440px] cursor-grab active:cursor-grabbing" />

      {/* Floating 3D HUD Guide */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161617]/85 backdrop-blur-md border border-[#262627] text-[11px] font-semibold text-gray-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-brand-violet animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-wider">WebGL 3D Neural Core</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#161617]/85 backdrop-blur-md border border-[#262627] text-[10px] font-medium text-gray-400">
          <Move3d size={12} className="text-brand-pink animate-pulse" />
          <span>Drag to rotate 3D</span>
        </div>
      </div>

      {/* Hovered Pillar Tooltip */}
      <AnimatePresence>
        {hoveredPillar && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute bottom-4 z-20 pointer-events-none px-4 py-2 rounded-xl bg-[#161617]/95 backdrop-blur-lg border border-brand-violet/40 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.3)] flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-brand-pink" />
            <span>{hoveredPillar} (Click for details)</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal / Card for Selected 3D Pillar */}
      <AnimatePresence>
        {selectedPillar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-4 z-30 flex flex-col justify-between p-5 rounded-2xl bg-[#131316]/95 backdrop-blur-2xl border border-brand-violet/40 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2 rounded-xl border"
                    style={{
                      backgroundColor: `${selectedPillar.color}15`,
                      borderColor: `${selectedPillar.color}40`,
                    }}
                  >
                    <selectedPillar.icon size={18} style={{ color: selectedPillar.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">{selectedPillar.name}</h4>
                    <p className="text-[11px] text-gray-400">{selectedPillar.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="w-6 h-6 rounded-full bg-[#202024] text-gray-400 hover:text-white flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">{selectedPillar.description}</p>
            </div>

            <div className="pt-3 border-t border-[#262627] flex justify-end">
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-3.5 py-1.5 rounded-lg bg-vivid-gradient text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
              >
                Close View
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeuralCore3D;
