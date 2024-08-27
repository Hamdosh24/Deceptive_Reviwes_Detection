import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const isUrl = (input) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?(www\\.)?([a-z0-9]+[.])+[a-z]{2,3}(\\/\\S*)?$",
    "i"
  );
  return pattern.test(input);
};

const sendTextOrUrl = createAsyncThunk(
  "data/sendTextOrUrl",
  async ({ input }) => {
    console.log("🚀 ~ sendTextOrUrl ~ input:", { input });

    const url = isUrl(input)
      ? "http://localhost:3001/scrapPredict"
      : "http://localhost:3001/predict";

    try {
      const response = await axios.post(url, {
        input,
      });
      console.log("🚀 ~ sendTextOrUrl ~ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during data submission:", error);
      throw error;
    }
  }
);

const sendData = createAsyncThunk("data/sendData", async (inputData) => {
  console.log("🚀 ~ sendData ~ inputData:", { inputData });
  try {
    const response = await axios.post("http://localhost:3001/scrap", inputData);
    console.log("🚀 ~ sendData ~ response:", response.data);
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
      .addCase(sendTextOrUrl.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(sendTextOrUrl.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(sendTextOrUrl.rejected, (state, action) => {
        state.loading = false;
        state.result = null;
        state.error = action.error.message;
      })
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

export { sendTextOrUrl, sendData };
export default dataSlice.reducer;
