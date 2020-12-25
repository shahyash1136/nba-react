import React, { Component } from "react";
import Loader from "../../Components/Loader/Loader";
import Game from '../../Components/Game/Game';
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

        }
    }

    componentDidMount() {

        const { teamId } = this.props.match.params;

        if (this.state.currentPage === 1) {
            axios.get(`https://www.balldontlie.io/api/v1/games?per_page=50&team_ids[]=${teamId}`).then(response => {
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
    perPageHandler = () => {
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=50&team_ids[]=${this.props.match.params.teamId}&page=${this.state.prePage}`).then(response => {
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
        axios.get(`https://www.balldontlie.io/api/v1/games?per_page=50&team_ids[]=${this.props.match.params.teamId}&page=${this.state.nextPage}`).then(response => {
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
            gameMarkup = this.state.games.data.map(game => {
                let dateString = game.date;
                let option = { year: 'numeric', month: 'short', day: 'numeric' };
                let newDate = new Date(dateString).toLocaleDateString(undefined, option);

                return <Game key={game.id} date={newDate} status={game.status} teamAFullName={game.home_team.full_name} teamAShortName={game.home_team.abbreviation} teamAScore={game.home_team_score} teamBFullName={game.visitor_team.full_name} teamBShortName={game.visitor_team.abbreviation} teamBScore={game.visitor_team_score} time={game.time} teamAId={game.home_team.id} teamBId={game.visitor_team.id} />
            })
        }
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