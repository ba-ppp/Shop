import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "models/utils.model";
import { addItemToLocalStorage } from "utils/utils";
import { uniqBy } from "lodash";

const CartSlice = createSlice({
  name: "admin",
  initialState: {
    items: [] as ProductItem[],
  },
  reducers: {
    addCartItem: (state, action: PayloadAction<ProductItem>) => {
      const newItems = uniqBy([...state.items, action.payload], "id");
      state.items = newItems;
      addItemToLocalStorage(newItems);
    },
    setCartItem: (state, action: PayloadAction<ProductItem[]>) => {
      state.items = action.payload;
    },
    addArrayCartItems: (state, action: PayloadAction<ProductItem[]>) => {
      const newItems = uniqBy([...state.items, ...action.payload], "id");
      state.items = newItems;
    },
  },
});

export const { addCartItem, setCartItem, addArrayCartItems } =
  CartSlice.actions;

export const CartReducers = CartSlice.reducer;
