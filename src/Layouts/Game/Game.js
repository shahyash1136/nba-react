import React, { Component } from "react";
import TabList from '../../Components/TabsList/TabsList';
import Loader from "../../Components/Loader/Loader";
import axios from "axios";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'home',
            teamId: '',
            team: [
                { teamId: null, name: null, type: 'home' },
                { teamId: null, name: null, type: 'away' }
            ],
            gameScore: []
        }
    }

    componentDidMount() {
        const { gameId } = this.props.match.params;

        axios.get(`https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=${gameId}`).then(res => {
            this.setState({
                gameScore: res.data,
            })
        });
        axios.get(`https://www.balldontlie.io/api/v1/games/${gameId}`).then(res => {
            let hometeamId, awayteamId;
            hometeamId = res.data.home_team.id;
            awayteamId = res.data.visitor_team.id;
            this.setState({
                team: [
                    { teamId: hometeamId, name: res.data.home_team.name, type: 'home' },
                    { teamId: awayteamId, name: res.data.visitor_team.name, type: 'away' },
                ],

            })
        });
    }

    tabClick = (confer) => {
        this.setState({
            activeTab: confer,
        })
    }

    render() {
        let tabMarkup;
        if (this.state.team === undefined) {
            tabMarkup = ''
        } else {
            tabMarkup = this.state.team.map(tab => {
                return <TabList key={tab.type} confer={tab.type} activeTab={this.state.activeTab} conference={tab.name} click={() => this.tabClick(tab.type)} />
            })
        }

        let tableMarup;

        if (this.state.gameScore.data === undefined) {
            tableMarup = <Loader />;
        } else {
            tableMarup = this.state.gameScore.data.map(el => {
                let markup;
                markup = <h6>{`${el.player.first_name} ${el.player.last_name}`}</h6>
                if (this.state.activeTab === 'home' && el.team.id === el.game.home_team_id) {
                    return markup;
                } else if (this.state.activeTab === 'away' && el.team.id === el.game.visitor_team_id) {
                    return markup
                }

            })
        }



        return (
            <React.Fragment>
                <div className="main__container">
                    <ul className="tabs">
                        {tabMarkup}
                    </ul>

                    {tableMarup}

                </div>

            </React.Fragment>

        )
    }
}
export default Game;