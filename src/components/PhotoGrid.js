import Card from "./Card";
import useInput from "./hooks/use-input";
import classes from "./PhotoGrid.module.css";

const PhotoGrid = (props) => {
  const {
    value: inputLimitValue,
    valueChangeHandler: inputChangeHandler,
    setValues: setInputLimitValue,
  } = useInput(props.enteredData.limit);
  console.log("PhotoGrid", inputLimitValue);

  const limitKeyDown = (event) => {
    if (event.key === "Enter") {
      const limitValueInput = event.target.value;
      if (
        limitValueInput !== "" &&
        limitValueInput !== "0" &&
        props.enteredData.pages > 0
      ) {
        console.log("enter", { ...props.parametersValues });
        const parameters = {
          ...props.parametersValues,
          limit: limitValueInput,
        };
        setInputLimitValue(limitValueInput);
        props.onSendDataRequest(parameters);
      }
    }
  };

  const newPage = (nextOffset) => {
    const parameters = {
      ...props.parametersValues,
      limit: props.enteredData.limit,
      offset: nextOffset,
    };
    setInputLimitValue(props.enteredData.limit);
    console.log(+props.enteredData.limit);
    props.onSendDataRequest(parameters);
  };

  const nextPage = () => {
    if (props.enteredData.currentPage < props.enteredData.pages) {
      const nextOffset = props.enteredData.offset + +props.enteredData.limit;
      newPage(nextOffset);
    }
  };

  const previousPage = () => {
    if (props.enteredData.currentPage > 1) {
      const nextOffset = props.enteredData.offset - +props.enteredData.limit;
      newPage(nextOffset);
    }
  };

  const dataActions = (
    <>
      <div className={classes["form-controlMP"]}>
        <label htmlFor="limit">Limit: </label>
        <input
          id="limit"
          type="number"
          min="1"
          max="500"
          step="1"
          disabled={props.enteredData.photos.length <= 0}
          value={inputLimitValue}
          onChange={inputChangeHandler}
          onKeyDown={limitKeyDown}
        ></input>
        <button type="button" onClick={previousPage}>
          Previous
        </button>
        <button type="button" onClick={nextPage}>
          Next
        </button>
        <span>
          Page: {props.enteredData.currentPage} / {props.enteredData.pages}
        </span>
      </div>
    </>
  );
  const cardPhotos = (
    <>
      {dataActions}
      <div className={classes.container}>
        {props.enteredData.photos.map((item) => (
          <Card key={item.id} photo={item}></Card>
        ))}
      </div>
    </>
  );

  return <>{cardPhotos}</>;
};

export default PhotoGrid;
