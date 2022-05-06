import { combineReducers } from "@reduxjs/toolkit";
import { AdminReducers } from "app/slices/admin.slice";
import { CartReducers } from "app/slices/carts.slice";
import { ProductReducer } from "app/slices/products.slice";
import { ToggleReducers } from "app/slices/toggle.slice";

export const rootReducer = combineReducers({
  admin: AdminReducers,
  cart: CartReducers,
  product: ProductReducer,
  toggle: ToggleReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
