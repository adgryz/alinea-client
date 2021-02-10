import * as React from 'react';
import { Mesh } from 'three';
import { useFrame } from 'react-three-fiber';

import { Position } from 'models/generalTypes'
import socket from 'services/socket';

interface ICircle {
    position: Position
}

const Circle = ({ position }: ICircle) => {
    const meshRef = React.useRef<Mesh>()
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <mesh
            position={position}
            ref={meshRef}
        >
            <torusBufferGeometry args={[60, 20, 10, 30]} />
            <meshPhongMaterial color="blue" />
        </mesh>
    )
}

export default Circle;