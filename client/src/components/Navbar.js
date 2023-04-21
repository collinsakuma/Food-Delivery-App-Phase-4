import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar({ handleLogout }) {
    return (
        <div className='navbar navbar-expand header-padding'>
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact to='/' className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item"> 
                        <NavLink to='/neworder' className="nav-link">Order</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/menu' className="nav-link">Menu</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/profile' className="nav-link">Profile</NavLink>
                    </li>
                </ul>
                <div>
                <button className="nav-link button-link" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
