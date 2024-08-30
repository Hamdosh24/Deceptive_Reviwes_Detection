import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllUserAccounts = createAsyncThunk(
  "admin/fetchAllUserAccounts",
  async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.get("http://localhost:3001/users/allusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ fetchAllUserAccounts ~ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during fetching all user accounts:", error);
      throw error;
    }
  }
);

const deleteUserAccount = createAsyncThunk(
  "admin/deleteUserAccount",
  async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      await axios.delete(
        `http://localhost:3001/users/66a62cca8f590d289af79861/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteUserAccount ~ deleted:", id);
      return id;
    } catch (error) {
      console.error("Error during deleting user account:", error);
      throw error;
    }
  }
);

const UserAccountsAdminSlice = createSlice({
  name: "user_accounts_admin",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserAccounts.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(fetchAllUserAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUserAccounts.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      })

      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchAllUserAccounts, deleteUserAccount };
export default UserAccountsAdminSlice.reducer;
