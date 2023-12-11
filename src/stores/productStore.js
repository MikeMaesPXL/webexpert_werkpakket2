import { defineStore } from "pinia";
import  productsJSON  from "/src/productList.json"

export const useProductStore = defineStore('products', {
    //State
    state: () => ({
      productList: productsJSON,
    }),
    //Getters
    getters: {
      getProductById: (state) => (productId) => {
        return state.productList.find((product) => product.id == productId) || null;
      },
      highestQuantityProducts() {
        const sortedProducts = [...this.productList].sort((a, b) => b.stock_quantity - a.stock_quantity);
        return sortedProducts.slice(0, 3);
      },
    },
    //Actions
    actions: {
      updateStockQuantity: function (productId, quantity) {
        const product = this.getProductById(productId);
  
        if (product) {
          product.stock_quantity += quantity;
        }
      },
    },
});