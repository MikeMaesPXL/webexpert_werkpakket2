<script>
import { useProductStore } from '@/stores/productStore.js'
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'
// import JSConfetti from 'js-confetti';

export default {
    data() {
        const shoppingCartProducts = useShoppingCartStore();
        const products = useProductStore();

        return {
            shoppingCartProducts,
            products,
            // jsConfetti: new JSConfetti(),
        }
    },
    computed: {
        // addConfetti() {
        //     this.jsConfetti.addConfetti();
        // },
        home() {
          this.$router.push('/');
        },
    }
}

</script>
<template>
    <body>
        <div class="wrapper">
            <h1>THANK YOU FOR YOUR PURCHASE!</h1>
            <!-- <p>{{ addConfetti }}</p> -->
            <button class="backToHome__button" @click="home">Confirm</button>
        </div>
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
        </div>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    body {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;

            // h1 {
            //     margin-top: 250px;
            // }

            .backToHome__button {
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