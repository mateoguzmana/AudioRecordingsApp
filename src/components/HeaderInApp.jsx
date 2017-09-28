import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem("userToken");
        this.setState({ redirect: true });
    }

    componentDidMount(){
        this.changeWord();
    }

    changeWord(){
        let words = [
            "Intelligent",
            "Innovative",
            "Continuous",
            "Scalable"
        ]

        let i = 0;
        setInterval(() => {
            if(i>=3){
                i = 0;
            }else{
                i++;
            }
            $(".wordChange").fadeOut(300);
            $(".wordChange").html(words[i]);
            $(".wordChange").fadeIn(300);
        }, 3000);
    }

    render() {
        return (
            <div>
                <div className="headerPage">
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">
                                    <img
                                    src="https://i2x.ai/img/i2x-logo.png"
                                    className="logo"
                                    />
                                </a>
                            </div>
                            <ul className="nav navbar-nav">
                                <h3 className="headerText"><span className="wordChange">Intelligent</span> audio analysis</h3>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#"><span className="glyphicon glyphicon-log-in" onClick={this.logout}></span> Logout</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
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
