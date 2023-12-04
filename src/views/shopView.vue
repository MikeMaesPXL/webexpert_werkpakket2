<script>
import { useProductStore } from '@/stores/productStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import ProductCard from '@/components/ProductCardComponent.vue'

export default {
    data() {
        return {
            products: useProductStore(),
            tags: [],
            tagFilter: '',
            //Array met tags
            filterOptions: ["All", "Jersey", "Jackets", "Pants", "Sleeves"]
        }
    },
    components: {
        Header,
        Footer,
        ProductCard
    },
    methods: {
        filterProducts() {
            console.log("filter")
            // Voeg hier de array toe
            if (this.tagFilter === '') {
                this.tags = this.products.productList;
            } else {
                this.tags = this.products.productList.filter(products =>
                products.tags.some(tag => tag.toLowerCase().includes(this.tagFilter.toLowerCase())))
            }
        },
        resetFilter() {
            console.log("reset")
            this.tagFilter = ''
            this.tags = this.products.productList
        }
    },
    
}
</script>
<template>
    <body>
        <section class="products__container">
            <div class="title">
                <h1>Featured Items</h1>
                <p>G2 Esports - 2023</p>
            </div>
            <!-- <div class="filter">
                <span v-for="(text, index) in filterOptions" :key="index">
                    {{ text }}
                </span>
            </div> -->
            <div class="filter">
                <span @click="resetFilter()">All</span>
                <span @click="filterProducts()">Jersey</span>
                <span @click="filterProducts()">Jackets</span>
                <span @click="filterProducts()">Pants</span>
                <span @click="filterProducts()">Sleeves</span>
            </div>
            <div class="products__wrapper">
                <div v-for="(product, id) in this.products.productList" :key="id">
                    <ProductCard :product="product" />
                </div>
            </div>

            <div class="pagination">
                <span><i class='bx bx-chevron-left'></i></span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span><i class='bx bx-chevron-right'></i></span>
            </div>
        </section>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    .products__container {
        padding-top: 3.5%;

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

        .filter {
            @include textColorAndSize($color-black, 20px);
            margin: 30px 0 0px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            span {
                padding: 10px;
                &:hover {
                    text-decoration: underline;
                    transition: 1s all ease;
                    cursor: pointer;
                }
            }
        }

        .pagination {
            @include textColorAndSize($color-black, 20px);
            margin-top: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            span {
                padding: 10px;
                i {
                    margin-top: 3px;
                    font-size: 40px;
                }
                &:hover {
                    text-decoration: underline;
                    transition: 1s all ease;
                    cursor: pointer;
                }
            }
        }
    }

    // --- MEDIA QUERIES ---
    @media screen and (max-width: 820px) {
        .products__container {
            padding-top: 15%;
        }
    }

    @media screen and (max-width: 414px) {
        .products__container {
            padding-top: 30%;
        }
    }
</style>