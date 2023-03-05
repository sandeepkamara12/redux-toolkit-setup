import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/PostSlice";

export default configureStore({
    reducer: {
        app: postSlice
    }
})