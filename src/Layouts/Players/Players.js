import React, { Component } from "react";
import Loader from "../../Components/Loader/Loader";
import Player from "../../Components/Player/Player";
import './Players.scss';
import { NavLink } from "react-router-dom";
import axios from 'axios';

class Players extends Component {
    constructor() {
        super();
        this.state = {
            players: [],
            serachValue: '',
        }
    }

    componentDidMount() {
        axios.get(`https://www.balldontlie.io/api/v1/players?per_page=50`).then(res => {
            this.setState({
                players: res.data,
            })
        });


    }



    render() {
        let playersList;

        if (this.state.players.data === undefined) {
            playersList = <Loader />
        } else {
            playersList = this.state.players.data.map(player => {
                return <Player key={player.id} playerId={player.id} playerName={`${player.first_name} ${player.last_name}`} teamId={player.team.id} teamName={player.team.full_name} position={player.position} firstName={player.first_name} lastName={player.last_name} />
            })
        }


        return (
            <div className="players">
                <div className="main__container">
                    <div className="top">
                        <div className="btnBox pagination">
                            <div className="btn btnPre" data-btn="pre">
                                <span>Previous</span>
                            </div>
                            <div className="btn btnNext" data-btn="next">
                                <span>Next</span>
                            </div>
                        </div>
                        <div className="searchBox">
                            <input type="text" name="" className="searchPlayer" />
                        </div>
                    </div>
                    <div className="playersList__container">
                        {playersList}
                    </div>
                </div>
            </div>
        )
    }
}
export default Players;