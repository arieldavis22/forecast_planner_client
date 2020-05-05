import React from 'react';
import { NavLink } from 'react-router-dom';
<<<<<<< HEAD
import { delEvent } from '../FetchData'
=======
import { Card, Button, Image } from 'semantic-ui-react'
>>>>>>> 48092352ae0a1e0299f3e4a50d08e8f9a60ed136



const Event = props => {
    
    const deleteEvent = () => {
        delEvent(props.event.id)
        .then(r => r.json)
        .then(() => {
            props.update()
        })

    }
    return (  
        <Card>
            <Card.Description as='h2'>{props.event.title} </Card.Description>
            <Card.Meta>{props.event.details}</Card.Meta>
            <Card.Description as='h4'>
                {props.event.date}<br/>
                {props.event.location.replace(",", ", ")}
            </Card.Description>
            {/* <Card.Header as='h4'>{props.event.location.replace(",", ", ")}</Card.Header> */}
            
            
            <Card.Description>
                {props.event.indoor ? "This is an indoor event" : "This is an outdoor event"}<br/>
                <strong>Chance of precipitation: {props.event.precipitation_chance}%</strong><br/>
                {props.event.precipitation_chance > 50 ? "Will probably rain" : "Will probably be sunny"}
                </Card.Description>
                <div >
                    <Button as={NavLink} to={`/edit/${props.event.id}`} floated='left'>Edit</Button>
                    <Button onClick={deleteEvent} color='red' floated='right' size='mini'>X</Button>
                </div>
            
        </Card>
    );
}

export default Event;