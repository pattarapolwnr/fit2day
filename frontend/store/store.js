import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './exerciseSlice';
import { createWrapper } from 'next-redux-wrapper';
import exerciseSlice from './exerciseSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [exerciseSlice.name]: exerciseReducer,
    },
    devTools: true,
  });

// export an assembled wrapper
export const wrapper = createWrapper(makeStore);
