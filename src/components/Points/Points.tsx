import * as THREE from "three";
import {useEffect, useMemo, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {generateArrayPoints} from "../../../utils/PointUtils.ts";
import gsap from "gsap";

const texture = new THREE.TextureLoader().load("/star/star.png");

export default function Points() {
    const pointsRef = useRef<THREE.Points>(null);
    const {camera} = useThree();
    const mouse = useRef({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    useFrame(() => {
        camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.0015;
        camera.position.y += (mouse.current.y * 2 - camera.position.y) * 0.0015;
        camera.lookAt(0, 0, 0);
    });

    const {vertices, colors} = useMemo(() => generateArrayPoints(2500), []);

    useEffect(() => {
        if (!pointsRef.current) return;

        const {geometry} = pointsRef.current;
        const count = vertices.length / 3;
        const delay = Array.from({length: count}, () => Math.random() * 2);

        for (let i = 0; i < count; i++) {
            gsap.to(colors, {
                [i * 4 + 3]: 1,
                duration: 1.5,
                delay: delay[i],
                onUpdate: () => {
                    geometry.attributes.color.needsUpdate = true;
                },
            });
        }

    }, [colors, vertices.length]);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={vertices.length / 3}
                    array={vertices}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 4}
                    array={colors}
                    itemSize={4}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                map={texture}
                transparent
                vertexColors
            />
        </points>
    );
};