<script>
import { useProductStore } from '@/stores/productStore.js'
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'
import { useAuthStore } from '@/stores/authStore.js'

    export default {
    data() {
        const shoppingCartProducts = useShoppingCartStore();
        const products = useProductStore();
        const authStore = useAuthStore();

        return {
            shoppingCartProducts,
            products,
            authStore,
            formData: {
                name: '',
                address: '',
                facturatieAddress: '',
                country: '',
                phone: '',
                useFacturationAddress: false,
            },
        };
    },
    computed: {
      assetUrl() {
        return this.products.assetUrl;
      },
      isLoggedIn() {
        return useAuthStore().isLoggedIn;
      },
      user() {
        return this.isLoggedIn ? useAuthStore().getUserDetails() : null;
      },
    },
    methods: {
        confirmation() {
          this.$router.push('/confirmation');
        },
        toggleAddress() {
            this.useFacturationAddress = !this.useFacturationAddress;
            if (!this.formData.useFacturationAddress) this.formData.facturatieAddress = '';
        },
        resetFields() {
            this.formData.name = '';
            this.formData.address = '';
            this.formData.facturatieAddress = '';
            this.formData.country = '';
            this.formData.phone = '';
            this.formData.useFacturationAddress = false;
        },
        fillFormDataIfLoggedIn(user) {
          if (user) {
            this.formData.name = user.name;
            this.formData.address = user.address;
            this.formData.facturatieAddress = user.facturatieAddress;
            this.formData.country = user.country;
            this.formData.phone = user.phone;
          }
        },
      },
      watch: {
        user: 'fillFormDataIfLoggedIn',
      },
      created() {
        this.fillFormDataIfLoggedIn(this.user);
      },
    };
</script>

<template>
  <body>
    <div class="checkout__container">
      <div class="shopping__info">
          <div v-for="(product, index) in shoppingCartProducts.cartItems" :key="index" class="cart__item">
            <div class="item__details">
              <img :src="assetUrl + product.product.image" :alt="product.alt" class="item__image" />
              <div class="item__info">
                <div class="item__info__wrap">
                  <span class="quantity">{{ product.quantity + "x " }}</span>
                  <h3>{{ product.product.title }}</h3>
                </div>
                <p class="item__description">{{ product.product.short_description }}</p>
              </div>
            </div>
          </div>
        </div>

      <div class="checkout__form">
        <h2>Checkout</h2>
        <form @submit.prevent="confirmation">
          <div class="form__group">
            <label for="name">Name: *</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>

          <div class="form__group">
            <label for="address">Billing Address: *</label>
            <input type="text" id="address" v-model="formData.address" required>
          </div>

          <div class="form__group">
            <label for="facturatie__address">Facturation Address:</label>
            <input type="text" id="facturatie__address" v-model="formData.facturatieAddress" :disabled="!formData.useFacturationAddress">
          </div>

          <div class="checkbox__group">
            <label for="checkbox">Use different billing and facturation address:</label>
            <input type="checkbox" id="checkbox" v-model="formData.useFacturationAddress" @change="toggleAddress">
          </div>

          <div class="form__group">
            <label for="country">Country: *</label>
            <input type="text" id="country" v-model="formData.country" required>
          </div>

          <div class="form__group">
            <label for="phone">Phone Number:</label>
            <input type="tel" v-model="formData.phone" id="phone">
          </div>

          <div class="form__group">
            <button type="submit" class="checkout__button" @click="confirmation">Checkout</button>
          </div>
        </form>
      </div>  
    </div>
  </body>
</template>

<style lang="scss" scoped>
    @import '../scss/base.scss';
    body {
        min-height: 80vh;
    }

    .checkout__container {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;

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
            min-height: 300px; 
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .quantity {
            color: $color-primary;
            font-size: 22px;
            font-weight: 700;
            margin-right: 10px;
          }

          .item__info {
            .item__info__wrap {
              display: flex;
              flex-direction: row;
              align-items: center;
            }

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
    }
  }

    .shopping__info {
      margin-top: 200px;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
    }
    .checkout__form {
        margin-top: 200px;
        width: 25%;

        h2 {
            text-align: left;
            font-size: 30px;
            color: $color-black;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .checkbox__group {
                margin: -10px 0 15px 0;
                width: 100%;
                display: flex;
                flex-direction: row;

                label {
                    margin-right: 10px;
                }
            }

            .form__group {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;

            label {
                margin-bottom: 5px;
                color: $color-black;
                font-weight: bold;
            }

            input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                outline: none;

                &:focus {
                    border: 2px solid $color-primary;
                }
            }
            }

            button {
                margin-top: 20px;
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
        }
    }

    @media only screen and (max-width: 820px) {
      .checkout__container {
        margin-top: -150px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .checkout__form {
        margin-top: 50px;
        width: 50%;
      }
      .shopping__info {
        width: 75%;
      }
    }

    @media only screen and (max-width: 414px) {
      .checkout__container {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .checkout__form {
        margin-top: 50px;
        width: 80%;
      }
      .shopping__info {
        width: 80%;
        margin-top: 0px;
        order: 2;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .item__details {
        display: flex;
        flex-direction: column;
      }
    }
</style>