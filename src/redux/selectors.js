import { createSelector } from "reselect";

const selectStoreState = (state) => state.store || { stores: [] };

export const selectStores = createSelector(
  [selectStoreState],
  (store) => store.stores || [] // <-- Fallback to empty array
);
