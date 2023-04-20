import {useState, useEffect} from "react";
import OrderCard from "./OrdersCard";

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
        <div>
            <OrderCard items={items}/>
            <label>Total Price: ${cart.order_total/100}</label>
        </div>
    )
}
export default CartContainer;