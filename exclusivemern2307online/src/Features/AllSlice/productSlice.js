import { createSlice } from "@reduxjs/toolkit";
import { ToastSucess, ToastError, infoToast } from "../../helpers/Toast";
import { act } from "react";

const initialState = {
  cart: [],
  totalPrice: 0,
  totalItem: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const indexNumber = state.cart.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (indexNumber >= 0) {
        state.cart[indexNumber].quantity += 1;
        infoToast(`${action.payload.name} again add to cart`);
        localStorage.setItem("cartitem", JSON.stringify(state.cart));
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        ToastSucess(`${action.payload.name} is add to cart`);
        localStorage.setItem("cartitem", JSON.stringify(state.cart));
      }
    },
    removeCart: (state, action) => {
      const containCartItem = state.cart.filter((item) => {
        return item._id !== action.payload._id;
      });
      state.cart = containCartItem;
      localStorage.setItem("cartitem", JSON.stringify(state.cart));
      ToastError(`${action.payload.name} is Removed`);
    },
    incrementCartItem: (state, action) => {
      const findItem = state.cart.findIndex((item) => {
        return item._id == action.payload._id;
      });
      state.cart[findItem].quantity += 1;
      localStorage.setItem("cartitem", JSON.stringify(state.cart));
      infoToast(`Again Added ${action.payload.name}`);
    },
    decrementCartItem: (state, action) => {
      const findindex = state.cart.findIndex((item) => {
        return item._id == action.payload._id;
      });
      if (state.cart[findindex].quantity > 1) {
        state.cart[findindex].quantity -= 1;
        localStorage.setItem("cartitem", JSON.stringify(state.cart));
        infoToast(`Item ${action.payload.name}`);
      }
    },
    getTotal: (state, action) => {
      const reducecartItem = state.cart.reduce(
        (initalItem, item) => {
          const { price, quantity } = item;
          let totalPrice = price * quantity;
          initalItem.allprice += totalPrice;
          initalItem.allquantity += quantity;
          return initalItem;
        },
        { allprice: 0, allquantity: 0 }
      );

      state.totalPrice = reducecartItem.allprice;
      state.totalItem = reducecartItem.allquantity;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addtoCart,
  removeCart,
  incrementCartItem,
  decrementCartItem,
  getTotal,
} = productSlice.actions;

export default productSlice.reducer;
