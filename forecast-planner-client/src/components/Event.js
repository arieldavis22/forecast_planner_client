import React from 'react';

const Event = props => {
    return (  
        <div>
            <h1>{props.event.title}</h1>
            <h3>{props.event.indoor ? "Indoor" : "Outdoor"}</h3>
            <h4>{props.event.precipitation_chance}</h4>
            <h4>{props.event.precipitation_chance > 50 ? "Will probably rain" : "Will probably be sunny"}</h4>
        </div>
    );
}

export default Event;