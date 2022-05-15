import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "models/utils.model";
import { addItemToLocalStorage } from "utils/utils";
import { uniqBy } from "lodash";

const CartSlice = createSlice({
  name: "admin",
  initialState: {
    items: [] as ProductItem[],
    amount: [] as number[],
    color: [] as string[],
  },
  reducers: {
    addCartItem: (state, action: PayloadAction<ProductItem>) => {
      const newItems = uniqBy([...state.items, action.payload], "id");
      state.items = newItems;
      state.amount = newItems.map(() => 1);
      addItemToLocalStorage(newItems);
    },
    setCartItem: (state, action: PayloadAction<ProductItem[]>) => {
      state.items = action.payload;
      state.amount = action.payload.map(() => 1);
    },
    addArrayCartItems: (state, action: PayloadAction<ProductItem[]>) => {
      const newItems = uniqBy([...state.items, ...action.payload], "id");
      state.items = newItems;
      state.amount = newItems.map(() => 1);
    },
    setAmountCartItem: (state, action: PayloadAction<number[]>) => {
      state.amount = action.payload;
    },
    setColorCartItem: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    clearCartItems: (state) => {
      state.items = [];
      state.amount = [];
      window.localStorage.clear();
    }
  },
});

export const {
  addCartItem,
  setColorCartItem,
  setCartItem,
  addArrayCartItems,
  setAmountCartItem,
  clearCartItems
} = CartSlice.actions;

export const CartReducers = CartSlice.reducer;
