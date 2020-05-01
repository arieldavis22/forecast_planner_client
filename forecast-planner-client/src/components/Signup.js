import React, {Fragment} from 'react';

class Signup extends React.Component {

    state={
        name: "",
        password: "",
        passwordConfirmation: "",
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
    return (  
        <Fragment>
            <h1>Signup</h1>
            <form>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}></input>
            </form>
        </Fragment>
    );
}
}

export default Signup;