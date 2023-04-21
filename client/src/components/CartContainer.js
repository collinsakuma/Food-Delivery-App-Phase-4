import {useState, useEffect} from "react";
import OrdersCard from "./OrdersCard";

function CartContainer({ cart }) {
    
    const [items, setItems] = useState([]);
    const [orderTotal, setOrderToal] = useState(0);
  
    useEffect(() => {
        const itemsOrdered = cart.order_string;
        const itemsOrderedArray = itemsOrdered.split(",");
        // console.log(itemsOrderedArray);
  
        const promises = itemsOrderedArray.map((item) => {
            return fetch(`/items/${item}`).then((r) => r.json());
        });
  
        Promise.all(promises).then((items) => {
            setItems(items);
        });
    }, [cart.order_string]);

    return (
        <div className="card m-3">
            {items.map((item) => <OrdersCard key={item.id} item={item}/>)}
            <div className="card-footer bg-transparent">
                <label><strong>Total Cost: </strong>${(cart.order_total/100).toFixed(2)}</label>
            </div>
        </div>
    )
}
export default CartContainer;