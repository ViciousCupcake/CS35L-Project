import React, { Component } from 'react';
import axios from 'axios';

const query = (user) => {
    axios.get(`http://${window.BACKEND_URL}/api/authentication/current_user`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        window.location = `http://${window.BACKEND_URL}/api/authentication/oauth/google`;
    }

    render() {
        return (
            <button onClick={this.login}>Login</button>
        );
    }
}

export default Login;
export { query }