import {useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import OrdersCard from './OrdersCard';

function Profile({ user }) {
    const [cartsArray, setCartsArray] = useState([])
    
    useEffect(() => {
        fetch('/carts')
            .then((r) => r.json())
            .then(setCartsArray)

    },[])
    const filteredCartsArray = cartsArray.filter(cart => cart.user_id === user.id)
    console.log(filteredCartsArray)

    

    

    return (
        <div>
            <h1>{user.username}</h1>
            {filteredCartsArray.map(cart => <OrdersCard key={cart.id} cart={cart}/>)}
            <NavLink exact to = "/profile/edit_profile">Edit Profile</NavLink>
        </div>
    );
}

export default Profile;