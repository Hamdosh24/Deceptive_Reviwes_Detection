import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// جلب جميع التعليقات
const fetchFeedbacks = createAsyncThunk(
  "feedAdmin/fetchFeedbacks",
  async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("🚀 ~ user:", { user });
    try {
      const response = await axios.get(
        "http://localhost:3001/feedback/get_feedbacks",
        {
          headers: {
            Authorization: `Barear ${user.token}`,
          },
        }
      );
      console.log("🚀 ~ fetchFeedbacks ~ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during fetching feedbacks:", error);
      throw error;
    }
  }
);

// حذف تعليق معين
const deleteFeedback = createAsyncThunk(
  "feedAdmin/deleteFeedback",
  async (feedbackId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("🚀 ~ user:", { user });
    try {
      await axios.delete(
        `http://localhost:3001/feedback/delete_feedback/${feedbackId}`,
        {
          headers: {
            Authorization: `Barear ${user.token}`,
          },
        }
      );
      console.log("🚀 ~ deleteFeedback ~ deleted:", feedbackId);
      return feedbackId;
    } catch (error) {
      console.error("Error during deleting feedback:", error);
      throw error;
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedAdmin",
  initialState: {
    loading: false,
    feedbacks: [],
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

      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchFeedbacks, deleteFeedback };
export default feedbackSlice.reducer;
