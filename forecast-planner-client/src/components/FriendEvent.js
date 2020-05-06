import React from 'react';
import { Card } from 'semantic-ui-react'
import rain from '../rain.jpg';
import sun from '../sun.jpg';


const FriendEvent = props => {
    

    return (  
        <Card className='weather'
        style={ props.event.precipitation_chance > 50 ? {backgroundImage: `url(${rain})`} : {backgroundImage: `url(${sun})`} }>
            <Card.Description as='h2'>{props.name}'s Event: <br/>{props.event.title} </Card.Description>
            <Card.Meta>{props.event.details}</Card.Meta>
            <Card.Description as='h4'>
                {props.event.date}<br/>
                {props.event.location.replace(",", ", ")}
            </Card.Description>
            <Card.Description>
                {props.event.indoor ? "This is an indoor event" : "This is an outdoor event"}<br/>
                <strong>Chance of precipitation: {props.event.precipitation_chance}%</strong><br/>
                {!props.event.indoor && props.event.precipitation_chance > 30 ? <p style={{color: "red"}}>Rain may occur during your outdoor event</p> : null}
                {props.event.precipitation_chance > 50 ? "Will probably rain" : "Will probably be sunny"}
            </Card.Description>
            
        </Card>
    );
}

export default FriendEvent;