import React from 'react';
import './TabsList.scss';

const TabsList = (props) => {

    let activeClass;
    if (props.confer === props.activeTab) {
        activeClass = 'active';
    }

    return (
        <li className={activeClass} data-conference={props.confer} onClick={props.click}>
            {props.conference}
        </li>
    )
}

export default TabsList;