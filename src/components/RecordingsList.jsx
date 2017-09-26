import React, { Component } from 'react';

export default class RecordingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.recordingsList = null;
    }

    componentDidMount(){
        this.getRecordingsList();
    }

    getRecordingsList(){
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


    render() {
        return (
            <div className="recordingsListPage">
                Recordings List Page
            </div>
        );
    }
}
