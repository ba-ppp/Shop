import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ToggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isOpenSlideBar: true as boolean,
  },
  reducers: {
    toggleSlideBar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSlideBar = action.payload;
    },
  },
});

export const { toggleSlideBar } = ToggleSlice.actions;

export const ToggleReducers = ToggleSlice.reducer;
