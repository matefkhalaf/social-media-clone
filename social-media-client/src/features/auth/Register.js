import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "./authSlice";
import { Redirect } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.isError);
  const error = useSelector((state) => state.auth.error);
  const logInStatus = useSelector((state) => state.auth.logged_in);
  let validateForm = () => {
    return email.length > 0 && password.length > 0 && username.length > 0;
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({ username: username, email: email, password: password })
    );
  };

  let content;
  if (isLoading && !isError) {
    content = (
      <div
        className="alert alert-primary"
        role="alert"
        style={{  width: "60%" }}
      >
        Loading...
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ width: "60%" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div>
      {logInStatus ? (
        <Redirect to="/" />
      ) : (
        <div class="col-md-8" style={{ margin: "0.5rem" }}>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Sign Up</h3>
            </div>
            {content}
            <div class="panel-body">
              <form class="form-signin" onSubmit={(e) => handleSubmit(e)}>
                <div class="input-group" style={{ width: "60%" }}>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    name="username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </div>
                <br />
                <div class="input-group" style={{ width: "60%" }}>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email address"
                    name="email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <br />
                <div class="input-group" style={{ width: "60%" }}>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <br />

                <input
                  type="submit"
                  class="btn btn-default navbar-btn"
                  value="Sign Up"
                  disabled={!validateForm()}
                ></input>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
