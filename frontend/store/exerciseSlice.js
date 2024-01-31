import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: { currentIndex: 0 },
  reducers: {
    next: (state) => {
      if (state.currentIndex + 1 <= 6) {
        return { currentIndex: state.currentIndex + 1 };
      } else {
        return { currentIndex: 0 };
      }
    },
    back: (state) => {
      if (state.currentIndex - 1 >= 0) {
        return { currentIndex: state.currentIndex - 1 };
      } else {
        return { currentIndex: 6 };
      }
    },
    reset: () => 0,
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const { next, back, reset } = exerciseSlice.actions;

export default exerciseSlice.reducer;
