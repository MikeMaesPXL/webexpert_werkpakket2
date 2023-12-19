<script>
// import JSConfetti from 'js-confetti';

export default {
    data() {
        return {
            // jsConfetti: new JSConfetti(),
        }
    },
    computed: {
        // addConfetti() {
        //     this.jsConfetti.addConfetti();
        // },
        home() {
          this.$router.push('/');
        },
    }
}

</script>
<template>
    <body>
        <div class="wrapper">
            <h1>THANK YOU FOR YOUR PURCHASE!</h1>
            <!-- <p>{{ addConfetti }}</p> -->
            <button class="backToHome__button" @click="home">Confirm</button>
        </div>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    body {
        min-height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;

            // h1 {
            //     margin-top: 250px;
            // }

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
        }
    }
</style>