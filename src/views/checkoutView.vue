<script>
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'
    export default {
        data() {
            return {
                shoppingCartProducts: useShoppingCartStore(),
            };
        },
        methods: {
            confirmation() {
                this.$router.push('/confirmation');
            },
        },
        computed: {
            cartItems() {
                return this.shoppingCartProducts.getters.getCartItems;
            }
        }
    };
</script>
<template>
    <body>
        <h1>Checkout: </h1>
        <div v-for="(product, index) in cartItems" :key="index">
            <p>{{ product.product.title }} - Quantity: {{ product.quantity }}</p>
        </div>
        <button class="confirmation__button" @click="confirmation">Checkout</button>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    h1 {
        margin-top: 250px;
    }

    .confirmation__button {
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
</style>