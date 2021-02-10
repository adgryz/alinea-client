import * as React from 'react';
import { Texture, TextureLoader, RepeatWrapping } from 'three'
import { Euler, useLoader } from 'react-three-fiber'

import { Position } from 'models/generalTypes'

const boardTexture = require('../../../../../public/mainBoard.png').default;

interface IMainBoard {
    position: Position
}

const MainBoard = (props: IMainBoard) => {
    const texture = useLoader(TextureLoader, boardTexture);
    (texture as Texture).wrapS = RepeatWrapping;
    (texture as Texture).repeat.x = -1;
    (texture as Texture).flipY = false;

    return (
        <mesh {...props}>
            <boxBufferGeometry attach="geometry" args={[570, 2, 480]} />
            {texture && <meshPhongMaterial attach="material" map={texture as Texture} />}
        </mesh>
    )
}

export default MainBoard;