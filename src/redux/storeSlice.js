import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    stores: null,
  },
  reducers: {
    setStores: (state, action) => {
      console.log("✅ Inside setStores reducer!");
      console.log("🚀 Payload received:", action.payload);
      state.stores = action.payload;
      console.log("✅ Updated stores:", state.stores);
    },
    deleteStore: (state, action) => {
      state.stores = state.stores.filter(
        (store) => store._id !== action.payload
      );
    },
  },
});

export const { setStores, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;
