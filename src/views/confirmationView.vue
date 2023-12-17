<script>

</script>
<template>
    <body>
       <h1>BABABOEEEEEY</h1>
       <button class="backToHome__button" @click="checkout">Back to home!</button>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    h1 {
        margin-top: 250px;
    }

    .backToHome__button {
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