import React, { Component, Fragment } from "react";
import Team from "../../Components/Team/Team";
import TabList from '../../Components/TabsList/TabsList';
import Loader from "../../Components/Loader/Loader";
import axios from 'axios';

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conference: 'west',
            conferenceList: [
                { name: 'West Conference', confer: 'west' },
                { name: 'East Conference', confer: 'east' },
            ],
            teams: []
        }
    }

    componentDidMount() {
        axios.get('https://www.balldontlie.io/api/v1/teams').then(response => {
            this.setState({
                teams: response.data,
            })
        })
    }

    tabClick = (confer) => {
        this.setState({
            conference: confer,
        })
    }

    render() {
        let teams
        if (this.state.teams.data === undefined) {
            teams = <Loader />
        } else {
            teams = this.state.teams.data.map(el => {
                let markup
                if (this.state.conference === el.conference.toLowerCase()) {
                    markup = <Team key={el.id} conference={el.conference.toLowerCase()} fullName={el.full_name} teamId={el.id} />
                }
                return markup
            })
        }



        return (
            <Fragment>
                <div className="main__container">
                    <ul className="tabs">
                        {
                            this.state.conferenceList.map(el => {
                                return <TabList key={el.confer} confer={el.confer} activeTab={this.state.conference} conference={el.name} click={() => this.tabClick(el.confer)} />
                            })
                        }
                    </ul>
                    <div className="teams__box">
                        {teams}
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Teams;