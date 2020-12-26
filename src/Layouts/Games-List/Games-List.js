import React, { Component } from "react";
import Loader from "../../Components/Loader/Loader";
import GameCard from '../../Components/Game-Card/Game-Card';
import { NavLink } from 'react-router-dom';
import './Games.scss';
import axios from 'axios';


class Games extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            lastPage: null,
            currentPage: 1,
            nextPage: null,
            prePage: null,
            season: new Date().getFullYear(),
        }
    }

    componentDidMount() {

        const { teamId } = this.props.match.params;

        if (this.state.currentPage === 1) {
            axios.get(`https://www.balldontlie.io/api/v1/games?per_page=100&team_ids[]=${teamId}&seasons[]=${this.state.season}`).then(response => {
                this.setState({
                    games: response.data,
                    currentPage: response.data.meta.current_page,
                    nextPage: response.data.meta.next_page,
                    lastPage: response.data.meta.total_pages,
                    prePage: Number(response.data.meta.current_page - 1),

                })
            })
        }
    }


    handleChange = (event) => {
        let season = event.target.value
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=100&team_ids[]=${this.props.match.params.teamId}&seasons[]=${season}`).then(response => {
            this.setState({
                games: response.data,
                season: season,

            })

        })
    }

    perPageHandler = () => {
        let date = `2020-12-26`
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=100&team_ids[]=${this.props.match.params.teamId}&seasons[]=${this.state.season}&page=${this.state.prePage}`).then(response => {
            this.setState({
                games: response.data,
                currentPage: response.data.meta.current_page,
                nextPage: response.data.meta.next_page,
                lastPage: response.data.meta.total_pages,
                prePage: Number(response.data.meta.current_page - 1),

            })

        })

    }
    nextPageHandler = () => {
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=100&team_ids[]=${this.props.match.params.teamId}&seasons[]=${this.state.season}&page=${this.state.nextPage}`).then(response => {
            this.setState({
                games: response.data,
                currentPage: response.data.meta.current_page,
                nextPage: response.data.meta.next_page,
                lastPage: response.data.meta.total_pages,
                prePage: Number(response.data.meta.current_page - 1),

            })
        })
    }


    render() {
        let prevPage, nextPage;

        prevPage = this.state.currentPage === 1 ? "btn btnPre disable" : "btn btnPre";
        nextPage = this.state.currentPage === this.state.lastPage ? "btn btnNext disable" : "btn btnNext";
        let gameMarkup;
        if (this.state.games.data === undefined) {
            gameMarkup = <Loader />
        } else {

            let data = this.state.games.data.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });

            gameMarkup = data.map(game => {
                let dateString = game.date;
                let option = { year: 'numeric', month: 'short', day: 'numeric' };

                let newDate = new Date(dateString).toLocaleString(undefined, option);

                let gameStatus, awayTeamScore, homeTeamScore;
                if (game.period === 0) {
                    gameStatus = '';
                    awayTeamScore = '';
                    homeTeamScore = '';

                } else if (game.period === 4 && game.status === 'Final') {
                    gameStatus = 'FT';
                    awayTeamScore = game.visitor_team_score;
                    homeTeamScore = game.home_team_score;
                } else {
                    gameStatus = 'Live'
                    awayTeamScore = game.visitor_team_score;
                    homeTeamScore = game.home_team_score;
                }

                return <GameCard key={game.id} id={game.id} date={newDate} status={gameStatus} teamAFullName={game.home_team.name} teamAShortName={game.home_team.abbreviation} teamAScore={homeTeamScore} teamBFullName={game.visitor_team.name} teamBShortName={game.visitor_team.abbreviation} teamBScore={awayTeamScore} time={game.time} teamAId={game.home_team.id} teamBId={game.visitor_team.id} />
            })
        }
        return (
            <div className="games">
                <div className="main__containerFluid">
                    <div className="games__head">
                        <div className="games__headLeft">
                            <div className="btnBox pagination">
                                {/* <div className={prevPage} data-btn="pre" onClick={() => this.perPageHandler()}>
                                    <span>Previous</span>
                                </div>
                                <div className={nextPage} data-btn="next" onClick={() => this.nextPageHandler()}>
                                    <span>Next</span>
                                </div> */}
                            </div>
                        </div>

                        <div className="games__headRight">
                            <select name="season" className="" onChange={this.handleChange}>
                                <option value="">Select Season</option>
                                <option value="2020">2020-21</option>
                                <option value="2019">2019-20</option>
                                <option value="2018">2018-19</option>
                                <option value="2017">2017-18</option>
                                <option value="2016">2016-17</option>
                                <option value="2015">2015-16</option>
                                <option value="2014">2014-15</option>
                                <option value="2013">2013-14</option>
                                <option value="2012">2012-13</option>
                                <option value="2011">2011-12</option>
                                <option value="2010">2010-11</option>
                                <option value="2009">2009-10</option>
                                <option value="2008">2008-09</option>
                                <option value="2007">2007-08</option>
                                <option value="2006">2006-07</option>
                                <option value="2005">2005-06</option>
                                <option value="2004">2004-05</option>
                                <option value="2003">2003-04</option>
                                <option value="2002">2002-03</option>
                                <option value="2001">2001-02</option>
                                <option value="2000">2000-01</option>
                                <option value="1999">1999-00</option>
                                <option value="1998">1998-99</option>
                                <option value="1997">1997-98</option>
                                <option value="1996">1996-97</option>
                                <option value="1995">1995-96</option>
                                <option value="1994">1994-95</option>
                                <option value="1993">1993-94</option>
                                <option value="1992">1992-93</option>
                                <option value="1991">1991-92</option>
                                <option value="1990">1990-91</option>
                                <option value="1989">1989-90</option>
                                <option value="1988">1988-89</option>
                                <option value="1987">1987-88</option>
                                <option value="1986">1986-87</option>
                                <option value="1985">1985-86</option>
                                <option value="1984">1984-85</option>
                                <option value="1983">1983-84</option>
                                <option value="1982">1982-83</option>
                                <option value="1981">1981-82</option>
                                <option value="1980">1980-81</option>
                                <option value="1979">1979-80</option>
                            </select>
                        </div>
                    </div>
                    <div className="games__container">
                        {gameMarkup}
                    </div>
                </div>
            </div>
        )
    }
}
export default Games;