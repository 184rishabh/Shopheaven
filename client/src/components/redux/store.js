import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartredux"


export default configureStore({
    reducer:{
        cart:cartReducer,
    },
});