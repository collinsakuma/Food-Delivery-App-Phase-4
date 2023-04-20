import {useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import CartContainer from './CartContainer';

function Profile({ user }) {
    const [cartsArray, setCartsArray] = useState([])
    
    useEffect(() => {
        fetch('/carts')
            .then((r) => r.json())
            .then(setCartsArray)

    },[])
    const filteredCartsArray = cartsArray.filter(cart => cart.user_id === user.id)

    return (
        <div>
            <h1>{user.username}</h1>
            <NavLink exact to = "/profile/edit_profile">Edit Profile</NavLink>
            {filteredCartsArray.map(cart => <CartContainer key={cart.id} cart={cart}/>)}
        </div>
    );
}

export default Profile;