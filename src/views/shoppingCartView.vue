<script>
import { useProductStore } from '@/stores/productStore.js'
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'

export default {
    data() {
        return {
            products: useProductStore(),
            shoppingCartProducts: useShoppingCartStore(),
        };
    },
    components: {
        Header,
        Footer
    },
    methods: {
        incrementQuantity(index) {
            const product = this.shoppingCartProducts.cartItems[index];
            if (product) {
                this.shoppingCartProducts.addToCart({ product: product.product, quantity: 1 });
            }
        },
        decrementQuantity(index) {
            const product = this.shoppingCartProducts.cartItems[index];
            if (product && product.quantity > 1) {
                this.shoppingCartProducts.addToCart({ product: product.product, quantity: -1 });
            }
        },
        removeProduct(index) {
            this.shoppingCartProducts.removeFromCart(index);
        },
        calculateTotalWithVAT() {
            return this.shoppingCartProducts.cartItems.reduce(
                (total, product) => total + product.quantity * this.calculatePriceWithVAT(product.product),
                0).toFixed(2);
        },
        calculateTotalWithoutVAT() {
            return this.shoppingCartProducts.cartItems.reduce(
                (total, product) => total + product.quantity * this.calculatePriceWithoutVAT(product.product),
                0).toFixed(2);
        },
        calculatePriceWithVAT(product) {
            return (product.price * (1 + product.vat_rate / 100)).toFixed(2);
        },
        calculatePriceWithoutVAT(product) {
            return product.price.toFixed(2);
        },
    },
}
</script>
<template>
    <div class="shopping-cart">
        <div v-if="shoppingCartProducts.cartItems.length === 0">
            <p>Your shopping cart is empty.</p>
        </div>
        <div v-else>
            <div v-for="(product, index) in shoppingCartProducts.cartItems" :key="index" class="cart-item">
                <div class="item-details">
                    <img :src="'src/product.product.image'" alt="Product Image" class="item-image" />
                    <div class="item-info">
                        <h3>{{ product.product.title }}</h3>
                        <p class="item-description">{{ product.product.short_description }}</p>
                    </div>
            </div>
            <div class="quantity-controls">
                <button @click="incrementQuantity(index)">+</button>
                <span class="quantity">{{ product.quantity }}</span>
                <button @click="decrementQuantity(index)">-</button>
                <button @click="removeProduct(index)">Remove</button>
            </div>
                <p class="item-price">{{ calculatePriceWithVAT(product.product) }} (VAT incl.)</p>
            </div>
            <div class="prices">
                <div class="price-with-vat">
                    <p>Total without VAT: ${{ calculateTotalWithoutVAT() }}</p>
                    <p>Total with VAT: ${{ calculateTotalWithVAT() }}</p>
                </div>
                <!-- <div class="price-without-vat">
                    <p>Total without VAT: ${{ calculateTotalWithoutVAT() }}</p>
                </div> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
  @import '../scss/base.scss';

  .shopping-cart {
    @include basicSectionStyling();
    margin-top: 250px;
    padding: 20px;
    background-color: white;

    p {
      margin: 0;
    }

    .cart-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid red;
      padding: 10px;

      .item-details {
        display: flex;
        align-items: center;
        flex: 1;

        .item-image {
          width: 60px;
          height: 60px;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .item-info {
          h3 {
            margin: 0;
            font-size: 18px;
          }
          .item-description {
            margin: 0;
            font-size: 14px;
            color: $color-secondary;
          }
        }
      }

      .quantity-controls {
        display: flex;
        align-items: center;

        button {
          font-size: 14px;
          margin: 5px;
          cursor: pointer;
          background-color: $color-primary;
          color: $color-light;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;

          &:hover {
            background-color: darken($color-primary, 10%);
          }
        }

        .quantity {
          font-size: 16px;
          margin: 0 5px;
        }

        .remove-button {
          background-color: transparent;
          border: none;
          color: $color-primary;
          cursor: pointer;
          font-size: 14px;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .item-price {
        font-size: 18px;
      }
    }

    .prices {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap; /* Allow prices to wrap to the next line */
      justify-content: space-between;
      align-items: flex-start; /* Adjust alignment to start */

      .price-with-vat {
        flex: 1;
        p {
          margin: 0;
          font-size: 16px;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .cart-item {
      flex-direction: column;
      align-items: flex-start;

      .item-details {
        margin-bottom: 10px;
      }

      .quantity-controls {
        margin-top: 10px;
      }
    }

    .prices {
      flex-direction: column;
      margin-top: 10px;
    }
  }
</style>