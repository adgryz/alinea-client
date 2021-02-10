import * as React from 'react';
import { Mesh } from 'three';
import { useFrame } from 'react-three-fiber';

import { Position } from 'models/generalTypes'
import socket from 'services/socket';
import { useRecoilValue } from 'recoil';
import { playerNicknameState } from 'models/player/atoms';
import { currentGameState, currentPlayerState } from 'models/games/atoms';

interface IEmpty {
    position: Position
    index: number
}

const Empty = ({ position, index }: IEmpty) => {
    const meshRef = React.useRef<Mesh>()
    const playerNickname = useRecoilValue(playerNicknameState);
    const currentGame = useRecoilValue(currentGameState);
    const currentPlayerId = useRecoilValue(currentPlayerState);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    const markSpot = () => {
        if (currentPlayerId !== playerNickname) {
            alert('Nie Twoja tura !');
            return;
        }
        socket.emit('markSpot', { playerId: playerNickname, index, gameId: currentGame.id });
    }

    const [hovered, setHover] = React.useState(false)

    return (
        <mesh
            position={position}
            ref={meshRef}
            onClick={markSpot}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxBufferGeometry args={[100, 100, 100]} />
            <meshStandardMaterial color={hovered ? 'orange' : 'wheat'} />
        </mesh>
    )
}

export default Empty;