export interface Game {
    ownerId: string;
    playersIds: string[];
    id: string;
    playersNumber: number;
    currentPlayersNumber: number;
    gameState?: GameState;
}

export interface GameState {
    fields: (string | null)[];
}


export interface IGameStartedPayload {
    gameState: GameState
    playersShapes: Record<string, GameShape>
    currentPlayerId: string
}

export interface IPlayerTurnChangedPayload {
    currentPlayerId: string
}

export interface IGameWonPayload {
    winnerId: string
}

export type GameShape = "cross" | "circle"
