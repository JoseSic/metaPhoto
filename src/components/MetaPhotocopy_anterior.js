import { useState, useEffect } from "react";
import Form from "./Form";
import classes from "./MetaPhoto.module.css";
import Card from "./Card";

function MetaPhoto() {
  const [parametersValues, setParameters] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const limitDefaultValue = "25";
  const [limitValue, setLimitValue] = useState(limitDefaultValue);
  const [inputLimitValue, setInputLimitValue] = useState(limitDefaultValue);
  const uriApi = "http://localhost:3001/api/photos?";
  const [photoValues, setPhotoValues] = useState({
    pages: 0,
    offset: 0,
    limit: 0,
    currentPage: 0,
    photos: [],
  });

  const sendDataRequest = async (parameters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(uriApi + new URLSearchParams(parameters));

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
  useEffect(() => {
    sendDataRequest("");
  }, []);

  const submitRequest = (parameters) => {
    setParameters(parameters);
    setLimitValue(limitDefaultValue);
    setInputLimitValue(limitDefaultValue);
    sendDataRequest(parameters);
  };

  const onchangeLimit = (event) => {
    setInputLimitValue(event.target.value);
  };

  const limitKeyDown = (event) => {
    if (event.key === "Enter") {
      const limitValueInput = event.target.value;
      if (
        limitValueInput !== "" &&
        limitValueInput !== "0" &&
        photoValues.pages > 0
      ) {
        const parameters = { ...parametersValues, limit: limitValueInput };
        setLimitValue(limitValueInput);
        sendDataRequest(parameters);
      }
    }
  };

  const newPage = (nextOffset) => {
    const parameters = {
      ...parametersValues,
      limit: limitValue,
      offset: nextOffset,
    };
    setInputLimitValue(limitValue);
    console.log(parameters);
    sendDataRequest(parameters);
  };

  const nextPage = () => {
    if (photoValues.currentPage < photoValues.pages) {
      const nextOffset = photoValues.offset + +limitValue;
      newPage(nextOffset);
    }
  };

  const previousPage = () => {
    if (photoValues.currentPage > 1) {
      const nextOffset = photoValues.offset - +limitValue;
      newPage(nextOffset);
    }
  };

  const cardPhotos = (
    <>
      <div className={classes.container}>
        {photoValues.photos.map((item) => (
          <Card key={item.id} photo={item}></Card>
        ))}
      </div>
    </>
  );

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
          disabled={photoValues.photos.length <= 0}
          value={inputLimitValue}
          onChange={onchangeLimit}
          onKeyDown={limitKeyDown}
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
        {dataActions}
        {!isLoading && photoValues.photos.length > 0 && !isError && cardPhotos}
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
