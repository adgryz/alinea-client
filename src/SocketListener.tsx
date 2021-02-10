import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from "react-router-dom";

import { currentGameState, gamesState, gameStateState, playersShapesState, currentPlayerState } from 'models/games/atoms'
import { playerNicknameState } from 'models/player/atoms';
import { Game, GameState, IGameStartedPayload, IGameWonPayload, IPlayerTurnChangedPayload } from 'models/games/types';
import socket from 'services/socket';

const SocketListener = () => {
    const [games, setGames] = useRecoilState(gamesState);
    const [_currentGame, setCurrentGame] = useRecoilState(currentGameState);
    const [_gameState, setGameState] = useRecoilState(gameStateState);
    const [_playersShapes, setPlayersShapes] = useRecoilState(playersShapesState);
    const [_currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
    const playerNickname = useRecoilValue(playerNicknameState);

    const history = useHistory();

    React.useEffect(() => {
        socket.on('gamesUpdated', (games: Game[]) => {
            setGames(games);
        })
    }, []);

    React.useEffect(() => {
        socket.on('gameStateUpdated', (gameState: GameState) => {
            setGameState(gameState);
        })
    }, []);

    React.useEffect(() => {
        socket.on('gameStarted', ({ gameState, playersShapes, currentPlayerId }: IGameStartedPayload) => {
            const playersGame = games.find(game => game.playersIds.includes(playerNickname))
            setCurrentGame(playersGame);
            setGameState(gameState);
            setPlayersShapes(playersShapes);
            setCurrentPlayer(currentPlayerId);
            history.push("/game");
        })
    }, [])

    React.useEffect(() => {
        socket.on('playerTurnChanged',
            ({ currentPlayerId }: IPlayerTurnChangedPayload) => setCurrentPlayer(currentPlayerId))
    }, [])

    React.useEffect(() => {
        socket.on('gameWon',
            ({ winnerId }: IGameWonPayload) => {
                setTimeout(() => history.push("/lobby"), 1500)
                alert(`Player ${winnerId} won !`);
            })
    }, [])

    React.useEffect(() => {
        socket.on('draw',
            () => {
                setTimeout(() => history.push("/lobby"), 1500)
                alert("It's a DRAW !");
            })
    }, [])

    return (
        <div />
    )
}

export default SocketListener;