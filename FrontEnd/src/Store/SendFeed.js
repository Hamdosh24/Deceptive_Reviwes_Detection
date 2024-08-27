import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sendFeedback = createAsyncThunk(
  "feedback/sendFeedback",
  async (feedbackData) => {
    console.log("🚀 ~ sendFeedback ~ feedbackData:", { feedbackData });
    try {
      const response = await axios.post(
        "http://localhost:3001/feedback/send",
        feedbackData
      );
      console.log("🚀 ~ sendFeedback ~ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during sending feedback:", error);
      throw error;
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loading: false,
    result: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedback.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendFeedback.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendFeedback.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      });
  },
});

export { sendFeedback };
export default feedbackSlice.reducer;
