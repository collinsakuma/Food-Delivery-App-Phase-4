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
            <img src={orderItem.img_url}/>
            <p>${orderItem.price/100}</p>
           
        </div>
    )
}

export default CartCard