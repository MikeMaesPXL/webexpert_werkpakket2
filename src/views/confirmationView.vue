<script>
import { useProductStore } from '@/stores/productStore.js'
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'

export default {
    data() {
        const shoppingCartProducts = useShoppingCartStore();
        const products = useProductStore();

        return {
            shoppingCartProducts,
            products,
        }
    },
    computed: {
        home() {
          this.$router.push('/');
        },
        assetUrl() {
            return this.products.assetUrl;
        },
    }
}

</script>
<template>
    <body>
        <div class="wrapper">
            <img class="confirm__pic" src="../assets/confirm.svg" alt="confirm">
            <h1>THANK YOU FOR YOUR PURCHASE!</h1>
            <button class="backToHome__button" @click="home">Confirm</button>
        </div>
        <h1 class="products__title">Products: </h1>
        <div class="confirm__container">
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
            margin-top: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .backToHome__button {
                margin: 20px 0 200px 0;
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

        .confirm__container {
            display: flex;
            justify-content: space-evenly;
            align-items: flex-start;

            .cart__item {

                .item__details {
                    display: flex;
                    align-items: center;
                    flex: 1;

                    .item__image {
                        max-width: 300px;
                        min-height: 300px; 
                        margin-right: 10px;
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
    .products__title {
        margin-bottom: -50px;
    }
    .confirm__pic {
        width: 50%;
        height: 50%;
        margin: -100px 0 100px 0;
    }
    .shopping__info {
      margin-top: 50px;
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
      .wrapper {
        h1 {
            text-align: center;
        }
      }
      .confirm__pic {
        width: 80%;
        height: 80%;
      }
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