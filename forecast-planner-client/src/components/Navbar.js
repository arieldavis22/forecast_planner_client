import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (  
        <div>
            <NavLink
            to="/"
            exact
            >Home</NavLink>

            <NavLink
            to="/login"
            exact
            >Login</NavLink>
            
            <NavLink
            to="/signup"
            exact
            >SignUp</NavLink>
        </div>
    );
}

export default Navbar;