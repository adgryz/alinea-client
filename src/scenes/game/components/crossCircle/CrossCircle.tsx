import * as React from 'react';

import { Position } from 'models/generalTypes'

import Empty from './Empty'
import { currentGameState, gameStateState, playersShapesState } from 'models/games/atoms';
import { useRecoilValue } from 'recoil';
import Circle from './Circle';
import Cross from './Cross';
import { playerNicknameState } from 'models/player/atoms';
import { GameShape, GameState } from 'models/games/types';


interface ICrossCircle {
}

const positions: Position[] = [
    [-1, 1, 0],
    [-1, 0, 0],
    [-1, -1, 0],

    [0, 1, 0],
    [0, 0, 0],
    [0, -1, 0],

    [1, 1, 0],
    [1, 0, 0],
    [1, -1, 0],
]

const scale = 150;
const scaledPositions: Position[] = positions.map(position =>
    (position.map(coordinate => coordinate * scale) as Position))


const getComponentFomShape = (shape: GameShape) => {
    switch (shape) {
        case 'cross':
            return Cross;
        case 'circle':
            return Circle;
        default:
            return Empty;
    }
}
const CrossCircle = ({ }: ICrossCircle) => {
    const gameState = useRecoilValue(gameStateState);
    const playerNickname = useRecoilValue(playerNicknameState);
    const currentGame = useRecoilValue(currentGameState);
    const playersShapes = useRecoilValue(playersShapesState);

    if (!gameState || !currentGame) {
        return null;
    }

    const [opponentNickname] = currentGame.playersIds.filter(id => id !== playerNickname)

    const { fields } = gameState;
    const currentPlayerShape = playersShapes[playerNickname]
    const opponentShape = playersShapes[opponentNickname]
    const PlayerComponent = getComponentFomShape(currentPlayerShape);
    const OpponentComponent = getComponentFomShape(opponentShape);

    return (
        <>
            {
                scaledPositions.map((scaledPositions, index) => {
                    const elementState = fields[index];
                    switch (elementState) {
                        case playerNickname:
                            return <PlayerComponent key={index} position={scaledPositions} />;
                        case opponentNickname:
                            return <OpponentComponent key={index} position={scaledPositions} />;
                        default:
                            return <Empty key={scaledPositions.toString()} index={index} position={scaledPositions} />;
                    }

                })
            }
        </>
    )
}

export default CrossCircle;