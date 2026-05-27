import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  mobileNavOpen: boolean;
};

const initialState: UIState = {
  mobileNavOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
  },
});

export const { setMobileNavOpen, toggleMobileNav } = uiSlice.actions;
export default uiSlice.reducer;
