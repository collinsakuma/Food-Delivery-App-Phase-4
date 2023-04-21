import { useState, useEffect } from 'react';

function CartCard({order}) {
    const [orderItem, setOrderItem] = useState("")
    useEffect(() => {
    fetch(`/items/${order}`)
        .then((r) => r.json())
        .then(setOrderItem)
    }, [order]);
    return (
        <div>
            
            <p>{orderItem.name}</p>
            <img className = 'MenuItem-image' src={orderItem.img_url}/>
            <p>${(orderItem.price/100).toFixed(2)}</p>
           
        </div>
    )
}

export default CartCard