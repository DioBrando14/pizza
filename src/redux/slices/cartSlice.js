import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //добавляем в массив пиццы
    addItems(state, action) {
      state.items.push(action.payload);
    },
    //если переданный id не опдходит с базой, удаляем
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItems, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
