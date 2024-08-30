import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sendUrl = createAsyncThunk("data/sendUrl", async ({ input }) => {
  console.log("🚀 ~ sendUrl ~ input:", { input });

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("🚀 ~ user:", { user });

  try {
    const response = await axios.post(
      "http://localhost:3001/scrapPredict/Predict_URL",
      { url: input },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("🚀 ~ sendUrl ~ response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during data submission:", error);
    throw error;
  }
});

const UrlSlice = createSlice({
  name: "url",
  initialState: {
    loading: false,
    result: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(sendUrl.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendUrl.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendUrl.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      });
  },
});

export { sendUrl };
export default UrlSlice.reducer;
