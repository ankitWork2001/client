import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    storeId:'',
    storeName:'',
}

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setStoreId: (state, action) => {
            state.storeId = action.payload;
        },
        setStoreName: (state, action) => {
            state.storeName = action.payload;
        },
    },
})

export const { setStoreId, setStoreName } = storeSlice.actions
export default storeSlice.reducer