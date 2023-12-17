<script>
import { useProductStore } from '@/stores/productStore.js'

// Components
import PopularProducts from '@/components/PopularProductsComponent.vue'
import ProductCard from '@/components/ProductCardComponent.vue'

export default {
    data() {
        return {
            products: useProductStore()
        }
    },
    components: {
        PopularProducts,
        ProductCard
    }
}
</script>
<template>
    <body>
        <section class="main__home">
            <div class="main__text">
                <h1>G2 Esports <br> Worlds Jersey 2023</h1>
                <p>Support our champs in style!</p>
                <router-link to="/shop"><a href="products.html" class="main__btn">Shop Now<i class='bx bx-right-arrow-alt'></i></a></router-link>
            </div>
        </section>

        <section class="main__products">
            <div class="title">
                <h3>G2 ESPORTS</h3>
                <h1>Popular items</h1>
                <p>Be a mad gamer on and offline</p>
            </div>
                <PopularProducts/>
            </section>

    </body>
</template>

<style lang="scss" scoped>
    @import '../scss/base.scss';

    .main__home {
        @include basicSectionStyling();
        background: linear-gradient(rgba($color-black, .6), rgba($color-black, .6)), url(@/assets/g2banner.jpg);
        background-position: center;
        background-size: cover;
        display: flex;
        justify-content: start;
        align-items: center;

        .main__text {
            h1 {
                @include textColorAndSize($color-light, 65px);
                text-transform: capitalize;
                line-height: 1.1;
                font-weight: 600;
                margin: 6px 0 10px;
            }
            p {
                @include textColorAndSize($color-light, 20px);
                font-style: italic;
                margin-bottom: 20px;
            }
        }
    }

    .main__products {
        padding-top: 3.5%;
        background-color: rgb(255, 255, 255);

        .title {
            margin: 4% auto 0;
            text-align: center;
            h3 {
                @include textColorAndSize($color-black, 24px);
            }
            h1 {
                @include textColorAndSize($color-primary, 48px);
                text-transform: uppercase;
                font-family: $font-anton;
                letter-spacing: 2px
            }
            p {
                @include textColorAndSize($color-black, 18px);
                opacity: 0.7;
            }
        }
    }

    .main__btn {
        display: inline-block;
        background-color: $color-light;
        color: $color-black;
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        border: 2px solid $color-black;
        padding: 12px 25px;
        transition: all .4s ease;

        &:hover {
            background-color: $color-primary;
            color: $color-light;
            cursor: pointer;
        }

        i {
            vertical-align: middle;
        }
}
</style>