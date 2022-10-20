import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Card from "./components/Card";
function App() {
  const [photoValues, setPhotoValues] = useState([]);
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
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const submitRequest = (parameters) => {
    sendDataRequest(parameters);
  };

  const cardPhotos = photoValues.map((item) => (
    <Card key={item.id} photo={item}></Card>
  ));
  return (
    <>
      <header className="main-title">
        <h1>Meta Photo</h1>
      </header>
      <section>
        <Form onSubmitRequest={submitRequest}></Form>
      </section>
      <section className="container">
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

export default App;
