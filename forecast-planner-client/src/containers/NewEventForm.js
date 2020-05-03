
import React, { Component } from 'react';

class NewEventForm extends Component {
    state = {  
        title:"",
        details:"",
        location:"",
        date:"",
        currentUser: this.props.currentUser
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(r=>r.json())
        .then(console.log)
    }
    render() { 
        console.log(this.state.currentUser)
        return (  
            <>
            <h1>Create New Event</h1>
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="title" onChange={this.handleInputChange} placeholder="Enter Event Title" />
                <input type="textarea" name="details" onChange={this.handleInputChange} placeholder="Enter Event Details" />
                <input type="text" name="location" onChange={this.handleInputChange} placeholder="City, State ex. Atlanta,GA" />
                <input type="text" name="date" onChange={this.handleInputChange} placeholder="Enter Event Date ex. 05/01/2020" />
                <input type="submit" value="Submit" />
            </form>
            </>
        );
    }
}

export default NewEventForm;