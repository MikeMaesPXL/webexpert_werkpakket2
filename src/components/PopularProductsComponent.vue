<script>
import productList from '@/productList.json'
import ProductCard from '@/components/ProductCardComponent.vue'

    export default {
    data() {
        return {
            productList: [],
        }
    },
    components: {
        ProductCard
    },
    computed: {
        highestQuantityProducts() {
            const sortedProducts = [...productList].sort((a, b) => b.stock_quantity - a.stock_quantity);
            return sortedProducts.slice(0, 3);
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