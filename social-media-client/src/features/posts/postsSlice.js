import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../params/params";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(SERVER_URL + "posts/", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(SERVER_URL + "posts/", initialPost, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/EditPost",
  async (initialPost) => {
    try {
      const response = await axios.patch(
        SERVER_URL + "posts/" + initialPost.id,
        {
          createdAt: initialPost.createdAt,
          title: initialPost.title,
          content: initialPost.content,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    try {
      const response = await axios.delete(
        SERVER_URL + "posts/" + initialPost.id,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [addNewPost.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.posts.push(action.payload);
    },
    [addNewPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [editPost.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.posts.find((post) => {
        if (post._id === action.payload._id) {
          post.content = action.payload.content;
          post.title = action.payload.title;
          post.createdAt = action.payload.createdAt;
          return true;
        }
        return false;
      });
    },
    [editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [deletePost.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
  },
});

//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);
