<script>
import { useProductStore } from '@/stores/productStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'

export default {
    data() {
        return {
            products: useProductStore,
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>
<template>
    <h1>HEADER</h1>
</template>
<style lang="scss" scoped>
    h1 {
        margin-top: 200px;
    }
</style>