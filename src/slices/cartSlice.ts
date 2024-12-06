// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  cartBookIds: number[];
};

const initialState: CartState = {
  cartBookIds: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      state.cartBookIds = [action.payload, ...state.cartBookIds];
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const indexOfId = state.cartBookIds.indexOf(action.payload);
      if (indexOfId !== -1) {
        state.cartBookIds.splice(indexOfId, 1);
      }
    },
    clearAllItems: (state) => {
      state.cartBookIds = [];
    },
  },
});

export const { addToCart, removeFromCart, clearAllItems } = cartSlice.actions;
export default cartSlice.reducer;

