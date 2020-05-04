import React from 'react';
import { NavLink } from 'react-router-dom';



const Event = props => {
    
    const deleteEvent = () => {
        //fetch delete
        fetch(`http://localhost:3000/events/${props.event.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json)
        .then( response => {
            this.props.history.push("/");
            this.props.updateEvents()
        })
        //then redirect and update events
    }
    return (  
        <div>
            <h1>{props.event.title}</h1>
            <h3>{props.event.indoor ? "Indoor" : "Outdoor"}</h3>
            <h4>{props.event.precipitation_chance}</h4>
            <h4>{props.event.precipitation_chance > 50 ? "Will probably rain" : "Will probably be sunny"}</h4>
            <NavLink to={`/edit/${props.event.id}`}>Edit</NavLink>
            <button onClick={deleteEvent}>Delete Event</button>
        </div>
    );
}

export default Event;