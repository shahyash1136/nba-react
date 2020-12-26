import React from 'react';
import './Player.scss';
import { NavLink } from "react-router-dom";
const Player = (props) => {
    let imgUrl;

    try {
        imgUrl = require(`../../assets/images/players/${props.playerId}.png`).default;
    } catch (error) {
        imgUrl = require('../../assets/images/players/default.png').default
    }
    let playerName = `${props.firstName} ${props.lastName}`;
    playerName = playerName.replace(/\s+/g, '-').toLowerCase()


    return (
        <div className="player" data-playerid={props.playerId}>
            <NavLink to={`/player/${playerName}/${props.playerId}`} className="player__container">
                <div className="player__head">
                    <div className="player__img">
                        <img src={imgUrl} alt={props.playerName} />
                    </div>
                    <div className="player__team">
                        <img src={require(`../../assets/images/teams/${props.teamId}.png`).default} alt={props.teamName} />
                    </div>
                    <div className="player__pos">
                        <span>{props.position}</span>
                    </div>
                </div>
                <div className="player__body">
                    <div className="player__firstName">
                        <h2>{props.firstName}</h2>
                    </div>
                    <div className="player__lastName">
                        <h3>{props.lastName}</h3>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default Player;