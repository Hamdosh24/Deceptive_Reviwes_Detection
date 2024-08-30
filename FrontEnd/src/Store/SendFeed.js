import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchFeedbacks = createAsyncThunk("feedback/fetchFeedbacks", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const response = await axios.get(
      "http://localhost:3001/feedback/get_feedbacks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("🚀 ~ fetchFeedbacks ~ response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during fetching feedbacks:", error);
    throw error;
  }
});

const sendFeedback = createAsyncThunk(
  "feedback/sendFeedback",
  async ({ feedbackData }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      if (!token) {
        throw new Error("User token is missing");
      }

      const response = await axios.post(
        "http://localhost:3001/feedback/send_feedback",
        { message: feedbackData.text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    feedbacks: [],
    result: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.feedbacks = [];
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
        state.error = null;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.feedbacks = [];
        state.error = action.error.message;
      })

      .addCase(sendFeedback.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendFeedback.fulfilled, (state, action) => {
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

export { sendFeedback, fetchFeedbacks };
export default feedbackSlice.reducer;
