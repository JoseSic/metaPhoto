import { useState } from "react";

const UseInput = () => {
  const [enteredValue, setEnteredValue] = useState("");

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
