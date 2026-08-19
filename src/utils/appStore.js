import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsReducer from "./connectionsSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedSlice,
        connections: connectionsReducer
    },
})

export default appStore;