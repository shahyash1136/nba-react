import React, { Component } from 'react';
import Game from './Game/Game';
import './Games.scss';
import axios from 'axios';
class Games extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            teams: [],
            lastPage: null,
            currentPage: 1,
            nextPage: null,
            prePage: null,

        }
    }
    componentDidMount() {
        if (this.state.currentPage === 1) {
            axios.get(`https://www.balldontlie.io/api/v1/games?per_page=50`).then(response => {
                this.setState({
                    games: response.data.data,
                    currentPage: response.data.meta.current_page,
                    nextPage: response.data.meta.next_page,
                    lastPage: response.data.meta.total_pages,
                    prePage: Number(response.data.meta.current_page - 1),

                })
                console.log(this.state);
            })
        }

        /* axios.get('https://www.balldontlie.io/api/v1/teams').then(response => {
            this.setState({
                teams: response.data.data,
            })
        })
        console.log(this.state.pageNum); */
    }

    /* componentDidUpdate() {
        this.perPageHandler();
        this.nextPageHandler();
    } */

    perPageHandler = () => {
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=50&page=${this.state.prePage}`).then(response => {
            this.setState({
                games: response.data.data,
                currentPage: response.data.meta.current_page,
                nextPage: response.data.meta.next_page,
                lastPage: response.data.meta.total_pages,
                prePage: Number(response.data.meta.current_page - 1),

            })
            console.log(this.state);
        })

    }
    nextPageHandler = () => {
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=50&page=${this.state.nextPage}`).then(response => {
            this.setState({
                games: response.data.data,
                currentPage: response.data.meta.current_page,
                nextPage: response.data.meta.next_page,
                lastPage: response.data.meta.total_pages,
                prePage: Number(response.data.meta.current_page - 1),

            })
            console.log(this.state);
        })
    }

    render() {

        /* const teamLi = this.state.teams.map(team => {
            return <li key={team.id} data-teamid={team.id}>{team.full_name}</li>
        }) */
        let prevPage, nextPage;

        prevPage = this.state.currentPage === 1 ? "btn btnPre disable" : "btn btnPre";
        nextPage = this.state.currentPage === this.state.lastPage ? "btn btnNext disable" : "btn btnNext"

        const gameMarkup = this.state.games.map(game => {
            let dateString = game.date;
            let option = { year: 'numeric', month: 'short', day: 'numeric' };
            let newDate = new Date(dateString).toLocaleDateString(undefined, option);

            return <Game key={game.id} date={newDate} status={game.status} teamAFullName={game.home_team.full_name} teamAShortName={game.home_team.abbreviation} teamAScore={game.home_team_score} teamBFullName={game.visitor_team.full_name} teamBShortName={game.visitor_team.abbreviation} teamBScore={game.visitor_team_score} time={game.time} teamAId={game.home_team.id} teamBId={game.visitor_team.id} />
        })

        return (
            <div className="games">
                <div className="main__containerFluid">
                    <div className="games__head">
                        <div className="games__headLeft">
                            <div className="btnBox pagination">
                                <div className={prevPage} data-btn="pre" onClick={() => this.perPageHandler()}>
                                    <span>Previous</span>
                                </div>
                                <div className={nextPage} data-btn="next" onClick={() => this.nextPageHandler()}>
                                    <span>Next</span>
                                </div>
                            </div>
                        </div>
                        <div className="games__headRight ">
                            <div className="drpDwn clubs">
                                <div className="drpDwn__value">
                                    <span>Select Team</span>
                                </div>
                                <div className="drpDwn__list">
                                    <ul>
                                        {/*  {teamLi} */}
                                    </ul>
                                </div>
                            </div>
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