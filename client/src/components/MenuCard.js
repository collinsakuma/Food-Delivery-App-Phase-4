import React from 'react'
import {useEffect, useState} from 'react'

function MenuCard({menuItem, user, handleOrders}) {
    const createOrder = async () => { 
      const order = {
            item_id: menuItem.id,
            user_id: user.id,
            quantity: 1,
            status: 1,
        };
        handleOrders(order.item_id)
        try {
            const response = await fetch('/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(order),
            });
      
            if (!response.ok) {
              throw new Error('Failed to create order');
            }
      
            const data = await response.json();
            console.log('Order created:', data);
          } catch (error) {
            console.error('Error:', error);
          }
        
    };
    

    return(
    <div className='MenuItem'>
        <h2>{menuItem.name}</h2>
        <img className='MenuItem-image' src={menuItem.img_url} />
        <h3>Category:{menuItem.category}</h3>
        <h3>${menuItem.price /100}</h3>
        <button onClick={createOrder}>Add to Cart</button>
    </div>
    );
}



export default MenuCard;