import { useState } from "react";

const UseInput = (initialValue) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const setValues = (value) => {
    setEnteredValue(value);
  };

  return {
    value: enteredValue,
    valueChangeHandler,
    setValues,
  };
};

export default UseInput;
