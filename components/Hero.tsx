"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { ArrowRight, Phone, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { openAuditModal } = useModal();

    useEffect(() => {
        if (!containerRef.current) return;
        const cont = containerRef.current;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        let run = true, auto = true, drag = false;
        let prev = { x: 0, y: 0 };
        let tx = 0, ty = 0;

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

            camera.position.z = 4;

            const down = (e: MouseEvent | TouchEvent) => {
                drag = true; auto = false;
                const p = 'touches' in e ? e.touches[0] : e;
                prev.x = p.clientX; prev.y = p.clientY;
            };

            const move = (e: MouseEvent | TouchEvent) => {
                if (!drag) return;
                const p = 'touches' in e ? e.touches[0] : e;
                const cx = p.clientX, cy = p.clientY;
                ty += (cx - prev.x) * 0.008;
                tx += (cy - prev.y) * 0.008;
                prev.x = cx; prev.y = cy;
            };

            const up = () => { drag = false; setTimeout(() => { if (!drag) auto = true; }, 1500); };

            cont.addEventListener('mousedown', down);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', up);
            cont.addEventListener('touchstart', down, { passive: true });
            window.addEventListener('touchmove', move, { passive: true });
            window.addEventListener('touchend', up, { passive: true });

            const animate = () => {
                if (!run) { frameId = requestAnimationFrame(animate); return; }
                if (auto) {
                    points.rotation.y += 0.001;
                    lines.rotation.y += 0.001;
                }
                points.rotation.x += (tx - points.rotation.x) * 0.05;
                points.rotation.y += (ty - points.rotation.y) * 0.05;
                lines.rotation.x = points.rotation.x;
                lines.rotation.y = points.rotation.y;
                const t = Date.now() * 0.0005;
                points.position.y = Math.sin(t) * 0.03;
                lines.position.y = points.position.y;
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

    return (
        <section className="relative bg-ink text-white overflow-hidden min-h-screen flex items-center">
            {/* Background Aura */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sauge/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-sauge/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24">
                {/* Value Proposition */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center lg:text-left space-y-8"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white"
                    >
                        Dominez Google<br />
                        <span className="text-sauge">Multipliez Votre Trafic Organique</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-body text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    >
                        Stratégies de <strong className="text-white">référencement naturel</strong> sur-mesure pour propulser votre site en première page. Doublez votre trafic et générez des leads qualifiés chaque mois.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6"
                    >
                        <Button
                            onClick={openAuditModal}
                            className="bg-sauge text-white hover:bg-sauge/90 hover:scale-105 shadow-2xl shadow-sauge/30 rounded-full h-16 px-10 text-base font-bold transition-all duration-300"
                        >
                            Audit Gratuit
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        <a
                            href="tel:0661139748"
                            className="flex items-center justify-center gap-3 h-16 px-10 rounded-full border-2 border-white/20 text-white hover:border-sauge hover:bg-white/5 transition-all duration-300 group"
                        >
                            <Phone className="w-5 h-5 group-hover:text-sauge transition-colors" />
                            <span className="font-bold text-base">06 61 13 97 48</span>
                        </a>
                    </motion.div>

                </motion.div>

                {/* 3D Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="h-[400px] lg:h-[650px] w-full relative group cursor-grab active:cursor-grabbing"
                >
                    <div ref={containerRef} className="absolute inset-0 w-full h-full" id="brain-container" />

                    {/* Interaction Hint */}
                    <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-40 transition-opacity flex items-center gap-2 pointer-events-none">
                        <MousePointer2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Interagissez</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
