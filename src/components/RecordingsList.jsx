require('wavesurfer.js');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';

export default class RecordingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            pos: 0
        };
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.recordingsList = null;
    }

    componentDidMount() {
        this.getRecordingsList();
    }

    getRecordingsList() {
        //call action for call API and return list
        console.log("return list");
        //this is just an example without get nothing from the server
        this.recordingsList = [
            {
                final_script: "Description text",
                rating: 4,
                duration: 920,
                url: "https://smp3dl.com/fileDownload/Songs/0/30191.mp3",
                created: "25-01-2017"
            }
        ]
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
                    audioFile={'https://wavesurfer-js.org/example/split-channels/stereo.mp3'}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                />
                <button onClick={this.handleTogglePlay}>Play</button>
            </div>
        );
    }
}
