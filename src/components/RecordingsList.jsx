require('wavesurfer.js');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import Wavesurfer from 'react-wavesurfer';
import RecordingsListActions from '../actions/RecordingsListActions';

export default class RecordingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            pos: 0,
            redirect: false
        };
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.recordingsList = null;
    }

    componentDidMount() {
        this.getRecordingsList();
    }

    getRecordingsList() {
        //get token from localStorage
        let userToken = localStorage.getItem("userToken");

        //call action for call API and return list
        let recordingsListActions = new RecordingsListActions();
        recordingsListActions.getList(userToken,
            (data) => {
                this.recordingsList = data.results;
                console.log(this.recordingsList);
                this.setState({ redirect: false });
            }, (data) => {
                //if it does not return data is because token expired or is invalid
                console.log("data");
                this.setState({ redirect: true });
            });

    }

    handleTogglePlay() {
        this.setState({
            playing: !this.state.playing
        });
    }
    handlePosChange(e) {
        this.setState({
            pos: e.originalArgs[0]
        });
    }

    render() {
        return (
            <div className="recordingsListPage">
                <Wavesurfer
                    audioFile={'https://freesound.org/data/previews/313/313615_2050105-lq.ogg'}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                />
                <button onClick={this.handleTogglePlay}>Play</button>
                {
                    this.state.redirect ?
                        (
                            <Redirect to="/login" />
                        ) : null
                }
            </div>
        );
    }
}
