import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  isError: null,
  isSuccess: null,
  message: "",
  isPostCreating: false,
  isPostCreatedError: null,
  isPostCreatedSuccess: null,
};

export const getAllposts = createAsyncThunk("posts/getAllposts", async () => {
  try {
    const response = await axios.get("https://work-wisdom-backend.onrender.com/api/getAllPosts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const createPost = createAsyncThunk(
  "auth/createPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://work-wisdom-backend.onrender.com/api/createPost",
        data,
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostCreatedStatus: (state) => {
      state.isPostCreatedSuccess = null;
      state.isPostCreatedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllposts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllposts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.isError = null;
        state.isSuccess = true;
      })
      .addCase(getAllposts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.isPostCreating = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isPostCreating = false;
        state.isPostCreatedSuccess = true;
        state.isPostCreatedError = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isPostCreating = false;
        state.isPostCreatedSuccess = null;
        state.isPostCreatedError = true;
        state.message = action.payload.message;
      });
  },
});

export const { clearPostCreatedStatus } = postSlice.actions;
export default postSlice.reducer;
