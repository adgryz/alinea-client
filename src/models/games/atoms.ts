import { atom } from 'recoil';
import { Game, GameShape, GameState } from './types'

export const gamesState = atom<Game[]>({
    key: 'gamesState',
    default: [],
});

export const currentGameState = atom<Game>({
    key: 'currentGameState',
    default: null,
})

export const gameStateState = atom<GameState>({
    key: 'gameStateState',
    default: undefined,
})

export const playersShapesState = atom<Record<string, GameShape>>({
    key: 'playersShapesState',
    default: {},
})

export const currentPlayerState = atom<string>({
    key: 'currentPlayerState',
    default: null,
})