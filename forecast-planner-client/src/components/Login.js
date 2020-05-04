import React, {Fragment} from 'react';

const initialState = {
    name: "",
    password: ""
}
class Login extends React.Component {

    state = initialState


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                throw r
            }
        })
        .then(user => {
            this.props.setCurrentUser(user)
            this.setState(initialState)
            window.history.pushState({status: "login"}, "", "/")
        })
        .catch(error => alert("Login unsuccessful. Sign up or try again."))
        
    }


    render() {
        return (  
        <Fragment>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}/>
                <input type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                    <input type="submit" value="Log in" />
            </form>
        </Fragment>
    );
    }
    
}

export default Login;