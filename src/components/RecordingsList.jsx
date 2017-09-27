require('wavesurfer.js');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import Wavesurfer from 'react-wavesurfer';
import RecordingsListActions from '../actions/RecordingsListActions';
import pauseIcon from '../assets/images/pauseIcon.png';
import continueIcon from '../assets/images/continueIcon.png';

export default class RecordingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordingsList: null,
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

                //set properties for manipulate record in view
                for (var i = 0; i < this.recordingsList.length; i++) {
                    this.recordingsList[i].pos = 0
                    this.recordingsList[i].playing = false;
                }

                setTimeout(() => {
                    this.createRecordings();
                    this.setState({ redirect: false, ajax: true });
                }, 2000);
            },
            (error) => {
                //if it does not return data is because token expired or is invalid
                console.log(error);
                this.setState({ redirect: true });
            }
        );

    }

    handleTogglePlay(i) {
        this.recordingsList[i].playing = !this.recordingsList[i].playing;
        this.createRecordings();
    }

    handlePosChange(e, i) {
        this.recordingsList[i].playing = e.originalArgs[0];
    }

    createRecordings() {
        let recordingsList = (
            this.recordingsList.map((recording, i) =>
                <div key={i} className="recording row">
                    <div className="col-sm-1 text-center">
                        <button
                            onClick={() => this.handleTogglePlay(i)}
                            className="btn playButton"
                        >
                            <img
                                src={this.recordingsList[i].playing ?
                                    pauseIcon
                                    :
                                    continueIcon}
                            />
                        </button>
                    </div>
                    <div className="col-sm-11">
                        <Wavesurfer
                            audioFile={recording.url}
                            pos={recording.pos}
                            onPosChange={(e) => this.handlePosChange(e, i)}
                            playing={this.recordingsList[i].playing}
                        />
                    </div>
                </div>
            )
        )

        this.setState({recordingsList: recordingsList});
    }

    render() {
        return (
            <div className="recordingsListPage">
                <div className="recordingsListContainer">
                    {
                        this.state.ajax ?
                            this.state.recordingsList
                            :
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
