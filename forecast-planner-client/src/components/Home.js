import React, { Component } from 'react';
import Event from './Event'
import FriendEvent from './FriendEvent'
import { NavLink } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

class Home extends Component {
    
    renderEvents = () => {
            return this.props.userEvents.map(event =>
                <Event key={event.id} event={event} update={this.props.updateEvents}/>
            )
    }

    renderFriendEvents = () => {
        const frEvents= this.props.friendEvents
        const frEventArr = []
        for (let i = 0; i < frEvents.length; i++) {
            console.log("i: ", i)
            for (let innerI= 0; innerI < frEvents[i].events.length; innerI++) {
                console.log("innerI: ", innerI)
                frEventArr.push(<FriendEvent 
                    name={frEvents[i].name} 
                    key={frEvents[i].events[innerI].id} 
                    event={frEvents[i].events[innerI]}
                    />)
            }
        }
        // return this.props.friendEvents.map( obj => (obj.events.map( event => {
        //     <FriendEvent name={obj.name} key={event.id} event={event} />
        // })))
        return frEventArr;
    }


    render() { 
        return (  
            <div className='home'>
                {this.props.currentUser ? 
                    <>
                        <div className='side'><NavLink to="/new-event" exact>Create New Event</NavLink></div>
                        <div className='main-panel'>
                            <h1>Your Events</h1>
                            <Card.Group>{this.renderEvents()}</Card.Group>
                            <h1>Friends' Events</h1>
                            <Card.Group>{this.renderFriendEvents()}</Card.Group>
                        </div>
                        
                    </>
                :
                <div className='main-panel'>
                    <h1>Welcome to Forecast Planner!</h1>
                    <h4>Log in or Sign up</h4>
                </div>
                }
                
            </div>
        );
    }
}

export default Home;