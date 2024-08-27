import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for sign-in
const signin = createAsyncThunk("user/signin", async (credentials) => {
  console.log("🚀 ~ signin ~ credentials:", { credentials });
  try {
    const request = await axios.post(
      "http://localhost:3001/users/login",
      credentials
    );
    const response = request.data;
    console.log("🚀 ~ signin ~ response:", response);

    // Attempt to store in localStorage
    try {
      localStorage.setItem("user", JSON.stringify(response));
      console.log("User stored in localStorage");
    } catch (storageError) {
      console.error("Could not store user in localStorage:", storageError);
    }

    return response;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error;
  }
});

// Async thunk for sign-up
const signup = createAsyncThunk("user/signup", async (userData) => {
  console.log("🚀 ~ signup ~ userData:", { userData });
  try {
    const request = await axios.post(
      "http://localhost:3001/users/signup",
      userData
    );
    const response = request.data;
    console.log("🚀 ~ signup ~ response:", response);

    // Attempt to store in localStorage
    try {
      localStorage.setItem("user", JSON.stringify(response));
      console.log("User stored in localStorage");
    } catch (storageError) {
      console.error("Could not store user in localStorage:", storageError);
    }

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
});

// User slice for sign-in and sign-up
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.user = action.payload; // Update user state with signed-in user data
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.user = action.payload; // Update user state with signed-up user data
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export { signup, signin };
export default userSlice.reducer;
