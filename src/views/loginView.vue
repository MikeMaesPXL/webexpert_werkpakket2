<script>
import { useProductStore } from '@/stores/productStore.js'
import { useAuthStore } from '@/stores/authStore.js';
import { useShoppingCartStore } from '@/stores/shoppingCartStore.js'

export default {
    data() {
        const products = useProductStore();
        const authChecker = useAuthStore();
        const shoppingCartProducts = useShoppingCartStore();

        return {
            products,
            authChecker,
            shoppingCartProducts,
            email: '',
            password: '',
        }
    },
    methods: {
        async submitLogin() {
            try {
                await this.authChecker.login(this.email, this.password);
                this.$router.push('/shoppingCart')
            } catch (error) {
                alert('Login failed:', error);
            }
        },
        async submitLogout() {
            try {
                await this.authChecker.logout();
                this.shoppingCartProducts.clearCart();
                console.log('cart cleared');
                this.$router.push('/');
            } catch (error) {
                alert('Logout failed:', error);
            }
        }
    },
}
</script>
<template>
    <body>
        <section class="login__container forms">
            <div class="form login">
                <div v-if="!authChecker.isLoggedIn" class="form__content">
                    <h2>{{ authChecker.isLoggedIn ? 'Logout' : 'Login'}}</h2>

                    <form @submit.prevent="submitLogin">
                        <div class="field input__field">
                            <input v-model="email" type="email" placeholder="Email" class="input">
                        </div>

                        <div class="field input__field">
                            <input v-model="password" type="password" placeholder="Password" class="password">
                            <i class='bx bx-hide eye__icon'></i>
                        </div>

                        <div class="form__link">
                            <a href="#" class="forgot__pass">Forgot password</a>
                        </div>

                        <div class="field input__field">
                            <button>Login</button>
                        </div>

                    </form>

                    <div class="form__link">
                        <span>New to G2 Esports? <a href="#" class="signup__link">Sign up</a></span>
                    </div>
                    
                </div>
                <div v-else class="logout">
                    <button v-if="authChecker.isLoggedIn" @click="submitLogout">Logout</button>
                </div>


                <div class="line" v-if="!authChecker.isLoggedIn"></div>


                <div class="media__options" v-if="!authChecker.isLoggedIn">
                    <a href="#" class="field facebook">
                        <i class='bx bxl-facebook facebook__icon' ></i>
                        <span>Login with Facebook</span>
                    </a>
                </div>

                <div class="media__options" v-if="!authChecker.isLoggedIn">
                    <a href="#" class="field google">
                        <img src="@/assets/google.png" alt="" class="google__img">
                        <span>Login with Google</span>
                    </a>
                </div>

            </div>
        </section>
    </body>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    .logout {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;

        button {
            background-color: $color-primary;
            color: $color-light;
            padding: 10px 20px 10px 20px;
            font-weight: 700;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .login__container {
        @include basicSectionStyling();
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f6f6f6;
        
        .form {
            max-width: 460px;
            width: 100%;
            padding: 30px;
            border-radius: 6px;
            background-color: $color-light;

            .field {
                position: relative;
                height: 50px;
                width: 100%;
                margin-top: 20px;
                border-radius: 6px;
            }
        }

        h2 {
            @include textColorAndSize($color-black, 28px);
            font-weight: 600;
            text-align: center;
        }

        .form__content {
            margin-top: 30px;

            .field {
                input,
                button {
                    @include textColorAndSize($color-black, 16px);
                    font-weight: 400;
                    height: 100%;
                    width: 100%;
                    border: none;
                    border-radius: 6px;
                }

                input {
                    outline: none;
                    padding: 0 15px;
                    border: 1px solid $color-faded;

                    &:focus {
                        border-bottom-width: 2px;
                    }
                }

                .eye__icon {
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translateY(-50%);
                    @include textColorAndSize(#8b8b8b, 18px);
                    cursor: pointer;
                    padding: 5px;
                }

                button {
                    color: $color-light;
                    background-color: $color-primary;
                    transition: all 0.3s ease;
                    cursor: pointer;

                    &:hover {
                        background-color: #e05b5d;
                    }
                }
            }

            .form__link {
                text-align: center;
                margin-top: 10px;

                span {
                    @include textColorAndSize($color-black, 16px);
                }

                span, a {
                    font-weight: 400;
                }
            }

            a {
                text-decoration: none;
                @include textColorAndSize($color-primary, 16px);

                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .line {
            position: relative;
            height: 1px;
            width: 100%;
            margin: 36px 0;
            background-color: $color-faded;

            &::before {
                content: 'Or';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: $color-light;
                color: $color-black;
                padding: 0 15px;
            }
        }
        .media__options {
            a {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .facebook {
                color: $color-light;
                background-color: #4267b2;

                .facebook__icon {
                    @include textColorAndSize(#0171d3, 20px);
                    height: 28px;
                    width: 28px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: $color-light;
                }
            }
            .facebook__icon,
            .google__img {
                position: absolute;
                top: 22%;
                left: 15px;
                transform-origin: translateY(-50%);
            }
            .google__img {
                height: 35px;
                width: 35px;
                top: 15%;
                left: 12px;
                object-fit: cover;
            }
            .google {
                border: 1px solid $color-faded;
                
                span {
                    color: $color-black;
                    font-weight: 500;
                    opacity: 0.8;
                }
        }
    }
}
</style>