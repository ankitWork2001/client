// redux/slices/couponSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coupons: [],
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    addCoupon: (state, action) => {
      state.coupons.unshift(action.payload); // newest on top
    },
    updateCoupon: (state, action) => {
      const index = state.coupons.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.coupons[index] = action.payload;
    },
    deleteCoupon: (state, action) => {
      state.coupons = state.coupons.filter(c => c._id !== action.payload);
    },
    setCouponLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCouponError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  setCouponLoading,
  setCouponError,
} = couponSlice.actions;

export default couponSlice.reducer;
