import React from 'react';
import './Game.scss'
import vsSvg from '../../assets/images/vs.svg';
import { NavLink } from "react-router-dom";
const Game = (props) => {

    let gameName = `${props.teamAFullName}-vs-${props.teamBFullName}`;
    gameName = gameName.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="fixtures__box" data-id={props.id}>
            <NavLink to={`/match/${gameName}/${props.id}`}>
                <div className="fixtures__boxHead">
                    <div className="fixtures__date">
                        <span>{props.date}</span>
                    </div>
                    <div className="fixtures__status">
                        <span>{props.status}</span>
                    </div>
                </div>
                <div className="fixtures__container">
                    <div className="fixtures__content team__A">
                        <div className="team__name">
                            <span className="fullName">{props.teamAFullName}</span>
                            <span className="shortName">{props.teamAShortName}</span>
                        </div>
                        <div className="team__logo">
                            <img src={require(`../../assets/images/teams/${props.teamAId}.png`).default} alt={props.teamAFullName} />
                        </div>
                    </div>
                    <div className="fixtures__content team__vs">
                        <div className="team__left">
                            <span>{props.teamAScore}</span>
                        </div>
                        <div className="team__center">
                            <div className="vs-svg">
                                <img src={vsSvg} alt='' />
                                <span className="vs-txt">vs</span>
                            </div>
                            <div className="time">
                                <span>{props.time}</span>
                            </div>
                        </div>
                        <div className="team__right">
                            <span>{props.teamBScore}</span>
                        </div>
                    </div>
                    <div className="fixtures__content team__B">
                        <div className="team__name">
                            <span className="fullName">{props.teamBFullName}</span>
                            <span className="shortName">{props.teamBShortName}</span>
                        </div>
                        <div className="team__logo">
                            <img src={require(`../../assets/images/teams/${props.teamBId}.png`).default} alt={props.teamBFullName} />
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default Game;