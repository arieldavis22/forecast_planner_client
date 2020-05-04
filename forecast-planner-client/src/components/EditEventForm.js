import React from 'react'

//autofill form with App's state info match.params.id
//setState to form info
//fetch POST event/:id
// () => 
const initialState = {
    title:"",
    details:"",
    location:"",
    date:"",
    indoor: false,
}

class EditEventForm extends React.Component {
    state = initialState

    componentDidMount() {
        let event = this.props.events.find(event => event.id.toString() === this.props.match.params.id)
        this.setState({
            title: event.title,
            details: event.details,
            location: event.location,
            date: event.date,
            indoor: event.indoor
        })
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
        fetch(`http://localhost:3000/events/${this.props.match.params.id}`, {
            method: 'PUT',
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
            }})
        .then( response => {
            this.setState(initialState);
            this.props.history.push("/");
            this.props.updateEvents()
        })
        //fetch post to event/:id/edit event#edit
        //then parse and redirect to home
    }

    render() {
    return(
        <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title} placeholder="Enter Event Title" />
            <input type="textarea" name="details" onChange={this.handleInputChange} value={this.state.details} placeholder="Enter Event Details" />
            <input type="text" name="location" onChange={this.handleInputChange} value={this.state.location} placeholder="City, State ex. Atlanta,GA" />
            <input type="text" name="date" onChange={this.handleInputChange} value={this.state.date} placeholder="Enter Event Date ex. 05/01/2020" />
            <input type="checkbox" name="indoor" onChange={this.handleCheckChange} value={this.state.indoor} />
            <input type="submit" value="Submit" />
        </form>
    )
    }
}

export default EditEventForm