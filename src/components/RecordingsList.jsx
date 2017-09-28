require('wavesurfer.js');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import Wavesurfer from 'react-wavesurfer';
import HeaderInApp from './HeaderInApp';
import LoadingPage from './LoadingPage';
import Recording from './Recording';
import RecordingsListActions from '../actions/RecordingsListActions';
import pauseIcon from '../assets/images/pauseIcon.png';
import continueIcon from '../assets/images/continueIcon.png';
import yellowStar from '../assets/images/yellowStar.png';
import blackStar from '../assets/images/blackStar.png';

export default class RecordingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordingsList: null,
            redirect: false,
            ajax: false
        };
        
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

    render() {
        return (
            <div className="recordingsListPage">
                <HeaderInApp />
                <div className="recordingsListContainer">
                    {
                        this.state.ajax ?
                            this.recordingsList.map((recording, i) =>
                                <Recording
                                    key={i}
                                    i={i}
                                    playing={false}
                                    pos={0}
                                    url={recording.url}
                                    duration={recording.duration}
                                    created={recording.created}
                                    rating={recording.rating}
                                    final_script={recording.final_script}
                                />
                            )
                            :
                            <LoadingPage />
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
