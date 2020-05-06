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

    const precip = props.event.precipitation_chance

    return (  
        <Card className='weather'
            style={ precip !== null ? (precip >= 50 ? {backgroundImage: `url(${rain})`} : {backgroundImage: `url(${sun})`}) : {backgroundColor: '#fefffc'} }>
            <Card.Description as='h2'>{props.event.title} </Card.Description>
            <Card.Meta>{props.event.details}</Card.Meta>
            <Card.Description as='h4'>
                {props.event.date}<br/>
                {props.event.location.replace(",", ", ")}
            </Card.Description>
            <Card.Description>
                {props.event.indoor ? "This is an indoor event" : "This is an outdoor event"}<br/>
                {precip !== null ?
                <React.Fragment>
                    <strong>Chance of precipitation: {precip}%</strong><br/>
                    {!props.event.indoor && precip >= 50 ? <p style={{color: "red"}}>Rain likely to occur during your outdoor event</p> : null}
                    {precip >= 30 ? "Might rain" : "Will probably be sunny"}
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