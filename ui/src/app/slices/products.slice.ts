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
    updateFirmSelected: (
      state,
      action: PayloadAction<{ idHang: string; idLoai: string }>
    ) => {
      state.idHangSelected = action.payload.idHang;
      state.idLoaiSelected = action.payload.idLoai;
    },
    setProductItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { updateFirmSelected, setProductItems } = ProductSlice.actions;

export const ProductReducer = ProductSlice.reducer;
