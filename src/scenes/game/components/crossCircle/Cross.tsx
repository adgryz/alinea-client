import * as React from 'react';
import { Mesh } from 'three';
import { useFrame } from 'react-three-fiber';

import { Position } from 'models/generalTypes'
import socket from 'services/socket';

interface ICross {
    position: Position
}

const Cross = ({ position }: ICross) => {
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
            <tetrahedronBufferGeometry args={[80, 0]} />
            <meshPhongMaterial color="red" />
        </mesh>
    )
}

export default Cross;