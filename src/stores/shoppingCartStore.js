import { defineStore } from "pinia";
import { useProductStore } from "@/stores/productStore.js";

export const useShoppingCartStore = defineStore('shoppingCart', {
    //State
    state: () => ({
      cartItems: [],
      productStore: useProductStore(),
      showPopUp: false
    }),

    //Getters
    getters: {
      getCartItems: () => this.cartItems,
    },

    //Actions
    actions: {
        addToCart: function (cartItem) {
            this.productStore.updateStockQuantity(cartItem.product.id, -cartItem.quantity);
            const existingItem = this.cartItems.find(item => item.product.id === cartItem.product.id);

            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            } else {
                this.cartItems.push(cartItem);
            }
        },
        
        removeFromCart(index) {
            if (index >= 0 && index < this.cartItems.length) {
              const item = this.cartItems[index];
              this.productStore.updateStockQuantity(item.product.id, item.quantity);
              this.cartItems.splice(index, 1);
            }
        },
        
        clearCart() {
          this.cartItems = [];
        },

        // updateCartItems(newCartItems) {
        //   this.cartItems = newCartItems;
        // }
    },
});