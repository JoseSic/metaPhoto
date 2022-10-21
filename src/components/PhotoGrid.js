import useInput from "./hooks/use-input";
import Card from "./Card";
import classes from "./PhotoGrid.module.css";
const PhotoGrid = (props) => {
  const limitDefaultValue = 25;
  const {
    value: limitValue,
    valueChangeHandler: limitChangeHandler,
    setValues: setLimitValues,
  } = useInput();
  const dummy = (event) => {
    if (event.key === "Enter") {
      console.log(limitValue);
      const parameters = { ...props.parametersValues, limit: limitValue };
      console.log(parameters);
      props.onSendDataRequest(parameters);
    }
  };

  return (
    <>
      <div
        className={`${classes["form-actionsMP"]} ${classes["form-controlMP"]}`}
      >
        <label htmlFor="limit">Limit: </label>
        <input
          id="limit"
          type="number"
          min="1"
          max="500"
          step="1"
          value={limitValue===""?"25":limitValue}
          onChange={limitChangeHandler}
          onKeyDown={dummy}
        ></input>
        <button>Previous</button>
        <button>Next</button>
      </div>
      <div className={classes.container}>
        {props.photoValues.map((item) => (
          <Card key={item.id} photo={item}></Card>
        ))}
      </div>
    </>
  );
};

export default PhotoGrid;
