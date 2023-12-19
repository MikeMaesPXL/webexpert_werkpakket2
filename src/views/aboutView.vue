<script>
import { useProductStore } from '@/stores/productStore.js'

export default {
    data() {
        return {
            products: useProductStore,
        }
    },
}
</script>
<template>
<body>
    <h1>COMING SOON!</h1>
</body>
</template>
<style lang="scss" scoped>
    body {
        height: 80vh;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    h1 {
        margin-top: 250px;
    }
</style>