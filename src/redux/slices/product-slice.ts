import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState= {
  products: any[];
  selectedCategory: string;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setProducts, setSelectedCategory } = productSlice.actions;

export default productSlice.reducer;
