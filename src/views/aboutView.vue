<script>
import { useProductStore } from '@/stores/productStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'

export default {
    data() {
        return {
            products: useProductStore
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>
<template>
    <body>
    </body>
</template>
<style lang="scss" scoped>

</style>