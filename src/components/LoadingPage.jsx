import React, { Component } from 'react';
import loaderGif from '../assets/images/loaderGif.gif';

export default class LoadingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loadingPage">
                <img
                    src={loaderGif}
                    className="logo"
                />
            </div>
        );
    }
}
