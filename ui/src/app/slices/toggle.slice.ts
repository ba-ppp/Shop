import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ToggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isOpenSlideBar: false as boolean,
    hasMenuSelect: false as boolean,
    isLoading: false as boolean,
  },
  reducers: {
    toggleSlideBar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSlideBar = action.payload;
    },
    toggleMenuSelect: (state, action: PayloadAction<boolean>) => {
      state.hasMenuSelect = action.payload;
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleSlideBar, toggleMenuSelect, toggleLoading } =
  ToggleSlice.actions;

export const ToggleReducers = ToggleSlice.reducer;
