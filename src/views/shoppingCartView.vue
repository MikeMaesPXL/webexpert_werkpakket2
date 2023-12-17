<script>
import { useProductStore } from '@/stores/productStore.js'
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'

const decimal = 2

export default {
    data() {
        return {
            products: useProductStore(),
            shoppingCartProducts: useShoppingCartStore()
        };
    },
    methods: {
        checkout() {
          this.$router.push('/checkout');
        },
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
            0).toFixed(decimal);
        },
        calculateTotalWithoutVAT() {
        return this.shoppingCartProducts.cartItems.reduce(
            (total, product) => total + product.quantity * this.calculatePriceWithoutVAT(product.product),
            0).toFixed(decimal);
        },
        calculatePriceWithVAT(product) {
          return (product.price * (1 + product.vat_rate / 100)).toFixed(decimal);
        },
        calculatePriceWithoutVAT(product) {
          return product.price.toFixed(decimal);
        },
    },
    computed: {
      assetUrl() {
        return this.products.assetUrl;
      },
    }
}
</script>
<template>
  <body>
    <div class="shopping__cart">
        <div v-if="shoppingCartProducts.cartItems.length === 0">
            <p class="card__empty__text">Your shopping cart is empty.</p>
        </div>
        <div v-else>
            <div v-for="(product, index) in shoppingCartProducts.cartItems" :key="index" class="cart__item">
                <div class="item__details">
                    <img :src="assetUrl + product.product.image" :alt="product.alt" class="item__image" />
                    <div class="item__info">
                        <h3>{{ product.product.title }}</h3>
                        <p class="item__description">{{ product.product.short_description }}</p>
                    </div>
            </div>
            <div class="quantity__controls">
                <button @click="incrementQuantity(index)">+</button>
                <span class="quantity">{{ product.quantity }}</span>
                <button @click="decrementQuantity(index)">-</button>
                <button @click="removeProduct(index)">Remove</button>
            </div>
                <p class="item__price">{{ '€' + calculatePriceWithVAT(product.product) }} (VAT incl.)</p>
            </div>
            <div class="prices">
                <div class="price__with__vat">
                    <p>Total without VAT: <span>€{{ calculateTotalWithoutVAT() }}</span></p>
                    <p>Total with VAT: <span>€{{ calculateTotalWithVAT() }}</span></p>
                </div>
            </div>

            <button class="checkout__button" @click="checkout">Checkout</button>
        </div>
    </div>
  </body>  
</template>
<style lang="scss" scoped>
  @import '../scss/base.scss';

  .checkout__button {
    margin-top: 20px;
    align-self: flex-end;
    font-size: 16px;
    background-color: $color-primary;
    color: $color-light;
    border: none;
    padding: 10px 20px;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
      background-color: darken($color-primary, 10%);
    }
  }

  .card__empty__text {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
  }

  body {
    display: flex;
    justify-content: center;
  }
  .shopping__cart {
    @include basicSectionStyling();
    margin-top: 150px;
    padding: 20px;
    background-color: white;
    // display: flex;
    // justify-content: center;
    width: 80%;

    p {
      margin: 0;
    }

    .cart__item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid red;
      padding: 10px;

      .item__details {
        display: flex;
        align-items: center;
        flex: 1;

        .item__image {
          max-width: 300px;
          min-height: 300px; //??? This pains me on responsiveness
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .item__info {
          h3 {
            margin: 0;
            font-size: 26px;
          }
          .item__description {
            margin: 0;
            font-size: 18px;
            color: $color-secondary;
          }
        }
      }

      .quantity__controls {
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

        .remove__button {
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

      .item__price {
        font-size: 18px;
      }
    }

    .prices {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap; /* Allow prices to wrap to the next line */
      justify-content: space-between;
      align-items: flex-start; /* Adjust alignment to start */

      .price__with__vat {
        flex: 1;
        p {
          margin: 0;
          font-size: 20px;
          font-weight: 700;

          span {
            color: $color-primary;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .cart__item {
      flex-direction: column;
      align-items: flex-start;

      .item__details {
        margin-bottom: 10px;
      }

      .quantity__controls {
        margin-top: 10px;
      }
    }

    .prices {
      flex-direction: column;
      margin-top: 10px;
    }
  }
</style>