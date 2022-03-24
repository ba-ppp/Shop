import { combineReducers } from "@reduxjs/toolkit";
import { AdminReducers } from "app/slices/admin.slice";
import { ToggleReducers } from "app/slices/toggle.slice";

export const rootReducer = combineReducers({
  admin: AdminReducers,
  toggle: ToggleReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
