import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts, deletePost } from "./postsSlice";

import { TimeAgo } from "./timeAgo";

const PostExcerpt = ({ post }) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  let handleDelete = (e) => {
    e.preventDefault();
    dispatch(
      deletePost({
        id: post._id
      })
    );

  };

  return (
    <article className="card" style={{ margin: "0.5rem", width: "60%" }}>
      <div className="card-body" key={post._id}>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content.substring(0, 100)}</p>
        <footer className="blockquote-footer">
          Written by{" "}
          <cite title="Source Title" style={{ color: "red" }}>
            {post.username}
          </cite>
        </footer>
      </div>
      <div className="card-footer text-muted">
        <TimeAgo timestamp={post.createdAt}></TimeAgo>
        {user.username === post.username ? (
          <div>
            <div className="btn btn-default navbar-btn">
              <Link to={`/editPost/${post._id}`} className="nav-link">
                Edit
              </Link>
            </div>
            <button className="btn btn-default navbar-btn" onClick={(e) => handleDelete(e)}>
              Delete
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </article>
  );
};

export const PostsList = () => {
 
  const posts = useSelector(selectAllPosts);

  const isLoading = useSelector((state) => state.posts.isLoading);
  const isError = useSelector((state) => state.posts.isError);
  const error = useSelector((state) => state.posts.error);

  

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
    const orderedPosts = posts;

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post._id} post={post} />
    ));
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
    <div style={{ margin: "0.5rem" }}>
      <h2>Posts</h2>
      <div className="btn btn-default navbar-btn">
        <Link to="/addPost" className="nav-link">
          Add Post
        </Link>
      </div>
      <div>{content}</div>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};
