"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BrainCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Safety check if still on mobile (though parent should handle this)
        if (window.matchMedia("(max-width: 768px)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const cont = containerRef.current;

        function hasWebGL() {
            try {
                const c = document.createElement('canvas');
                return !!(window.WebGLRenderingContext &&
                    (c.getContext('webgl') || c.getContext('experimental-webgl')));
            } catch (e) { return false; }
        }
        if (!hasWebGL()) return;

        let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
        let points: THREE.Points, lines: THREE.LineSegments;
        let frameId: number;
        let run = true, drag = false;
        let prev = { x: 0, y: 0 };
        let dragOffsetX = 0, dragOffsetY = 0;

        const initThree = () => {
            if (cont.firstChild) cont.removeChild(cont.firstChild);

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, cont.clientWidth / cont.clientHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

            renderer.setSize(cont.clientWidth, cont.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio || 1);
            cont.appendChild(renderer.domElement);

            scene.add(new THREE.AmbientLight(0xffffff, 0.4));
            const hemisphereLight = new THREE.HemisphereLight(0xA3B1AA, 0x5A665F, 0.5);
            scene.add(hemisphereLight);
            const d = new THREE.DirectionalLight(0xffffff, 0.8);
            d.position.set(5, 10, 8);
            scene.add(d);

            const mobile = window.matchMedia('(max-width:768px)').matches;
            const N = mobile ? 1200 : 2800;

            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(N * 3);

            for (let i = 0; i < N; i++) {
                const t = Math.random() * Math.PI * 2;
                const s = Math.random() * Math.PI;
                let x = 1.3 * Math.sin(s) * Math.cos(t);
                let y = 0.9 * Math.cos(s);
                let z = 1.3 * Math.sin(s) * Math.sin(t);

                const n = 0.15 * Math.sin(8 * t) * Math.sin(8 * s);
                x += n; z += n; x += x > 0 ? 0.3 : -0.3;

                pos[i * 3] = x;
                pos[i * 3 + 1] = y;
                pos[i * 3 + 2] = z;
            }

            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

            const mat = new THREE.PointsMaterial({
                color: 0x98A69C,
                size: 0.03,
                transparent: true,
                opacity: 0.7,
                sizeAttenuation: true
            });

            points = new THREE.Points(geo, mat);
            scene.add(points);

            const g2 = new THREE.BufferGeometry();
            const p2 = new Float32Array(500);

            for (let i = 0; i < 80; i++) {
                const a = Math.floor(Math.random() * N) * 3;
                const b = Math.floor(Math.random() * N) * 3;

                p2[i * 6] = pos[a];
                p2[i * 6 + 1] = pos[a + 1];
                p2[i * 6 + 2] = pos[a + 2];

                p2[i * 6 + 3] = pos[b];
                p2[i * 6 + 4] = pos[b + 1];
                p2[i * 6 + 5] = pos[b + 2];
            }

            g2.setAttribute('position', new THREE.BufferAttribute(p2, 3));
            const m2 = new THREE.LineBasicMaterial({ color: 0xA3B1AA, transparent: true, opacity: 0.15 });
            lines = new THREE.LineSegments(g2, m2);
            scene.add(lines);

            // Position initiale : incliné vers l'arrière pour voir les deux hémisphères par-dessus
            points.rotation.x = -0.5;
            lines.rotation.x = -0.5;

            camera.position.z = 4;

            const down = (e: MouseEvent | TouchEvent) => {
                drag = true;
                const p = 'touches' in e ? e.touches[0] : e;
                prev.x = p.clientX; prev.y = p.clientY;
            };

            const move = (e: MouseEvent | TouchEvent) => {
                if (!drag) return;
                const p = 'touches' in e ? e.touches[0] : e;
                const cx = p.clientX, cy = p.clientY;
                dragOffsetY += (cx - prev.x) * 0.008;
                dragOffsetX += (cy - prev.y) * 0.008;
                prev.x = cx; prev.y = cy;
            };

            const up = () => { drag = false; };

            cont.addEventListener('mousedown', down);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', up);
            cont.addEventListener('touchstart', down, { passive: true });
            window.addEventListener('touchmove', move, { passive: true });
            window.addEventListener('touchend', up, { passive: true });

            const animate = () => {
                if (!run) { frameId = requestAnimationFrame(animate); return; }

                // Rotation automatique lente 360° (1 tour en ~100 secondes)
                points.rotation.y += 0.001;
                lines.rotation.y += 0.001;

                // Interaction drag
                points.rotation.x += (dragOffsetX - points.rotation.x) * 0.05;
                points.rotation.y += (dragOffsetY) * 0.05;
                dragOffsetY *= 0.95;

                lines.rotation.x = points.rotation.x;
                lines.rotation.y = points.rotation.y;

                // Floating effect
                const t = Date.now() * 0.001;
                const floatingY = Math.sin(t) * 0.08;

                points.position.y = floatingY;
                lines.position.y = floatingY;

                renderer.render(scene, camera);
                frameId = requestAnimationFrame(animate);
            };

            animate();

            const handleResize = () => {
                const w = cont.clientWidth;
                const h = cont.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h, false);
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                cont.removeEventListener('mousedown', down);
                window.removeEventListener('mousemove', move);
                window.removeEventListener('mouseup', up);
                cont.removeEventListener('touchstart', down);
                window.removeEventListener('touchmove', move);
                window.removeEventListener('touchend', up);
                cancelAnimationFrame(frameId);
                renderer.dispose();
            };
        };

        const cleanup = initThree();
        const handleVisFunc = () => { run = !document.hidden; };
        document.addEventListener('visibilitychange', handleVisFunc);

        return () => {
            if (cleanup) cleanup();
            document.removeEventListener('visibilitychange', handleVisFunc);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full" id="brain-container" />;
}
