import React, { Fragment } from 'react';
import Event from './Event'
import { NavLink } from 'react-router-dom';

const Home = ({ currentUser, userEvents, updateEvents }) => {

    const renderEvents = () => {
            return userEvents.map(event =>
                <Event key={event.id} event={event} update={updateEvents}/>
            )
    }

    return (  
        <div>
            {currentUser ? 
                <Fragment>
                    <NavLink to="/new-event" exact>Create New Event</NavLink>
                    <h1>Events</h1>
                    {renderEvents()}
                </Fragment>
            :
                <Fragment>
                    <h1>Welcome to Forecast Planner!</h1>
                    <h4>Log in or Sign up</h4>
                </Fragment>
            }
        </div>
    );
}

export default Home;