import { createSlice } from '@reduxjs/toolkit'

const initialState={
    quantity:0

};

const cartSlice =createSlice({

    name:"cart",
    initialState,
    reducers:{
        addProduct:(state,action)=>{
           state.quantity+=1
        },
    },
})

export const { addProduct } =cartSlice.actions;
export default cartSlice.reducer;