import React, { Component } from "react";
import axios from "axios";



class PlayerData extends Component {
    componentDidMount() {

        let playerId = this.props.match.params.playerId;
        // console.log(playerId)

        let date = `2019-12-26`



        axios.get(`https://www.balldontlie.io/api/v1/stats?seasons[]=${2019}&player_ids[]=${playerId}`).then(res => {
            console.log(res.data)
        })
    }


    render() {
        return (
            <h1>PlayerData</h1>
        )
    }
}
export default PlayerData;