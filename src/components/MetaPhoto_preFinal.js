import { useState, useEffect } from "react";
import Form from "./Form";
import PhotoGrid from "./PhotoGrid";

function MetaPhoto() {
  const [parametersValues, setParameters] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [enteredData, setData] = useState({
    pages: 0,
    offset: 0,
    limit: 0,
    currentPage: 0,
    photos: [],
  });
  const apiUri = "http://localhost:3001/api/photos?";

  const sendDataRequest = async (parameters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUri + new URLSearchParams(parameters));

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      /*    const newDataObject ={
        pages: data.pages,
        offset: data.offset,
        limit: data.limit,
        currentPage: data.currentPage,
        photos: [...data.photos],
      } */
      setData(data);
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
    sendDataRequest(parameters);
  };

  return (
    <>
      <section>
        <Form onSubmitRequest={submitRequest}></Form>
      </section>
      <section>
        {isLoading && <p>is Loading...!</p>}
        {!isLoading && isError && <p>{isError}</p>}
        {!isLoading && enteredData.photos.length > 0 && !isError && (
          <PhotoGrid
            enteredData={enteredData}
            parametersValues={parametersValues}
            onSendDataRequest={sendDataRequest}
          />
        )}
        {!isLoading && enteredData.photos.length === 0 && !isError && (
          <p>Found no Photos</p>
        )}
      </section>
    </>
  );
}

export default MetaPhoto;
