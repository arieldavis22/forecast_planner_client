import React, { Component } from 'react';
import Event from './Event'

class Home extends Component {
    state = {
        userEvents: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/getevents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentUser: this.props.currentUser
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                throw r
            }
        })
        .then(data => {
            this.setState({
                userEvents: data.events
            })
        })
        .catch(error => console.log(error))
    }

    renderEvents = () => {
        if(this.props.currentUser !== null) {
            return this.state.userEvents.map(event =>
                <Event key={event.id} event={event}/>
            )
        }
    }

    render() { 
        console.log(this.state)
        return (  
            <div>
                <h1>Events</h1>
                {this.renderEvents()}
            </div>
        );
    }
}

export default Home;