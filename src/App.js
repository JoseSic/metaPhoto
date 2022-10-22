import "./App.css";
import MetaPhoto from "./components/MetaPhoto.js";
function App() {
  console.log("renderApp");
  return (
    <>
      <header className="main-title ">
        <h1>Meta Photo</h1>
      </header>
      <MetaPhoto />
    </>
  );
}

export default App;
