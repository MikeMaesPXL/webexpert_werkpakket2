<script>
    export default {
        props: {
            product: Object,
        },
        methods: {
            viewProductDetails() {
                this.$router.push({ name: 'product', params: { id: this.product.id } })
            }
        }
    };
</script>
<template>
    <div class="card">
        <div class="img__card">
            <img :src="'src/assets/' + product.image" :alt="product.title">
            <div class="overlay">
                <button class="add__to__cart">Add to Cart</button>
                <button class="view__details" @click="viewProductDetails">View Details</button>
            </div>
        </div>
        <div class="info">
            <h3>{{ product.title }}</h3>
            <p class="price">{{ '€' + product.price }}</p>
            <p>{{ product.short_description }}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    .card {
        position: relative;
        width: 350px;
        height: 500px;
        margin: 100px 50px 15px 50px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 4px;
        overflow: hidden;
        background: $color-light;
        border-radius: 15px;
        transition: all 0.4s ease;

        &:hover {
            transform: translateY(-10px) rotate(2deg);
        }

        .img__card {
            position: relative;
            width: 100%;
            height: 250px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                transition: transform 0.3s ease;

                &:hover {
                    transform: scale(1.1);
                }
            }

            &:hover .overlay {
                opacity: 1;
            }
        }

        .add__to__cart {
            @include textColorAndSize($color-light, 12px);
            @include buttonStyling($color-primary);

            &:hover {
                transform: scale(1.1);
                transition: 0.3s ease;
            }
        }

        .view__details {
            @include textColorAndSize($color-black, 12px);
            @include buttonStyling($color-light);

            &:hover {
                transform: scale(1.1);
                transition: 0.3s ease;
            }
        }
        
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.65);
            opacity: 0;
            transition: opacity 0.3s ease;
        
            .view__details {
                a {
                    color: $color-black;
                }
            }
            .add__to__cart {
                a {
                    color: $color-light;
                }
            }
        }
        
        .info {
            padding: 10px;
            text-align: center;
        
            h3 {
                @include textColorAndSize($color-black, 24px);
                margin: 15px 0 10px;
                font-weight: bold;
                text-transform: uppercase;  
            }
            .price {
                @include textColorAndSize($color-primary, 24px);
                margin: 0;
                font-weight: bold;
            }
            p {
                @include textColorAndSize($color-black, 18px);
                margin: 20px 0px 0px;
            }
        }
    }
</style>