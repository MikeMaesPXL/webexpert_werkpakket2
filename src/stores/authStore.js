import { defineStore } from 'pinia';
import userList from '/src/userList.json'; 
import { useShoppingCartStore } from "@/stores/shoppingCartStore.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    currentUser: null,
    shoppingCartStore: useShoppingCartStore(),
  }),
  actions: {
    login(email, password) {
      return new Promise((resolve, reject) => {
        const user = userList.find((user) => user.email === email && user.password === password);

        if (user) {
          this.currentUser = user;
          this.isLoggedIn = true;

          // this.shoppingCartStore.updateCartItems(user.cartItems);

          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      });
    },
    logout() {
      this.currentUser = null;
      this.isLoggedIn = false;
    },
  },
});