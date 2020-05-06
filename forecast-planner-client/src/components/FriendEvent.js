import React from 'react';
import { Card } from 'semantic-ui-react'
import rain from '../rain.jpg';
import sun from '../sun.jpg';


const FriendEvent = props => {
    const precip = props.event.precipitation_chance

    return (  
        <Card className='weather'
        style={ precip !== null ? (precip >= 50 ? {backgroundImage: `url(${rain})`} : {backgroundImage: `url(${sun})`}) : {backgroundColor: '#fefffc'} }>
            <Card.Description as='h2'>{props.name}'s Event: <br/>{props.event.title} </Card.Description>
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
            
        </Card>
    );
}

export default FriendEvent;