import { defineStore } from "pinia";
import  productsJSON  from "/src/productList.json"

export const useProductStore = defineStore('products', {
    //State
    state: () => ({
        productList: productsJSON,
    }),
    //Getters
    getters: { //This getter should be correct from state -> productId. Returns the products it finds according to the id
        //that is given by ProductCardComponent?
        getProductById: (state) => (productId) => {
          return state.productList.find((product) => product.id === productId) || null;
        },
      },
    // getters: {
    //     getProducts: (state) => state.productList
    // },
    //Actions
    // actions: {
    //     async fetchProducts() {
    //         try {
    //             const response = await import('@/productList.json');
    //             this.productList = response.default.productList
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         }
    //     },
    // },
})