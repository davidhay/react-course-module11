import React, { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  //this component will now re-render when context changes.
  //nice
  const numItems = cartCtx.items.reduce((acc, item) => acc + item.amount, 0);
  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numItems}</span>
      <span></span>
    </button>
  );
};

export default HeaderCartButton;
