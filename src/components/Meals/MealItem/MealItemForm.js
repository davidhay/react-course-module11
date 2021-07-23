import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    //we can use refs to extract the value from the dom element - saves 2way binding using state.

    //this is string
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    console.log("enteredAmountNumer", enteredAmountNumber);
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    //setAmountIsValid(true);

    //this form doesn't know about the other bits of data - simply the amount
    props.onAddToCart(enteredAmountNumber);
  };

  const amountInputRef = useRef();
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, // this changed
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
