import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UserHistory = createAsyncThunk("data/fetchData", async (params) => {
  console.log("🚀 ~ fetchData ~ params:", { params });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const response = await axios.get(
      "http://localhost:3001/usageLog/get_usagelogs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("🚀 ~ fetchData ~ response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during fetching data:", error);
    throw error;
  }
});

const UserHistorySlice = createSlice({
  name: "user_history",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserHistory.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(UserHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(UserHistory.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      });
  },
});

export { UserHistory };
export default UserHistorySlice.reducer;
