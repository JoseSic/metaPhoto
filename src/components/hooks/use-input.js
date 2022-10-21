import { useState } from "react";

const UseInput = () => {
  const [enteredValue, setEnteredValue] = useState("");

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const resetValues = () => {
    setEnteredValue("");
  };

  const setValues = (value) => {
    setEnteredValue(value);
  };

  return {
    value: enteredValue,
    valueChangeHandler,
    resetValues,
    setValues,
  };
};

export default UseInput;
