import classes from "./Form.module.css";
import useInput from "./hooks/use-input";
const Form = (props) => {
  const {
    value: photoTitleValue,
    valueChangeHandler: photoTitleChangeHandler,
  } = useInput("");

  const { value: userEmailValue, valueChangeHandler: userEmailChangeHandler } =
    useInput("");

  const {
    value: albumTitleValue,
    valueChangeHandler: albumTitleChangeHandler,
  } = useInput("");

  const submitHandler = (event) => {
    event.preventDefault();
    const parameters = {};
    if (photoTitleValue !== "") {
      parameters.title = photoTitleValue;
    }
    if (userEmailValue !== "") {
      parameters["album.user.email"] = userEmailValue;
    }
    if (albumTitleValue !== "") {
      parameters["album.title"] = albumTitleValue;
    }
    console.log(parameters, "form");
    props.onSubmitRequest(parameters);
  };
  return (
    <div className={classes["data-form"]}>
      <div>
        <h3>Parameters</h3>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="photoTitle">Photo Title</label>
            <input
              id="photoTitle"
              type="text"
              value={photoTitleValue}
              onChange={photoTitleChangeHandler}
            ></input>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="albumTitle">Album Title</label>
            <input
              id="albumTitle"
              type="text"
              value={albumTitleValue}
              onChange={albumTitleChangeHandler}
            ></input>
          </div>
        </div>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="userEmail">User Email</label>
            <input
              id="userEmail"
              type="text"
              value={userEmailValue}
              onChange={userEmailChangeHandler}
            ></input>
          </div>
          <div className={classes["form-actions"]}>
            <button>Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
