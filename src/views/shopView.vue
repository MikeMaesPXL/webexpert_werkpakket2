<script>
import { useProductStore } from '@/stores/productStore.js'
import ProductCard from '@/components/ProductCardComponent.vue'

export default {
    data() {
        return {
            products: useProductStore(),
            tags: [],
            selectedFilters: [],
            searchQuery: '',
            filterOptions: ["All", "Jersey", "Jackets", "Pants", "Sleeves", "Headwear", "Accessories"],
            pageSize: 8,
            page: 1,
        }
    },
    components: {
        ProductCard
    },
    computed: {
        filteredProducts() {
            // if (this.searchQuery && this.selectedFilters.length > 0) {
            //     const filteredTag = this.products.productList.filter(product =>
            //         this.selectedFilters.some(filter => product.tags.includes(filter))
            //     );

            //     return filteredTag.filter(product =>
            //         product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            //     );
            // }
            // else if (this.searchQuery) {
            //     return this.products.productList.filter(product =>
            //         product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            //     );
            // } else if (this.selectedFilters.length === 0) {
            //     return this.products.productList
            // } else {
            //     return this.products.productList.filter(product => 
            //     this.selectedFilters.some(filter => product.tags.includes(filter)))
            // }
            const filteredList = this.products.productList;

            if (this.searchQuery) {
                return filteredList.filter(product =>
                    product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
            if (this.selectedFilters.length > 0) {
                return filteredList.filter(product =>
                    this.selectedFilters.some(filter => product.tags.includes(filter))
                );
            }
            return filteredList;
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.pageSize)
        },
        paginatedProducts() {
            const startIndex = (this.page - 1) * this.pageSize;
            return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
        }
        // paginatedProducts() {
        //     const startIndex = (this.page - 1) * this.pageSize
        //     const endIndex = startIndex + this.pageSize
        //     return this.filteredProducts.slice(startIndex, endIndex)
        // }
    },
    methods: {
        toggleFilter(filter) {
            const index = this.selectedFilters.indexOf(filter)

            if (index === -1) {
                this.selectedFilters.push(filter)
            } else {
                this.selectedFilters.splice(index, 1)
            }

            this.page = 1;
        },
        goToPage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.page = newPage
            }
        },
        updateSearchQuery(newSearchQuery) {
            this.searchQuery = newSearchQuery;
            this.page = 1;
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
            <div class="search__bar">
                <input v-model="searchQuery" @input="updateSearchQuery" type="text" placeholder="Search products...">
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
            margin: 30px 0 0 0;
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

        .search__bar {
            margin: 30px 0 0 0;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
                // width: 100%;
                height: 36px;
                border-radius: 4px;
                padding-left: 12px;
                font-size: 14px;
                font-weight: normal;
                border: 1px solid rgb(137, 151, 155);
                transition: border-color 150ms ease-in-out 0s;
                outline: none;
                color: rgb(33, 49, 60);
                background-color: $color-light;
                padding-right: 12px;
                &:hover{
                    box-shadow: rgb(255, 225, 225) 0px 0px 0px 3px;
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