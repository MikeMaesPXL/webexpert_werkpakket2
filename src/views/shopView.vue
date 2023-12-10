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
            selectedFilters: [],
            filterOptions: ["All", "Jersey", "Jackets", "Pants", "Sleeves", "Headwear", "Accessories"],
            pageSize: 8,
            page: 1,
        }
    },
    components: {
        Header,
        Footer,
        ProductCard
    },
    computed: {
        filteredProducts() {
            if (this.selectedFilters.length === 0) {
                return this.products.productList
            } else {
                return this.products.productList.filter(product => 
                this.selectedFilters.some(filter => product.tags.includes(filter)))
            }
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.pageSize)
        },
        paginatedProducts() {
            const startIndex = (this.page - 1) * this.pageSize
            const endIndex = startIndex + this.pageSize
            return this.filteredProducts.slice(startIndex, endIndex)
        }
    },
    methods: {
        toggleFilter(filter) {
            const index = this.selectedFilters.indexOf(filter)

            if (index === -1) {
                this.selectedFilters.push(filter)
            } else {
                this.selectedFilters.splice(index, 1)
            }
        },
        goToPage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.page = newPage
            }
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
            <div class="filter">
                <span v-for="filterOption in filterOptions" :key="filterOption" @click="toggleFilter(filterOption)">
                    {{ filterOption }}
                </span>
            </div>
            <div class="products__wrapper">
                <div v-for="(product, id) in paginatedProducts" :key="id">
                    <ProductCard :product="product" />
                </div>
            </div>

            <div class="pagination">
                <span @click="goToPage(page - 1)" :disabled="page === 1"><i class='bx bx-chevron-left'></i></span>
                <span>{{ page }} / {{ totalPages }}</span>
                <span @click="goToPage(page + 1)" :disabled="page === totalPages"><i class='bx bx-chevron-right'></i></span>
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
        .filter {
            display: flex;
            flex-wrap: wrap;
        }
    }

    @media screen and (max-width: 414px) {
        .products__container {
            padding-top: 30%;
        }
        .filter {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>