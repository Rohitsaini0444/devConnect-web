import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
        setConnections: (state, action) => {
            return action.payload;
        },
        addConnection: (state, action) => {
            state.push(action.payload);
        },
        removeConnection: (state, action) => {
            return state.filter(connection => connection._id !== action.payload);
        }
    }
});

export const { setConnections, addConnection, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
