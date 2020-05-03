import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = props => {
    const handleLogout = () => {
        fetch('http://localhost:3000/logout', {
            method: "POST",
            credentials: 'include'
        })
        .then(r => r.json())
        .then(props.logout())
    }

    return (  
        <div>
            <NavLink
            to="/"
            exact
            >Home</NavLink>
            {props.currentUser ? (
                <Fragment>
                <h1>{props.currentUser}</h1>
                <button onClick={() => handleLogout()}>Log Out</button>
                <NavLink to="/new-event" exact>Create New Event</NavLink>
                </Fragment>
            ) : (
                <Fragment>
                <NavLink to="/login" exact>Login</NavLink>
                <NavLink to="/signup" exact>SignUp</NavLink>
                </Fragment>
            )}
            
        </div>
    );
}

export default Navbar;