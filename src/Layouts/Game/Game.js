import React, { Component } from "react";
import TabList from '../../Components/TabsList/TabsList';
import Loader from "../../Components/Loader/Loader";
import ScoreTable from "../../Components/ScoreTable/ScoreTable";
import './Game.scss';
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
                markup = <ScoreTable key={el.id} name={`${el.player.first_name} ${el.player.last_name}`} pos={el.player.position} min={el.min} pts={el.pts} reb={el.reb} ast={el.ast} stl={el.stl} blk={el.blk} fgm={el.fgm} fga={el.fga} fgperct={el.fg_pct} threepm={el.fg3m} threepa={el.fg3a} threepperct={el.fg_pct} ftm={el.ftm} fta={el.fta} ftperct={el.ft_pct} off={el.oreb} deff={el.dreb} turnOver={el.turnover} pf={el.pf} />
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

                    <div className="tbl">
                        <div className="tbl__head">
                            <ScoreTable name={'Name'} pos={'POS'} min={'MIN'} pts={'PTS'} reb={'REB'} ast={'AST'} stl={'STL'} blk={'BLK'} fgm={'FGM'} fga={'FGA'} fgperct={'FG%'} threepm={'3PM'} threepa={'3PA'} threepperct={'3P%'} ftm={'FTM'} fta={'FTA'} ftperct={'FT%'} off={'OFF'} deff={'DEF'} turnOver={'TO'} pf={'PF'} />
                        </div>
                        <div className="tbl__body">
                            {tableMarup}
                        </div>
                    </div>




                </div>

            </React.Fragment>

        )
    }
}
export default Game;