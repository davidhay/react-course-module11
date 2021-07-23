import React, { useReducer } from "react";
//reducer is more complex that useState - state can be objects

import ReactDOM from "react-dom";
import CartContext from "./cart-context";

//all items that need acess to the cart can be wrapped by this component.
//Cart, Header and Meals
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action === "ADD") {
    //add to new array
    const updatedItems = state.items.concat(action.item);
    const updateTotalAmt =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmoumt: updatedTotalAmt,
    };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(reducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCart = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
