import { useState, useEffect } from "react";

function OrdersCard({ cart }) {
    const [items, setItems] = useState([]);
  
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
        {items.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    );
  }
export default OrdersCard;