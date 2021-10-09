import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../params/params";
import axios from "axios";

const initialState = {
  logged_in: false,
  user: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const logInUser = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await axios.post(
      SERVER_URL + "users/login",
      user,
      {withCredentials: true}
    );

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const registerUser = createAsyncThunk("auth/register", async (user) => {
  try {
    const response = await axios.post(
      SERVER_URL + "users/register",
      user,
      {withCredentials: true}
    );

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const logOutUser = createAsyncThunk("auth/logout", async (user) => {
  try {
    const response = await axios.get(SERVER_URL + "users/logout", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (user) => {
  try {
    const response = await axios.get(SERVER_URL + "users/check-auth", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [logInUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [logInUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.logged_in = true;
      state.user = action.payload;
    },
    [logInUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.logged_in = true;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [logOutUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [logOutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.logged_in = false;
      state.user = null;
    },
    [logOutUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [checkAuth.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      if(action.payload.username){
        state.logged_in = true;
      }else{
        state.logged_in = false;
      }
      state.user = action.payload;
    },
    [checkAuth.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
