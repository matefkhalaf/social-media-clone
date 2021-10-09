import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "./authSlice";
import { Redirect } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const logInStatus = useSelector((state) => state.auth.logged_in);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.isError);
  const error = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (logInStatus) {
      dispatch(logOutUser());
    }
  }, [logInStatus, dispatch]);

  let content;
  if (isLoading && !isError) {
    content = (
      <div
        className="alert alert-primary"
        role="alert"
        style={{ margin: "0.5rem", width: "60%" }}
      >
        Loading...
      </div>
    );
  } else if (!isLoading && !isError) {
    content = <Redirect to="/" />;
  } else if (!isLoading && isError) {
    content = (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ margin: "0.5rem", width: "60%" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className="col-md-8" style={{ margin: "0.5rem" }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2>Log Out</h2>
        </div>
        {content}
      </div>
    </div>
  );
};
