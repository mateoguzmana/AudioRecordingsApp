import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import pauseIcon from '../assets/images/pauseIcon.png';
import continueIcon from '../assets/images/continueIcon.png';
import yellowStar from '../assets/images/yellowStar.png';
import blackStar from '../assets/images/blackStar.png';

export default class Recording extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pos: 0,
            playing: false
        };

        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);

        this.intervalChangeColors = null;
    }

    changeCanvasColor(i) {
        // get canvas to modify
        var canvas = $("#Wavesurfer" + i).find("canvas")[1];
        var c = canvas.getContext('2d');

        // set change colors interval
        this.intervalChangeColors = setInterval(() => {
            c.fillStyle = this.getRandomColor();
            c.fill();
        }, 1000);

        //execute change colors interval
        this.intervalChangeColors;

        //delete interval when recording time finish
        setTimeout(() => {
            clearInterval(this.intervalChangeColors);
        }, this.props.duration * 1000);
    }

    getRandomColor() {
        //get a random HEX COLOR
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    handleTogglePlay(i) {
        this.setState({ playing: !this.state.playing });

        setTimeout(() => {
            // if recording is run, execute change colors interval
            if (this.state.playing) {
                this.changeCanvasColor(i);
            } else {
                // if recording is stop, clear change colors interval
                clearInterval(this.intervalChangeColors);
            }
        }, 100);
    }

    handlePosChange(e, i) {
        this.setState({ pos: e.originalArgs[0] });
    }

    printStars(rating) {
        var stars = [];

        // print yellow stars
        for (var i = 0; i < rating; i++) {
            stars.push(<img src={yellowStar} className="star" />);
        }

        // if is any star mising, here is written
        if (rating < 5) {
            for (var x = 0; x < (5 - rating); x++) {
                stars.push(<img src={blackStar} className="star" />);
            }
        }

        return <div>{stars}</div>;
    }

    secondsToHms(d) {
        // convert time provide to human readable time
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    formatDate(date) {
        // convert date provide to human readable date
        let dateConverted = new Date(date);
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = dateConverted.getDate();
        var monthIndex = dateConverted.getMonth();
        var year = dateConverted.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ', ' + year;
    }

    render() {
        return (
            <div>
                <div key={this.props._key} className="recording row">
                    <div className={`col-sm-12 ${this.state.playing ? 'headerRecordingShow' : 'headerRecording'}`}>
                        <div className="col-sm-10">
                            <p className="recordingDescription">{this.props.final_script}</p>
                        </div>
                        <div className="col-sm-2 recordingData">
                            <p className="recordingTime">Duration: {this.secondsToHms(this.props.duration)}</p>
                            <p className="recordingDate">{this.formatDate(this.props.created)}</p>
                            {

                                this.printStars(this.props.rating)
                            }
                        </div>
                    </div>
                    <div className="col-sm-1 text-center">
                        <button
                            onClick={() => this.handleTogglePlay(this.props.i)}
                            className="btn playButton"
                        >
                            <img
                                src={this.state.playing ?
                                    pauseIcon
                                    :
                                    continueIcon}
                            />
                        </button>
                    </div>
                    <div id={`Wavesurfer${this.props.i}`} className="col-sm-11">
                        <Wavesurfer
                            audioFile={this.props.url}
                            pos={this.state.pos}
                            onPosChange={(e) => this.handlePosChange(e, this.props.i)}
                            playing={this.state.playing}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
