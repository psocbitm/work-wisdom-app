import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isError: null,
  isSuccess: null,
  message: "",
  user: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post("https://work-wisdom-backend.onrender.com/api/login", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const signUp = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://work-wisdom-backend.onrender.com/api/signup",
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get("https://work-wisdom-backend.onrender.com/api/getUser", {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = null;
        state.message = action.payload;
        state.token = null;
        state.user = null;
      });
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = null;
        state.message = action.payload;
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = null;
        state.message = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
