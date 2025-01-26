import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Points from "../Points/Points.tsx";

export default function Background() {
    return (
        <Canvas camera={{position: [0, 0, 2], fov: 70}}
                className="absolute top-0 left-0 w-full"
        >
            <ambientLight intensity={0.5}/>
            <OrbitControls enableZoom={false}/>
            <Points/>
        </Canvas>
    );
};
