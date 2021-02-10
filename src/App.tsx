import * as React from 'react'
import { hot } from 'react-hot-loader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Lobby from 'scenes/lobby/Lobby';
import Login from 'scenes/login/Login';
import Game from 'scenes/game/Game';
import SocketListener from './SocketListener';

const App = () => {
    return (
        <Router>
            <SocketListener />
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/lobby">
                    <Lobby />
                </Route>
                <Route exact path="/game">
                    <Game />
                </Route>
            </Switch>
        </Router>
    )
}

export default hot(module)(App)