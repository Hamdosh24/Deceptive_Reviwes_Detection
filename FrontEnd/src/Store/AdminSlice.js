import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Function to check if the input is a URL
const isUrl = (input) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?(www\\.)?([a-z0-9]+[.])+[a-z]{2,3}(\\/\\S*)?$",
    "i"
  );
  return pattern.test(input);
};

// Async thunk to handle sending text or URL by admin
const sendAdminTextOrUrl = createAsyncThunk(
  "admin/sendTextOrUrl",
  async ({ input }) => {
    console.log("🚀 ~ sendAdminTextOrUrl ~ input:", { input });

    // Adjust the URL to be specific for admin
    const url = isUrl(input)
      ? "http://localhost:3001/admin/scrapPredict"
      : "http://localhost:3001/admin/predict";

    try {
      const response = await axios.post(url, {
        input,
      });
      console.log("🚀 ~ sendAdminTextOrUrl ~ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during admin data submission:", error);
      throw error;
    }
  }
);

// Async thunk to handle sending data by admin
const sendAdminData = createAsyncThunk("admin/sendData", async (inputData) => {
  console.log("🚀 ~ sendAdminData ~ inputData:", { inputData });

  // Adjust the URL to be specific for admin
  try {
    const response = await axios.post(
      "http://localhost:3001/admin/scrap",
      inputData
    );
    console.log("🚀 ~ sendAdminData ~ response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during admin data submission:", error);
    throw error;
  }
});

// Admin data slice
const adminDataSlice = createSlice({
  name: "adminData",
  initialState: {
    loading: false,
    result: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAdminTextOrUrl.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendAdminTextOrUrl.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendAdminTextOrUrl.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      })
      .addCase(sendAdminData.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendAdminData.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendAdminData.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      });
  },
});

export { sendAdminTextOrUrl, sendAdminData };
export default adminDataSlice.reducer;
