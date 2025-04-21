import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Assuming your authSlice is in the correct path
import infoReducer from './infoSlice'; // Assuming your infoSlice is in the correct path

export const store = configureStore({
  reducer: {
    auth: authReducer, // It's better to use 'auth' for consistency, but 'info' is also fine.
    info: infoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// This will represent the entire state of the store, including auth and info
export type AppDispatch = typeof store.dispatch;
// Inferred type will be the type of the dispatch function, useful for typed dispatch in components
