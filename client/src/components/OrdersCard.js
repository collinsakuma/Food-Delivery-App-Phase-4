import { useState, useEffect } from "react";

function OrdersCard({ item }) {
  
    return (
      <div className="card-body">
          <div className="">
            <div className="center-text" style={{display:"flex"}}>
              <p className=""><strong>{item.name}</strong></p>
              <p>&nbsp;-&nbsp;${(item.price/100).toFixed(2)}</p>
            </div>
          </div>
      </div>
    );
  }
export default OrdersCard;