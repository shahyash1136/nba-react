import React from 'react';
import "./Team.scss";
import { NavLink } from "react-router-dom";
const Team = (props) => {
    let name = props.fullName;
    name = name.replace(/\s+/g, '-').toLowerCase();
    return (

        <div className="club" data-conference={props.conference}>
            <NavLink to={`/team/${name}/${props.teamId}/`} className="club__container">
                <div className="club__logo">
                    <img
                        src={require(`../../assets/images/teams/${props.teamId}.png`).default}
                        alt={props.fullName} />
                </div>
                <div className="club__name">
                    <span className="fullName">{props.fullName}</span>
                </div>
            </NavLink>
        </div>
    )
}

export default Team;