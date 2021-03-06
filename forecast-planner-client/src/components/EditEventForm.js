import React from 'react'
import {Redirect} from 'react-router-dom'
import { editEvent } from '../FetchData'

class EditEventForm extends React.Component {
    state = {
        title:"",
        details:"",
        location:"",
        date:"",
        indoor: false
    }

    componentDidMount() {
        let event = this.props.events.find(event => event.id.toString() === this.props.match.params.id)
        if (event) {
            this.setState({
            title: event.title,
            details: event.details,
            location: event.location,
            date: event.date,
            indoor: event.indoor
        })
        }
        
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

    handleSubmit = e => {
        e.preventDefault()
        editEvent(this.props.match.params.id, this.state)
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                throw r
            }})
        .then( () => {
            this.props.history.push("/");
            this.props.updateEvents()
        })
        //fetch post to event/:id/edit event#edit
        //then parse and redirect to home
    }

    render() {
    return(
        <div className='pad'>
        { !this.props.currentUser ? <Redirect to="/" /> : null }
        <h1>Edit</h1>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Event Title:  </label>
            <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title} placeholder="Enter Event Title" />
            <br/>
            <label htmlFor="details">Event Details:  </label>
            <input type="textarea" name="details" onChange={this.handleInputChange} value={this.state.details} placeholder="Enter Event Details" />
            <br />
            <label htmlFor="location">Location:  </label>
            <input type="text" name="location" onChange={this.handleInputChange} value={this.state.location} placeholder="City,ST" />
            <br />
            <label htmlFor="date">Date Format:  </label>
            <input type="text" name="date" onChange={this.handleInputChange} value={this.state.date} placeholder="YYYY-MM-DD" />
            <br />
            <label htmlFor="indoor">Is Event Indoor?:  </label>
            <input type="checkbox" name="indoor" onChange={this.handleCheckChange} value={this.state.indoor} />
            <br />
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
    }
}

export default EditEventForm