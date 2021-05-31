import React, { Component } from 'react';
import axios from 'axios';


/* To use this, write
    query().then(data => {
        <stuff you want to do>
    });
*/
async function query() {
    var obj;
    await axios.get(`http://${window.BACKEND_URL}/api/authentication/current_user`, 
        {withCredentials: true})
        .then(res => {
            obj = res.data
            console.log(obj);
        })
        .catch(err => {
            console.log(err);
        });
    return obj;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Login"
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        query().then(data => {
            if (data.name !== undefined)
                this.setState({name: data.name});
        });
    }

    login() {
        window.location = `http://${window.BACKEND_URL}/api/authentication/oauth/google`;
    }
    logout() {
        window.location = `http://${window.BACKEND_URL}/api/authentication/logout`;
    }

    render() {
        console.log(this.state.name);
        return <button onClick={this.state.name === "Login" ? this.login : this.logout}>
            {this.state.name}
        </button>;
    }
}

export default Login;
export { query }