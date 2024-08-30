import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signin = createAsyncThunk("user/signin", async (credentials) => {
  console.log("🚀 ~ signin ~ credentials:", { credentials });
  try {
    const request = await axios.post(
      "http://localhost:3001/users/login",
      credentials
    );
    const response = request.data;
    console.log("🚀 ~ signin ~ response:", response);

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

const signup = createAsyncThunk("user/signup", async (userData) => {
  console.log("🚀 ~ signup ~ userData:", { userData });
  try {
    const request = await axios.post(
      "http://localhost:3001/users/signup",
      userData
    );
    const response = request.data;
    console.log("🚀 ~ signup ~ response:", response);

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

const updateUser = createAsyncThunk("user/updateUser", async (userData) => {
  console.log("🚀 ~ updateUser ~ userData:", { userData });
  try {
    const request = await axios.put(
      "http://localhost:3001/users/ubdate_user",
      { firstName: userData.firstName },
      { lastName: userData.lastName },
      { password: userData.password }
    );
    const response = request.data;
    console.log("🚀 ~ updateUser ~ response:", response);

    try {
      localStorage.setItem("user", JSON.stringify(response));
      console.log("User updated in localStorage");
    } catch (storageError) {
      console.error("Could not update user in localStorage:", storageError);
    }

    return response;
  } catch (error) {
    console.error("Error during updating user data:", error);
    throw error;
  }
});

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
        state.user = action.payload;
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
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { signup, signin, updateUser };
export default userSlice.reducer;
