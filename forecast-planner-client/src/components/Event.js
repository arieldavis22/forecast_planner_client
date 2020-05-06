import React from 'react';
import rain from '../rain.jpg';
import sun from '../sun.jpg';
import { NavLink } from 'react-router-dom';
import { delEvent } from '../FetchData'
import { Card, Button } from 'semantic-ui-react'



const Event = props => {
    
    const deleteEvent = () => {
        delEvent(props.event.id)
        .then(r => r.json)
        .then(() => {
            props.update()
        })
    }

    return (  
        <Card className='weather'
            style={ props.event.precipitation_chance > 50 ? {backgroundImage: `url(${rain})`} : {backgroundImage: `url(${sun})`} }>
            <Card.Description as='h2'>{props.event.title} </Card.Description>
            <Card.Meta>{props.event.details}</Card.Meta>
            <Card.Description as='h4'>
                {props.event.date}<br/>
                {props.event.location.replace(",", ", ")}
            </Card.Description>
            <Card.Description>
                {props.event.indoor ? "This is an indoor event" : "This is an outdoor event"}<br/>
                {props.event.precipitation_chance !== null ?
                <React.Fragment>
                    <strong>Chance of precipitation: {props.event.precipitation_chance}%</strong><br/>
                    {!props.event.indoor && props.event.precipitation_chance > 50 ? <p style={{color: "red"}}>Rain likely to occur during your outdoor event</p> : null}
                    {props.event.precipitation_chance > 30 ? "Might rain" : "Will probably be sunny"}
                </React.Fragment>
                : 
                <p>No weather data available</p>}
            </Card.Description>
                <div >
                    <Button as={NavLink} to={`/edit/${props.event.id}`} floated='left'>Edit</Button>
                    <Button onClick={deleteEvent} color='red' floated='right' size='mini'>X</Button>
                </div>
        </Card>
    );
}

export default Event;