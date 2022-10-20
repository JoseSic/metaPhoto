import classes from "./Form.module.css";
import useInput from "./hooks/use-input";
const Form = (props) => {
  const {
    value: photoTitleValue,
    valueChangeHandler: photoTitleChangeHandler,
    resetValues: resetPhotoTitleValues,
  } = useInput();

  const {
    value: userEmailValue,
    valueChangeHandler: userEmailChangeHandler,
    resetValues: resetUserEmailValues,
  } = useInput();

  const {
    value: albumTitleValue,
    valueChangeHandler: albumTitleChangeHandler,
    resetValues: resetAlbumTitleValues,
  } = useInput();

  const {
    value: offsetValue,
    valueChangeHandler: offsetChangeHandler,
    resetValues: resetOffsetValues,
  } = useInput();

  const {
    value: limitValue,
    valueChangeHandler: limitChangeHandler,
    resetValues: resetLimitValues,
  } = useInput();

  const submitHandler = (event) => {
    event.preventDefault();
    const parameters = {};
    if (photoTitleValue !== "") {
      parameters.title = photoTitleValue;
    }
    if (userEmailValue !== "") {
      parameters["album.user.email"] = photoTitleValue;
    }
    if (albumTitleValue !== "") {
      parameters["album.title"] = photoTitleValue;
    }
    if (offsetValue !== "") {
      parameters.offset = offsetValue;
    }
    if (limitValue !== "") {
      parameters.limit = limitValue;
    }
    props.onSubmitRequest(parameters);
    console.log(parameters);
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
          <div className={classes["form-control"]}>
            <label htmlFor="offset">Offset</label>
            <input
              id="offset"
              type="number"
              min="1"
              max="500"
              step="1"
              value={offsetValue}
              onChange={offsetChangeHandler}
            ></input>
          </div>
        </div>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="limit">Limit</label>
            <input
              id="limit"
              type="number"
              min="1"
              max="500"
              step="1"
              value={limitValue}
              onChange={limitChangeHandler}
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
