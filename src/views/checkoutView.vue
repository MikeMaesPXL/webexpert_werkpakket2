<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        checkout() {
          this.$router.push('/confirmation');
        },
    }
}
</script>
<template>
    <body>
       <h1>BABABOEEEEEY</h1>
       <button class="confirmation__button" @click="checkout">Confirm</button>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    h1 {
        margin-top: 250px;
    }

    .confirmation__button {
        margin-top: 20px;
        align-self: flex-end;
        font-size: 16px;
        background-color: $color-primary;
        color: $color-light;
        border: none;
        padding: 10px 20px;
        border-radius: 7px;
        cursor: pointer;

        &:hover {
            background-color: darken($color-primary, 10%);
        }
    }
</style>