import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="loginContainer">
                <h1>Login to Your Account</h1>
                <input type="text" name="user" placeholder="Username" />
                <input type="password" name="pass" placeholder="Password" />
                <input type="submit" name="login" className="loginSubmitButton" value="Login" />
            </div>
        );
    }
}
