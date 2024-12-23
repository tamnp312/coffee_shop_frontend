import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  items: JSON.parse(Cookies.get("cart-item-list") || "[]").map((item) => ({
    ...item,
    isSelected: item.isSelected || false,
  })),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = { ...action.payload, isSelected: false };

      const productItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (productItemIndex >= 0) {
        state.items[productItemIndex].quantity = newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      Cookies.set("cart-item-list", JSON.stringify(state.items), {
        expires: 7,
      });
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      Cookies.set("cart-item-list", JSON.stringify(state.items), {
        expires: 7,
      });
    },
    clearCart: (state) => {
      state.items = [];
      Cookies.remove("cart-item-list");
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      Cookies.set("cart-item-list", JSON.stringify(action.payload), {
        expires: 7,
      });
    },
    toggleSelected: (state, action) => {
      const { itemId, isSelected } = action.payload;
    
      if (itemId) {
        const itemIndex = state.items.findIndex((item) => item.id === itemId);
        if (itemIndex >= 0) {
          state.items[itemIndex].isSelected = !state.items[itemIndex].isSelected;
          Cookies.set("cart-item-list", JSON.stringify(state.items), {
            expires: 7,
          });
        }
      } else if (isSelected !== undefined) {
       
        state.items.forEach((item) => {
          item.isSelected = isSelected; 
        });
        Cookies.set("cart-item-list", JSON.stringify(state.items), {
          expires: 7,
        });
      }
    }
    
  },
});

export const { addToCart, clearCart, setCartItems, toggleSelected , removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
