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
        if (orderList.length === 0)
            alert("Your cart is empty ya bozo (-_____-)")
        else {
            fetch("/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            clearCart()
            setOrderTotal(0)
            alert('Order placed!')
        }   
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
        <div className='Orders'>
            <h1>Your Order</h1>
            <label style={{margin:"10px"}}>Order Total: ${(orderTotal/100).toFixed(2)}</label>
            <br></br>
            <button className="maroonButtonColor-btn" onClick={handlePlaceOrder} style={{margin: "20px"}}>Place Order</button>
            {orderList.map(order => <CartCard key={order.id} order={order}/>)}
            <br></br>
            <div style={{marginTop:"1000px"}}></div>
        </div>
    );
}

export default NewOrder;