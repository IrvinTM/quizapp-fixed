import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { TextureLoader } from 'three';

function RotatingSphere() {
    const colorMap = useLoader(TextureLoader, 'quasarTexture.png');
    const sphereRef = useRef();

    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x += 0.001;
            sphereRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={sphereRef}>
            <sphereGeometry args={[2, 48, 48]} />
            <meshStandardMaterial map={colorMap} />
        </mesh>
    );
}

export default function Collaboration() {
    return (
        <>
            <h3 className="flex items-center justify-center h-20 text-xl text-white bg-[oklch(0.141_0.005_285.823)]">
                Want To Collaborate On This Project?
            </h3>
            
            <div className='flex items-center justify-center bg-[oklch(0.141_0.005_285.823)]'>
            <div className="flex items-center justify-between gap-4">
                    {/* h2 on the left */}
                <a href={'https://github.com/JayArch97/gcloud-testzilla/tree/dev'} className="text-white text-lg hover:text-blue-500">Join Us!</a>
                <div id="canvas-container" className='w-60 h-80 mt-0.5 bg-[oklch(0.141_0.005_285.823)]'>
               
                <Canvas>
                    <OrbitControls />
                    <ambientLight intensity={0.1} />
                    <directionalLight position={[0, 0, 5]} color="red" />
                    <RotatingSphere />
                </Canvas>
            </div>
            <a href={'https://github.com/JayArch97/gcloud-testzilla/tree/dev'} className="text-white text-lg hover:text-blue-500">Let's Build!</a>
         </div>
         </div>
        </>
    );
}
