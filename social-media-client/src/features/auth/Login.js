import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "./authSlice";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.isError);
  const error = useSelector((state) => state.auth.error);
  const logInStatus = useSelector((state) => state.auth.logged_in);

  let validateForm = () => {
    return email.length > 0 && password.length > 0;
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser({ email: email, password: password }));
  };
  let content;
  if (isLoading && !isError) {
    content = (
      <div
        className="alert alert-primary"
        role="alert"
        style={{ width: "60%" }}
      >
        Loading...
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="alert alert-danger" role="alert" style={{ width: "60%" }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      {logInStatus ? (
        <Redirect to="/" />
      ) : (
        <div className="col-md-8" style={{ margin: "0.5rem" }}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2>Log In</h2>
            </div>
            {content}
            <div className="panel-body">
              <form className="form-signin" onSubmit={(e) => handleSubmit(e)}>
                <div className="input-group" style={{ width: "60%" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <br />
                <div className="input-group" style={{ width: "60%" }}>
                  <span className="input-group-addon" id="basic-addon1">
                    <span
                      className="glyphicon glyphicon-lock"
                      aria-hidden="true"
                    ></span>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPassword(e.target.value)}
                  
                  ></input>
                </div>

                <input
                  type="submit"
                  className="btn btn-default navbar-btn"
                  value="Sign In"
                  disabled={!validateForm()}
                  style={{ margin: "0.5rem" }}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
