<script>
    import { useProductStore } from '@/stores/productStore.js'
    import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'

    export default {
        data() {
            return {
                quantity: 1,
                showPopup: false,
                products: useProductStore(),
                shoppingCartProducts: useShoppingCartStore()
            };
        },
        computed: {
            product() {
                const productId = this.$route.params.id;
                return this.products.getProductById(productId)
            },
            isInStock() {
                return this.product.stock_quantity > 0
            },
            assetUrl() {
                return this.products.assetUrl;
            },
        },
        methods: {
            addToCart() {
                console.log('button pressed, item added');
                if (this.product) {
                    const cartItem = {
                        product: this.product,
                        quantity: this.quantity,
                    };
                    //Add item
                    console.log('added item')
                    this.shoppingCartProducts.addToCart(cartItem);
                    //Update stock
                    console.log('updated stock')
                    this.products.updateStockQuantity(this.product.id, -this.quantity);
                    //Show popup
                    this.showPopup = true;
                    //Hide the pop-up after a delay
                    setTimeout(() => {
                        this.showPopup = false;
                    }, 3000);
                } else {
                    console.error('Product not found.');
                }
            },
        },
    }
</script>
<template>
    <section class="product__details">
        <div class="single__product__image">
            <img v-if="product" :src="assetUrl + product.image" :alt="product.title" id="main__image" width="100%">
        </div>

        <div v-if="product" class="single__product__details">
            <h6>Home / G2 Shop</h6>
            <h4>{{ product.title }}</h4>
            <h2>{{ '€' + product.price }}</h2>
            <p class="stock__text" v-if="isInStock">In Stock</p>
            <p class="stock__text" v-else>Out of Stock</p>
            <select id="sizes__select">
                <option>Select Size</option>
                <option v-for="size in product.sizes" :key="size">{{ size }}</option>
            </select>
            <input id="quantity__input" type="number" v-model="quantity" :max="isInStock ? product.stock_quantity : undefined" min="1">
            <button @click="addToCart" class="main__btn" :disabled="!isInStock || quantity > product.stock_quantity">Add To Cart</button>
            <h4>Product details</h4>
            <span>{{ product.short_description }}</span>
        </div>

        <div v-else>
            <h1>Product not found.</h1>
        </div>

        <div v-if="showPopup" class="popup">
            Item added to cart!
        </div>
    </section>
</template>
<style lang="scss" scoped>
     @import '../scss/base.scss';

    .popup {
        position: fixed;
        top: 13vh; 
        left: 50%;
        transform: translateX(-50%);
        background: $color-primary;
        border: 1px solid $color-secondary;
        color: $color-light;
        padding: 1vh 2vw; 
        z-index: 1000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        opacity: 1;
        transition: opacity 0.3s ease;

        &-enter-active,
        &-leave-active {
            transition: opacity 0.3s ease;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
        }
    }

    .stock__text {
        margin-bottom: 2vh;
        font-weight: 700;
    }

    .product__details {
        @include basicSectionStyling();
        display: flex;
        margin-top: 20px;

        .single__product__image {
            width: 40%;
            height: 900px;
            margin-right: 100px;
            padding: 50px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
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