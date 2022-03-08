import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { newUser } from ".api";
import Redirect from "./Redirect";
import Loading from "./Loading";

function registerReducer(state, action) {
  if (action.type === "login") {
    return {
      ...state,
      loading: true,
      error: ""
    };
  } else if (action.type === "success") {
    return {
      ...state,
      loading: false,
      error: "",
      registered: true
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  } else if (action.type === "input") {
    return {
      ...state,
      [action.name]: action.value
    };
  } else {
    throw new Error("That action does not exist");
  }
}

const initialState = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: "",
  registered: false
};

function Register() {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "login" });

    newUser({ username, email, password })
      .then(() => dispatch({ type: "success" }))
      .catch((error) => dispatch({ type: "error", error }));
  };

  if (state.registered === true) {
    return <Redirect to="/dashboard" />;
  }

  if (state.loading === true) {
    return <Loading />;
  }

  return (
    <>
      {state.error && <p>{state.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={state.email}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={state.username}
        />
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={state.password}
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
