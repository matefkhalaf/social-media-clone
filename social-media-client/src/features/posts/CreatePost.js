import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addNewPost } from "./postsSlice";
import { Redirect } from "react-router-dom";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.posts.isLoading);
  const isError = useSelector((state) => state.posts.isError);
  const error = useSelector((state) => state.posts.error);

  let validateForm = () => {
    return title.length > 0 && content.length > 0;
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPost({ title: title, content: content }));
    setIsSubmitted(true);
  };
  let Pagecontent;
  if (isLoading && !isError) {
    Pagecontent = (
      <div
        className="alert alert-primary"
        role="alert"
        style={{ width: "60%" }}
      >
        Loading...
      </div>
    );
  } else if (!isLoading && isError) {
    Pagecontent = (
      <div className="alert alert-danger" role="alert" style={{ width: "60%" }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      {(isSubmitted && !isError && !isLoading) ? (
        <Redirect to="/" />
      ) : (
        <div className="col-md-8" style={{ margin: "0.5rem" }}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2>Create New Post</h2>
            </div>
            {Pagecontent}
            <div className="panel-body">
              <form className="form-signin" onSubmit={(e) => handleSubmit(e)}>
                <div className="input-group" style={{ width: "60%" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="title"
                    name="title"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTitle(e.target.value)}
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
                    type="text"
                    className="form-control"
                    placeholder="content"
                    name="content"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setContent(e.target.value)}
                  ></input>
                </div>

                <input
                  type="submit"
                  className="btn btn-default navbar-btn"
                  value="Add Post"
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
