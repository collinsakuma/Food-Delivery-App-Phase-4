import { useState, useEffect } from 'react';
import CartCard from './CartCard';
function NewOrder({ orderList, clearCart, user }) {
    const [orderTotal, setOrderTotal] = useState(0)
    
    const handlePlaceOrder = () => {
        const orderListString = orderList.toString()
        const body = {
            order_string: orderListString,
            user_id: user.id,
            order_total: orderTotal,
        };
        fetch("/carts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        clearCart()
        setOrderTotal(0)
    }
    useEffect(() => {
        let total = 0;
        orderList.forEach(order => {
          fetch(`/items/${order}`)
            .then((r) => r.json())
            .then((r) => {
              total += r.price;
              setOrderTotal(total);
            });
        });
      }, [orderList]);
    console.log(orderTotal)
    return (
        <div>
            <h1>Your Cart</h1>
            {orderList.map(order => <CartCard key={order.id} order={order}/>)}
            <button onClick={handlePlaceOrder}>Place Order</button>
            <br></br>
            <label>Order Total: ${orderTotal/100}</label>
        </div>
    );
}

export default NewOrder;