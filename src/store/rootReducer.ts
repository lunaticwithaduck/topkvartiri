import { combineReducers } from '@reduxjs/toolkit';
import restApi from '@/api';
import uiSlice from './slices/uiSlice';

const rootReducer = combineReducers({
  [restApi.reducerPath]: restApi.reducer,
  ui: uiSlice,
});

export default rootReducer;
