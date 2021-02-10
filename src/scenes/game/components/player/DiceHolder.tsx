import * as React from 'react';
import * as THREE from 'three';

import { Position } from 'models/generalTypes'

interface IDiceHolder {
    position: Position
    color: string;
}

const geometry = new THREE.BufferGeometry();

const DiceHolder = ({ color, position }: IDiceHolder) => {
    return (
        <mesh position={position}>
            <boxBufferGeometry args={[20, 10, 20]} />
            <meshPhongMaterial color={color} />
        </mesh>
    )
}

export default DiceHolder;