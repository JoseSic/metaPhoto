import { useState } from "react";

const UseInput = () => {
  const [enteredValue, setEnteredValue] = useState("");

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const resetValues = () => {
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    valueChangeHandler,
    resetValues,
  };
};

export default UseInput;
