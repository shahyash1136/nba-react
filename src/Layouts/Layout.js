import React, { Component } from "react";
import Home from "./Home/Home";
import Teams from "./Teams/Teams";
import Players from "./Players/Players";
import GamesList from "./Games-List/Games-List";
import Game from "./Game/Game";
import PlayerData from "./PlayerData/PlayerData";
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { Switch, Route } from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <div className="si-main">
                <div className="si-wrapper">
                    <Header />
                    <section className="body">
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/teams' component={Teams} />
                            <Route path='/players' component={Players} />
                            <Route path='/player/:playerName/:playerId' component={PlayerData} />
                            <Route path='/team/:teamName/:teamId' component={GamesList} />
                            <Route path='/match/:gameName/:gameId' component={Game} />
                        </Switch>
                    </section>
                    <Footer />
                </div>
            </div>
        )
    }
}
export default Layout;