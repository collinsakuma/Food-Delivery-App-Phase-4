import React from 'react'
import { NavLink } from "react-router-dom";

function Profile({ user }) {

    return (
        <div>
            <h1>{user.username}</h1>
            <NavLink exact to = "/profile/edit_profile">Edit Profile</NavLink>
        </div>
    );
}

export default Profile;