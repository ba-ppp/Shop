import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ToggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isOpenSlideBar: true as boolean,
    hasMenuSelect: false as boolean
  },
  reducers: {
    toggleSlideBar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSlideBar = action.payload;
    },
    toggleMenuSelect: (state, action: PayloadAction<boolean>) => {
      state.hasMenuSelect = action.payload;
    }

  },
});

export const { toggleSlideBar, toggleMenuSelect } = ToggleSlice.actions;

export const ToggleReducers = ToggleSlice.reducer;
