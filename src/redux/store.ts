import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'

const store = configureStore({
    reducer: {
        cart:cartSlice.reducer
    },
})

export default store;

// Types utiles pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;