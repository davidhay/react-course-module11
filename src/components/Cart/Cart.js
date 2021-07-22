import React from "react";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const data = [{ id: "c1", name: "sushi", price: 12.99 }];

  const cartItems = (
    <ul className={classes["cart-item"]}>
      {data.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
