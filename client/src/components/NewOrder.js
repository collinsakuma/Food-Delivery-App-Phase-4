import React from 'react';
import CartCard from './CartCard';
function NewOrder({ orders }) {

    return (
        <div>
            {orders.map(order => <CartCard key={order.id} order={order}/>)}
        </div>
    );
}

export default NewOrder;