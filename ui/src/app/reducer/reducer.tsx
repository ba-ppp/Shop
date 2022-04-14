import { combineReducers } from "@reduxjs/toolkit";
import { AdminReducers } from "app/slices/admin.slice";
import { ProductReducer } from 'app/slices/products.slice';
import { ToggleReducers } from "app/slices/toggle.slice";

export const rootReducer = combineReducers({
  admin: AdminReducers,
  toggle: ToggleReducers,
  product: ProductReducer
});

export type RootState = ReturnType<typeof rootReducer>;
