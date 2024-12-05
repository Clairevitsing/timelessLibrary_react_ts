import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    // Array of product IDs (strings)
  cartBookIds: string[]; 
}

const initialState: CartState = {
  cartBookIds: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      // Action to add a product to the cart
      // specify payload type here
      addToCart: (state, action: PayloadAction<string>) => { 
      // Add new product ID to the beginning of the array
      state.cartBookIds = [action.payload, ...state.cartBookIds]; 
    },
      // Action to remove a product from the cart
      // specify payload type here
      removeFromCart: (state, action: PayloadAction<string>) => {
        // Find the index of the product to remove
      const indexOfId = state.cartBookIds.indexOf(action.payload); 
          if (indexOfId !== -1) {
          // Remove the product ID from the array
        state.cartBookIds.splice(indexOfId, 1); 
      }
    },
    // Action to clear all products in the cart
      clearAllItems: (state) => {
        // Empty the cart
      state.cartBookIds = []; 
    },
  },
});

// Export actions to be dispatched in components
export const { addToCart, removeFromCart, clearAllItems } = cartSlice.actions;

// Export the reducer to be used in the store configuration
export default cartSlice.reducer;
