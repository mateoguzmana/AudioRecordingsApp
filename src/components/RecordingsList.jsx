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
            redirect: false,
            ajax: false
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
                this.setState({ redirect: false, ajax: true });
            },
            (error) => {
                //if it does not return data is because token expired or is invalid
                console.log(error);
                this.setState({ redirect: true });
            }
        );

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
                <div className="recordingsListContainer">
                {
                    this.state.ajax ?
                        this.recordingsList.map((recording, i) =>
                            <div key={i} className="recording row">
                                    <div className="col-sm-1 text-center">
                                        <button 
                                            onClick={this.handleTogglePlay} 
                                            className="btn playButton"
                                        >
                                            <img src="https://maxcdn.icons8.com/Share/icon/Media_Controls//play_filled1600.png"/>
                                        </button>
                                    </div>
                                    <div className="col-sm-11">
                                        <Wavesurfer
                                            audioFile={recording.url}
                                            pos={this.state.pos}
                                            onPosChange={this.handlePosChange}
                                            playing={this.state.playing}
                                        />
                                    </div>
                            </div>
                        ) :
                        <div>Loading...</div>
                }
                {
                    this.state.redirect ?
                        (
                            <Redirect to="/login" />
                        ) : null
                }
                </div>
            </div>
        );
    }
}
