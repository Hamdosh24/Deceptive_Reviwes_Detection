// store.js
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import dataReducer from "./DataSlice";
import userHistoryReducer from "./UserHistory";
import feedbackReducer from "./SendFeed";

const store = configureStore({
  reducer: {
    user: UserReducer,
    data: dataReducer,
    user_history: userHistoryReducer,
    feedback: feedbackReducer,
  },
});

export default store;
