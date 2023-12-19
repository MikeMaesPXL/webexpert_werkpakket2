<script>
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'
    export default {
    data() {
        return {
            shoppingCartProducts: useShoppingCartStore(),
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
        computed: {
            totalWithoutVAT() {
                return useShoppingCartStore().totalWithoutVAT;
            },
            totalWithVAT() {
                return useShoppingCartStore().totalWithVAT;
            },
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
    }
    };
</script>

<template>
  <body>
    <h1>Checkout: </h1>

    <div class="checkout__form">
      <h2>Checkout</h2>
      <form>
        <div class="form__group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>

        <div class="form__group">
          <label for="address">Billing Address:</label>
          <input type="text" id="address" v-model="formData.address" required>
        </div>

        <div class="form__group">
          <label for="address">Facturation Address:</label>
          <input type="text" id="facturatie__address" v-model="formData.facturatieAddress" :disabled="!formData.useFacturationAddress">
        </div>

        <div class="checkbox__group">
          <label for="checkbox">Use different billing and facturation address:</label>
          <input type="checkbox" id="checkbox" v-model="formData.useFacturationAddress" @change="toggleAddress">
        </div>

        <div class="form__group">
          <label for="country">Country:</label>
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
  </body>
</template>

<style lang="scss" scoped>
    @import '../scss/base.scss';
    body {
        min-height: 80vh;
    }

    .checkout__form {
        margin-top: 200px;

        h2 {
            text-align: center;
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
                width: 20%;
                display: flex;
                flex-direction: row;

                label {
                    margin-right: 10px;
                }
            }

            .form__group {
                width: 20%;
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
</style>