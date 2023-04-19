import { useState, useEffect } from 'react';

function CartCard({order}) {
    const [orderItem, setOrderItem] = useState("")
    useEffect(() => {
    fetch(`/items/${order.item_id}`)
        .then((r) => r.json())
        .then(setOrderItem)
    }, [order]);


    return (
        <div>
            <h2>This is a cart item</h2>
            <p>{orderItem.name}</p>
        </div>
    )
}

export default CartCard