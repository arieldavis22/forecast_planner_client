import React, { Component } from 'react';
import Event from './Event'
import { NavLink } from 'react-router-dom';

class Home extends Component {
    


    // componentDidMount() {
    //     // this.props.getEvents()
    // }

    renderEvents = () => {
        if(this.props.currentUser !== null) {
            return this.props.userEvents.map(event =>
                <Event key={event.id} event={event}/>
            )
        }
    }

    render() { 
        return (  
            <div>
                <NavLink to="/new-event" exact>Create New Event</NavLink>
                <h1>Events</h1>
                {this.renderEvents()}
            </div>
        );
    }
}

export default Home;