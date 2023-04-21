import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import brandReducer from '../features/brand/brandSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  brand: brandReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
