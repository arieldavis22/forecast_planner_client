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
        .then(() => {
            props.update()
        })

    }
    return (  
        <div>
            <h1>{props.event.title} {props.event.date}</h1>
            <h2>{props.event.details}</h2>
            <h3>{props.event.location.replace(",", ", ")}</h3>
            <h3>{props.event.indoor ? "This is an indoor event" : "This is an outdoor event"}</h3>
            <h4>Chance of precipitation: {props.event.precipitation_chance}%</h4>
            <h4>{props.event.precipitation_chance > 50 ? "Will probably rain" : "Will probably be sunny"}</h4>
            <NavLink to={`/edit/${props.event.id}`}>Edit</NavLink>
            <button onClick={deleteEvent}>Delete Event</button>
        </div>
    );
}

export default Event;