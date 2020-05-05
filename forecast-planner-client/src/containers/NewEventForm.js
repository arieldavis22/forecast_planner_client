
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class NewEventForm extends Component {
    state = {  
        title:"",
        details:"",
        location:"",
        date:"",
        indoor: false,
        currentUser: this.props.currentUser
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCheckChange = () => {
        this.setState({
            indoor: !this.state.indoor
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
        .then( response => {
            this.props.history.push("/");
            this.props.updateEvents()
        })
    }
    render() { 
        return (  
            <>
            { !this.props.currentUser ? <Redirect to="/" /> : null }
            <h1>Create New Event</h1>
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="title" onChange={this.handleInputChange} placeholder="Enter Event Title" />
                <input type="textarea" name="details" onChange={this.handleInputChange} placeholder="Enter Event Details" />
                <input type="text" name="location" onChange={this.handleInputChange} placeholder="City, State ex. Atlanta,GA" />
                <input type="text" name="date" onChange={this.handleInputChange} placeholder="Enter Event Date ex. 05/01/2020" />
                <input type="checkbox" name="indoor" onChange={this.handleCheckChange} />
                <input type="submit" value="Submit" />
            </form>
            </>
        );
    }
}

export default NewEventForm;