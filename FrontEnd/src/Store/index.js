import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import dataReducer from "./DataSlice";
import TextReducer from "./DataSliceText";
import UrlReducer from "./DataSliceUrl";
import userHistoryReducer from "./UserHistory";
import feedAdminReducer from "./FeedAdmin";
import userHistoryAdminReducer from "./UserHistoryAdmin";
import useraccountsAdminReducer from "./AccountAdmin";
import feedbacReducer from "./SendFeed";

const store = configureStore({
  reducer: {
    user: UserReducer,
    data: dataReducer,
    text: TextReducer,
    url: UrlReducer,
    user_history: userHistoryReducer,
    feedback: feedbacReducer,
    feedAdmin: feedAdminReducer,
    user_history_admin: userHistoryAdminReducer,
    user_accounts_admin: useraccountsAdminReducer,
  },
});

export default store;
