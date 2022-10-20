import { useState } from "react";
import Form from "./Form";
import Card from "./Card";
import classes from "./MetaPhoto.module.css";
function MetaPhoto() {
  const [photoValues, setPhotoValues] = useState([]);
  const [parametersValues, setParameters] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const sendDataRequest = async (parameters) => {
    setLoading(true);
    try {
      console.log(
        "http://localhost:3001/api/photos?" + new URLSearchParams(parameters)
      );
      const response = await fetch(
        "http://localhost:3001/api/photos?" + new URLSearchParams(parameters)
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setPhotoValues(data);
      setParameters(parameters)
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const submitRequest = (parameters) => {
    sendDataRequest(parameters);
  };

  const dummy = (event) => {

    if (event.key === "Enter") {
        
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
          onKeyDown={dummy}
        ></input>
        <button>Previous</button>
        <button>Next</button>
      </div>
      <div className={classes.container}>
        {photoValues.map((item) => (
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
        {!isLoading && photoValues.length > 0 && !isError && cardPhotos}
      </section>
      <section>
        {!isLoading && photoValues.length === 0 && !isError && (
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
