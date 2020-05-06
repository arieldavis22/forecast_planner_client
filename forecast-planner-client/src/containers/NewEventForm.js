
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { createEvent } from '../FetchData'

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
        createEvent(this.state)
        .then(r=> {
            if(r.ok) {
                return r.json()
            } else {
                throw r
            }
        })
        .then(() => {
            this.props.history.push("/");
            this.props.updateEvents()
        })
        .catch(() => alert("Information Entered Incorrectly or Weather Info Not Found"))
    }
    render() { 
        return (  
            <>
            { !this.props.currentUser ? <Redirect to="/" /> : null }
            <h1>Create New Event</h1>
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="title">Enter Event Title:  </label>
                <input type="text" name="title" onChange={this.handleInputChange} placeholder="Enter Event Title" />
                <br />
                <label htmlFor="details">Enter Event Details:  </label>
                <input type="textarea" name="details" onChange={this.handleInputChange} placeholder="Enter Event Details" />
                <br />
                <label htmlFor="location">Enter Event Location:  </label>
                <input type="text" name="location" onChange={this.handleInputChange} placeholder="City,ST" />
                <br />
                <label htmlFor="date">Enter Event Date Format:  </label>
                <input type="text" name="date" onChange={this.handleInputChange} placeholder="YYYY-MM-DD" />
                <br />
                <label htmlFor="indoor">Is Event Indoor?:  </label>
                <input type="checkbox" name="indoor" onChange={this.handleCheckChange} />
                <br />
                <input type="submit" value="Submit" />
            </form>
            </>
        );
    }
}

export default NewEventForm;