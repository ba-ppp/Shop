import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "models/utils.model";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    idHangSelected: "apple" as string,
    idLoaiSelected: "phones" as string,
    items: [] as Product[],
  },
  reducers: {
    setIdHangSelected: (state, action: PayloadAction<string>) => {
      state.idHangSelected = action.payload;
      state.idLoaiSelected = "phones";
    },
    setIdLoaiSelected: (state, action: PayloadAction<string>) => {
      state.idLoaiSelected = action.payload;
    },
    setProductItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setIdHangSelected, setIdLoaiSelected, setProductItems } =
  ProductSlice.actions;

export const ProductReducer = ProductSlice.reducer;
