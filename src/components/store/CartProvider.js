import React, { useState } from "react";
import ReactDOM from "react-dom";
import CartContext from "./cart-context";

//all items that need acess to the cart can be wrapped by this component.
//Cart, Header and Meals
const CartProvider = (props) => {
  const addItemToCart = (item) => {};
  const removeItemFromCart = (id) => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
