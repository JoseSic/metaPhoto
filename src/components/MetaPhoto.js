import { useState } from "react";
import Form from "./Form";
import classes from "./MetaPhoto.module.css";
import useInput from "./hooks/use-input";
import Card from "./Card";

function MetaPhoto() {
  const [photoValues, setPhotoValues] = useState({
    pages: 0,
    offset: 0,
    limit: 0,
    currentPage: 0,
    photos: [],
  });
  const [parametersValues, setParameters] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const limitDefaultValue = "25";
  const [limitValue, setLimitValue] = useState(0);

  const sendDataRequest = async (parameters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:3001/api/photos?" + new URLSearchParams(parameters)
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setPhotoValues(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const submitRequest = (parameters) => {
    setLimitValue(limitDefaultValue);
    setParameters(parameters);
    sendDataRequest(parameters);
  };

  const dummy = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(event.target.value, "value");
      const limitValueInput = event.target.value;
      if (limitValueInput !== "" && limitValueInput !== "0") {
        const parameters = { ...parametersValues, limit: limitValueInput };
        setLimitValue(limitValueInput);
        sendDataRequest(parameters);
      }
    }
  };

  const nextPage = (event) => {
    if (photoValues.currentPage < photoValues.pages) {
      const nextOffset = photoValues.offset + +limitValue;
      const parameters = {
        ...parametersValues,
        limit: limitValue,
        offset: nextOffset,
      };
      console.log(parameters);
      sendDataRequest(parameters);
    }
  };

  const previousPage = (event) => {
    if (photoValues.currentPage > 1) {
      const nextOffset = photoValues.offset - +limitValue;
      const parameters = {
        ...parametersValues,
        limit: limitValue,
        offset: nextOffset,
      };
      console.log(parameters);
      sendDataRequest(parameters);
    }
  };

  const cardPhotos = (
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
          defaultValue={limitValue}
          onKeyDown={dummy}
        ></input>
        <button type="button" onClick={previousPage}>
          Previous
        </button>
        <button type="button" onClick={nextPage}>
          Next
        </button>
        <span> Page: </span>
        <span>
          {photoValues.currentPage} / {photoValues.pages}
        </span>
      </div>
      <div className={classes.container}>
        {photoValues.photos.map((item) => (
          <Card key={item.id} photo={item}></Card>
        ))}
      </div>
    </>
  );
  return (
    <>
      <header className={classes["main-title"]}>
        <h1>Meta Photo</h1>
      </header>
      <section>
        <Form onSubmitRequest={submitRequest}></Form>
      </section>
      <section>
        {!isLoading && photoValues.photos.length > 0 && !isError && cardPhotos}
      </section>
      <section>
        {!isLoading && photoValues.photos.length === 0 && !isError && (
          <h2>
            <p>Found no Photos :(</p>
          </h2>
        )}
        {isLoading && (
          <h2>
            <p>is Loading...!</p>
          </h2>
        )}
        {!isLoading && isError && (
          <h2>
            <p>{isError}</p>
          </h2>
        )}
      </section>
    </>
  );
}

export default MetaPhoto;
