<script>
    import { useProductStore } from '@/stores/productStore.js'

    export default {
        data() {
            return {
                quantity: 1,
            }
        },
        computed: {
            product() {
                const productStore = useProductStore();
                const productId = this.$route.params.id;
                return productStore.getProductById(productId)
            },
        },
    }
</script>
<template>
    <section class="product__details">
        <div class="single__product__image">
            <img v-if="product" :src="'src/assets/' + product.image" :alt="product.title" id="main__image" width="100%">
        </div>

        <div v-if="product" class="single__product__details">
            <h6>Home / G2 Shop</h6>
            <h4>{{ product.title }}</h4>
            <h2>{{ product.price }}</h2>
            <select id="sizes__select">
                <option>Select Size</option>
                <option v-for="size in product.sizes" :key="size">{{ size }}</option>
            </select>
            <input id="quantity__input" type="number" v-model="quantity" min="1">
            <button class="main__btn">Add To Cart</button>
            <h4>Product details</h4>
            <span>{{ product.short_description }}</span>
        </div>

        <div v-else>
            <h1>Product not found.</h1>
        </div>
    </section>
</template>
<style lang="scss" scoped>
     @import '../scss/base.scss';

    .product__details {
        @include basicSectionStyling();
        display: flex;
        margin-top: 20px;

        .single__product__image {
            // width: 40%;
            height: 900px;
            margin-right: 50px;
            padding: 50px;
            img {
                height: 100%;
            }
        }
        .single__product__details {
            width: 50%;
            padding-top: 140px;

            h6{
                padding: 20px 0 0 0;
                @include textColorAndSize($color-primary, 14px)
            }
            h4 {
                padding: 40px 0 20px 0;
                @include textColorAndSize($color-black, 24px)
            }
            h2 {
                padding: 40px 0 20px 0;
                @include textColorAndSize($color-black, 34px)
            }
            select {
                display: block;
                padding: 5px 10px;
                margin-bottom: 10px;
                background-color: $color-light;
                border: 2px solid $color-black;
            }
            input {
                width: 50px;
                height: 50px;
                padding-left: 10px;
                font-size: 16px;
                margin-right: 10px;
                border: 2px solid $color-black;
            }
            span {
                @include textColorAndSize($color-black, 24px);
                line-height: 25px;
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
        }
    }



    // --- MEDIA QUERIES ---
    @media screen and (max-width: 1180px) {
        .product__details {
            .single__product__image {
                height: 700px;
            }
            .single__product__details {
                padding-top: 110px;
        
                h6{
                    @include textColorAndSize($color-primary, 14px)
                }
                h4 {
                    @include textColorAndSize($color-black, 18px)
                }
                h2 {
                    @include textColorAndSize($color-black, 24px)
                }
                span {
                    @include textColorAndSize($color-black, 16px);
                    line-height: 14px;
                }
            }
        }
    }

    @media screen and (max-width: 820px) {
        .product__details {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        
            .single__product__image {
                height: 600px;
            }
            .single__product__details {
                padding: 0;
            }
        }
    }

    @media screen and (max-width: 414px) {
        .product__details {
            .single__product__image {
                margin: 0;
                width: 100%;
                height: 600px;
            }
            .single__product__details {
                padding: 0;
                width: 100%;
        
                h6{
                    @include textColorAndSize($color-primary, 10px)
                }
                h4 {
                    padding: 20px 0 0 0;
                    @include textColorAndSize($color-black, 16px)
                }
                h2 {
                    @include textColorAndSize($color-black, 20px)
                }
                span {
                    @include textColorAndSize($color-black, 14px);
                    line-height: 14px;
                }
            }
        }   
    }

</style>