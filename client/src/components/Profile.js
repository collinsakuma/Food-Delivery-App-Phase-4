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
            <br></br>
            <div className="text-center">
                <img className="profile-image" src={user.img_url} />
            </div>
            <br></br>
            <div className="text-center">
                <p><strong>Username:</strong> {user.username}</p>
            </div>
            <div className="text-center">
                <p><strong>Address: </strong> {user.address}</p>
            </div>
            <div className="text-center">
                <NavLink exact to = "/profile/edit_profile">
                    <button className="maroonButtonColor-btn">
                        Edit Profile
                    </button>
                </NavLink>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container">
                <h2 className="text-center pastorders">Past Orders</h2>
            </div>
            <div className="container container-cards">
                <div className="row row-cols-2">
                    {filteredCartsArray.map(cart => <CartContainer key={cart.id} cart={cart}/>)}
                </div>
            </div>
        </div>
    );
}

export default Profile;