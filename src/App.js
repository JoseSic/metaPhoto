import "./App.css";
import Form from "./components/Form";
function App() {
  const sendDataRequest = async (parameters) => {
    try {
      const response = await fetch("http://localhost:3001/api/meals/");
      
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitRequest = (parameters) => {
    sendDataRequest();
  };
  return (
    <>
      <header className="main-title">
        <h1>Meta Photo</h1>
      </header>
      <section>
        <Form onSubmitRequest={submitRequest}></Form>
      </section>

      {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
    </>
  );
}

export default App;
