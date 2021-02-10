import * as React from 'react';
import { useRecoilValue, useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil';
import { Canvas, Euler } from 'react-three-fiber'

import { currentGameState, gameStateState } from 'models/games/atoms';
// import PlayerBoard from './components/player/PlayerBoard';
// import MainBoard from './components/common/MainBoard';
import { Position } from 'models/generalTypes';
import CrossCircle from './components/crossCircle/CrossCircle';

interface IPlayerConfig {
    order: number
    color: string
    boardRotation: Euler
    boardPosition: Position
}

const getPlayersConfigs = (playersCount: number) => {
    const playersConfig: IPlayerConfig[] = [
        {
            order: 1,
            color: 'red',
            boardRotation: [0, 0, 0],
            boardPosition: [0, 0, -320]
        },
        {
            order: 2,
            color: 'blue',
            boardRotation: [0, Math.PI / 2, 0],
            boardPosition: [-360, 0, 0]
        },
        {
            order: 3,
            color: 'yellow',
            boardRotation: [0, 2 * Math.PI / 2, 0],
            boardPosition: [0, 0, 320]
        },
        {
            order: 4,
            color: 'black',
            boardRotation: [0, 3 * Math.PI / 2, 0],
            boardPosition: [360, 0, 0]
        },
    ];

    return playersConfig.slice(0, playersCount)
}

const Game = () => {
    const currentGame = useRecoilValue(currentGameState);
    const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

    const playersCount = 4;
    // const playersConfigs = getPlayersConfigs(playersCount);

    return (
        <div>
            Coimbra game of { currentGame ? currentGame.playersIds : ''}
            <div>
                <Canvas
                    style={{ height: '100vh', width: '100vw' }}
                    camera={{
                        position: [0, 300, -500],
                    }}>
                    <RecoilBridge>
                        <React.Suspense fallback={null}>
                            <ambientLight />
                            <pointLight position={[60, -400, -300]} intensity={1} />
                            <CrossCircle />
                            {/* <MainBoard position={[0, 0, 0]} />
                        {
                            playersConfigs.map(config => <PlayerBoard
                                key={config.order}
                                rotation={config.boardRotation}
                                position={config.boardPosition}
                                color={config.color} />)
                        } */}
                        </React.Suspense>
                    </RecoilBridge>
                </Canvas>
            </div>
        </div>
    )
}

export default Game;