import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllUserHistories = createAsyncThunk(
  "admin/fetchAllUserHistories",
  async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.get(
        "http://localhost:3001/adminusageLog/admin_usagelogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ fetchAllUserHistories ~ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during fetching all user histories:", error);
      throw error;
    }
  }
);

const deleteUserHistoryAdmin = createAsyncThunk(
  "admin/deleteUserHistoryAdmin",
  async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      await axios.delete(
        `http://localhost:3001/adminusageLog/admin_usagelogs/66d05d68ff4ac5496edecad9/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteUserHistoryAdmin ~ deleted:", id);
      return id;
    } catch (error) {
      console.error("Error during deleting user history:", error);
      throw error;
    }
  }
);

const UserHistoryAdminSlice = createSlice({
  name: "user_history_admin",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserHistories.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(fetchAllUserHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUserHistories.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      })

      .addCase(deleteUserHistoryAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserHistoryAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUserHistoryAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchAllUserHistories, deleteUserHistoryAdmin };
export default UserHistoryAdminSlice.reducer;
