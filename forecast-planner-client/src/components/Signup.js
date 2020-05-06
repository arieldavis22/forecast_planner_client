import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import { signUp } from '../FetchData'

class Signup extends React.Component {

    state= {
        name: "",
        password: "",
        passwordConfirmation: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        if(this.state.password !== this.state.passwordConfirmation){
            return alert("Please enter matching passwords")
        }
        signUp(this.state)
        .then(r => r.json())
        .then(user => {
            this.props.setCurrentUser(user)
            this.props.fetchAllUsers()
        })
        
    }

    render() {
    return (  
        <Fragment>
            { this.props.currentUser ? <Redirect to="/"/> : null }
            <h1>Signup</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Username:</label>
                <input type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}/>
                <label htmlFor="password">Password:</label>
                <input type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                <label htmlFor="passwordComfirmation">Confirm Password:</label>
                <input type="password" 
                    name="passwordConfirmation" 
                    value={this.state.passwordConfirmation} 
                    onChange={this.handleChange}/>
                <input type="submit" value="Sign up" />
            </form>
        </Fragment>
    );
}
}

export default Signup;