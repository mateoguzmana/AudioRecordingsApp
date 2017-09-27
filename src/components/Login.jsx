import React, { Component } from 'react';
import LoginActions from '../actions/LoginActions';
import { Redirect } from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "challenge@i2x.ai",
            password: "pass123",
            validEmail: "",
            validPassword: "",
            errorMessage: null,
            redirect: false
        };

        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    setEmail(e) {
        this.setState({ email: e.target.value });
    }

    setPassword(e) {
        this.setState({ password: e.target.value });
    }

    setLogin(data) {
        //save token in localStorage
        localStorage.setItem('userToken', data.token);

        //redirect inside application
        this.setState({ redirect: true });
    }

    failedLogin(data) {
        //set message
        this.setState({ errorMessage: data.non_field_errors[0] });

        //show error login message
        $(".errorLoginMessage").fadeIn();

        //hide error login message
        setTimeout(() => {
            $(".errorLoginMessage").fadeOut();
        }, 3000);
    }

    onSubmit() {
        let loginActions = new LoginActions();
        //display error messages if it has any data wrong
        this.validateEmail(this.state.email) ? this.setState({ validEmail: "" }) : this.setState({ validEmail: "invalid" });
        this.state.password.length > 0 ? this.setState({ validPassword: "" }) : this.setState({ validPassword: "invalid" })

        //call API
        if (this.validateEmail(this.state.email) && this.state.password.length > 0) {
            loginActions.login(
                this.state.email,
                this.state.password,
                (data) => this.setLogin(data),
                (data) => this.failedLogin(data)
            );
        }

    }

    render() {
        return (
            <div className="loginPage">
                <div className="loginContainer">
                    <h1>Login to Your Account</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`${this.state.validEmail} form-control`}
                        value={this.state.email} onChange={this.setEmail}
                    />
                    {
                        this.state.validEmail == "invalid" ? <label className="labelError">Please enter a valid email address.</label> : null
                    }
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`${this.state.validPassword} form-control`}
                        value={this.state.email} value={this.state.password}
                        onChange={this.setPassword}
                    />
                    {
                        this.state.validPassword == "invalid" ? <label className="labelError">Please enter a password.</label> : null
                    }
                    <input
                        type="submit"
                        name="login"
                        className="loginSubmitButton"
                        value="Login"
                        onClick={this.onSubmit}
                    />
                    <div className="alert errorLoginMessage">{this.state.errorMessage}</div>
                </div>
                {   
                    this.state.redirect ?
                    (
                        <Redirect to="/recordings"/>
                    ) : null
                }
            </div>
        );
    }
}
