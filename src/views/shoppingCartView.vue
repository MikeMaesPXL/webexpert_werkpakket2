<script>
import { useProductStore } from '@/stores/productStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'

export default {
    data() {
        return {
            products: useProductStore()
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>
<template>
    <div class="shopping-cart">
    <div v-for="(product, index) in cartProducts" :key="index" class="cart-item">
      <div class="item-details">
        <img :src="product.image" alt="Product Image" class="item-image" />
        <div class="item-info">
          <h3>{{ product.title }}</h3>
          <p class="item-description">{{ product.description }}</p>
        </div>
      </div>
      <div class="quantity-controls">
        <button @click="decrementQuantity(index)">-</button>
        <span class="quantity">{{ product.quantity }}</span>
        <button @click="incrementQuantity(index)">+</button>
        <button @click="removeProduct(index)">Remove</button>
      </div>
    </div>
    <div class="prices">
      <div class="price-with-vat">
        <p>Total with VAT: ${{ calculateTotalWithVAT() }}</p>
      </div>
      <div class="price-without-vat">
        <p>Total without VAT: ${{ calculateTotalWithoutVAT() }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
    h1 {
        margin-top: 250px;
    }
</style>