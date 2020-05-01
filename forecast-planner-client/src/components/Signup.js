import React, {Fragment} from 'react';
const initialState = {
    name: "",
    password: "",
    passwordConfirmation: "",
}
class Signup extends React.Component {

    state=initialState

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
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(user => {
            this.props.setCurrentUser(user)
            this.setState(initialState)
        })
        
    }

    render() {
    return (  
        <Fragment>
            <h1>Signup</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}/>
                <input type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}/>
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