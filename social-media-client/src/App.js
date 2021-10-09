import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { Footer } from "./app/Footer";
import { About } from "./app/About";
import { Login } from "./features/auth/Login";
import { Logout } from "./features/auth/Logout";
import { Register } from "./features/auth/Register";
import { CreatePost } from "./features/posts/CreatePost";
import { EditPost } from "./features/posts/EditPost";

import { PostsList } from "./features/posts/PostsList";
import { checkAuth } from "./features/auth/authSlice";
import { fetchPosts } from "./features/posts/postsSlice";

function App() {
  const logInStatus = useSelector((state) => state.auth.logged_in);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (logInStatus) dispatch(fetchPosts());
  }, [logInStatus, dispatch]);
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            logInStatus ? (
              <PostsList> </PostsList>
            ) : (
              <div style={{ margin: "0.5rem" }}>
                <h2>Welcome!</h2>
                <div
                  className="card"
                  style={{ marginTop: "0.5rem", width: "60%" }}
                >
                  <p className="card-text" style={{ margin: "0.5rem" }}>
                    Please Login First
                  </p>
                </div>
              </div>
            )
          }
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/addPost" component={CreatePost} />
        <Route exact path="/editPost/:postId" component={EditPost} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
