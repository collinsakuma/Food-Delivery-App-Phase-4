import { useState, useEffect } from "react";

function OrdersCard({ items }) {
  
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>${item.price/100}</p>
          </div>
        ))}
      </div>
    );
  }
export default OrdersCard;