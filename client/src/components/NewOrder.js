import { useEffect } from 'react';
import CartCard from './CartCard';
function NewOrder({ orders, onNewOrder, orderList, clearCart, user }) {

const addNewOrder = (order) => {
    onNewOrder(order);
}

const handlePlaceOrder = () => {
    const orderListString = orderList.toString()
    const body = {
        order_string: orderListString,
        user_id: user.id,
    };
    fetch("/carts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    clearCart()
}
  
    return (
        <div>
            <h1>Your Cart</h1>
            {orderList.map(order => <CartCard key={order.id} order={order}/>)}
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default NewOrder;