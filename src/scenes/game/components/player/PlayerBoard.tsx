import * as React from 'react';
import { Euler, useLoader } from 'react-three-fiber'
import { Texture, TextureLoader, RepeatWrapping } from 'three'

import { Position } from 'models/generalTypes'

import CurrencyTracker from './CurrencyTracker';
import DiceHolder from './DiceHolder';

const boardTexture = require('../../../../../public/playerBoard.jpg').default;

interface IPlayerBoard {
    position: Position
    rotation: Euler
    color: string
}

interface IDiceHolderConfig {
    id: number,
    position: Position
}

const diceHolders: IDiceHolderConfig[] = [
    {
        id: 1,
        position: [24, 5 + 10, -35]
    },
    {
        id: 2,
        position: [-4, 5 + 10, -35]
    },
    {
        id: 3,
        position: [-34, 5 + 10, -35]
    }
]

const PlayerBoard = ({ position, color, rotation }: IPlayerBoard) => {
    const texture = useLoader(TextureLoader, boardTexture);
    (texture as Texture).wrapS = RepeatWrapping;
    (texture as Texture).repeat.x = -1;
    (texture as Texture).flipY = false;

    return (
        <mesh position={position} rotation={rotation}>
            <boxBufferGeometry attach="geometry" args={[280, 2, 100]} />
            {texture && <meshPhongMaterial attach="material" map={texture as Texture} />}
            <CurrencyTracker position={[26, 10, 23]} color={color} />
            <CurrencyTracker position={[26, 10, -3]} color={color} />
            {diceHolders.map(({ id, position }) => <DiceHolder
                key={id}
                color={color}
                position={position} />)}
        </mesh>
    )
}

export default PlayerBoard;