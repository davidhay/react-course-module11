import React, { useReducer } from "react";
//reducer is more complex that useState - state can be objects

import CartContext from "./cart-context";

//all items that need acess to the cart can be wrapped by this component.
//Cart, Header and Meals
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmt =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCarItem = state.items[existingCartIdx];
    let updatedItems;

    if (existingCarItem) {
      const updateItem = {
        ...existingCarItem,
        amount: existingCarItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIdx] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const result = {
      items: updatedItems,
      totalAmount: updatedTotalAmt,
    };
    console.log("new state is", result);
    return result;
  } else if (action.type === "REMOVE") {
    const existingCartIdx = state.items.findIndex(
        (item) => item.id === action.id
      );  
    const existingCarItem = state.items[existingCartIdx];
    //always correct
    const updatedTotalAmount = state.totalAmount - existingCarItem.price;
    let updatedItems;
    if(existingCarItem.amount === 1){
            //remove item from array
            updatedItems = state.items.filter(it => it.id !== action.id);
    }else{
        const updatedItem = {...existingCarItem, amount: existingCarItem.amount -1}
        updatedItems = [...state.items];
        updatedItems[existingCartIdx] = updatedItem;
    }
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    console.log("adding item", item);
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCart = (id) => {
    console.log("removing item id", id);
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
