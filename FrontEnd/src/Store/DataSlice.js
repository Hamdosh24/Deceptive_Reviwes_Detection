import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sendData = createAsyncThunk("data/sendData", async (inputData) => {
  console.log("🚀 ~ sendData ~ inputData:", { inputData });

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("🚀 ~ user:", { user });

  try {
    const response = await axios.post(
      "http://localhost:3001/scrap/Fetch_URL",
      inputData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("🚀 ~ sendData ~ response:", response.data);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error during data submission:", error);
    throw error;
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    result: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendData.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendData.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendData.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      });
  },
});

export { sendData };
export default dataSlice.reducer;
