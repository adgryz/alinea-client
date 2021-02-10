import * as React from 'react';

import { Position } from 'models/generalTypes'

interface ICurrencyTracker {
    position: Position
    color: string;
}

const CurrencyTracker = ({ position, color }: ICurrencyTracker) => {
    return (
        <mesh position={position}>
            <boxBufferGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default CurrencyTracker;