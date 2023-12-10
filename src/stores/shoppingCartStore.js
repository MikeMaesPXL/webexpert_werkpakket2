import { defineStore } from "pinia";

export const useShoppingCartStore = defineStore('shoppingCart', {
    //State
    state: () => ({
      cartItems: [],
    }),

    //Getters
    getters: {
      getCartItems: () => this.cartItems,
    },

    //Actions
    actions: {
        addToCart: function (cartItem) {
            const existingItem = this.cartItems.find(item => item.product.id === cartItem.product.id);

            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            } else {
                this.cartItems.push(cartItem);
            }
        },
        removeFromCart(index) {
            if (index >= 0 && index < this.cartItems.length) {
              this.cartItems.splice(index, 1);
            }
        },
    },
});