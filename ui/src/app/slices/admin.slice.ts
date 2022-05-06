import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false as boolean,
    isAdmin: false as boolean,
  },
  reducers: {
    toggleAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload; 
    },
  },
});

export const { toggleAdmin } = AdminSlice.actions;

export const AdminReducers = AdminSlice.reducer;
