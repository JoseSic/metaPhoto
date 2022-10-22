import { useState } from "react";

const UseInput = (initialValue) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  return {
    value: enteredValue,
    valueChangeHandler,
  };
};

export default UseInput;
