import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login(email, password) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.isLoggedIn = true;
            resolve();
          }, 1000);
        });
      },
    logout() {
      this.isLoggedIn = false;
    },
  },
});