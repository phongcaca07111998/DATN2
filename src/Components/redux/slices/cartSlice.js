import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  count:1
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex  = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (existingItemIndex === -1) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrls: newItem.image,
          price: newItem.price,
          quantity: newItem.count,
          totalPrice: newItem.price,
          usersell:newItem.username,
          orderStatus:"Vừa đặt"

        });
      } else {
        const existingItem = state.cartItems[existingItemIndex];
      existingItem.quantity += newItem.count;
      existingItem.totalPrice += Number(newItem.price) * Number(newItem.count);
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.count = 1;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
