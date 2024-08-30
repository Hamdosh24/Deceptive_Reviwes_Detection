import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sendText = createAsyncThunk("data/sendText", async ({ input }) => {
  console.log("🚀 ~ sendText ~ input:", { input });

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("🚀 ~ user:", { user });

  try {
    console.log(input);
    const response = await axios.post(
      "http://localhost:3001/predict/Predict_Text",
      [{ text: input }],
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    console.log("🚀 ~ sendText ~ response:", response);
    return response.data;
  } catch (error) {
    console.error("Error during data submission:", error);
    throw error;
  }
});

const TextSlice = createSlice({
  name: "text",
  initialState: {
    loading: false,
    result: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendText.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendText.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendText.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      });
  },
});

export { sendText };
export default TextSlice.reducer;
