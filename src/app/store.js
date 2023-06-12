import { combineReducers, configureStore } from '@reduxjs/toolkit';
import brandReducer from '../services/brandService';
import authReducer from '../services/authService';
import landingReducer from '../services/landingService';
import categoryReducer from '../services/categoryService';

const rootReducer = combineReducers({
  brand: brandReducer,
  auth: authReducer,
  landing: landingReducer,
  category: categoryReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
