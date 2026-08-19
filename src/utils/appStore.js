import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedSlice,
        connections: connectionsReducer,
        requests: requestsReducer,
    },
})

export default appStore;