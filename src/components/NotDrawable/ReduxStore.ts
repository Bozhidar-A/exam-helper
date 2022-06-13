import { configureStore } from '@reduxjs/toolkit';
import APIURL from './ReduxReducers/APIURL';

export const store = configureStore({
  reducer: {
    APIURL: APIURL,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;