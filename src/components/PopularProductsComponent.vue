<script>
// import productList from '@/productList.json'
import { useProductStore } from '@/stores/productStore.js'
import ProductCard from '@/components/ProductCardComponent.vue'

    export default {
        data() {
            return {
                productList: useProductStore(),
            }
        },
        components: {
            ProductCard
        },
        computed: {
            highestQuantityProducts() {
                return this.productList.highestQuantityProducts;
            },
        },
}
</script>
<template>
    <div class="products__wrapper">  
        <div v-for="(product, id) in highestQuantityProducts" :key="id">
            <ProductCard :product="product" />
        </div>
    </div>
</template>
<style scoped>
</style>