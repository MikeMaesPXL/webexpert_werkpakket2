<script></script>
<template>
    <header>
        <ul class="nav__menu">
            <a href="#" class="logo"><img src="@/assets/g2_logo.png" alt="logo"></a>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/shop">G2 Shop</router-link></li>
            <li><router-link to="/teams">Teams</router-link></li>
            <li><router-link to="/news">News</router-link></li>
            <li><router-link to="/about">About G2</router-link></li>
        </ul>

        <div class="nav__icon">
            <a href="#"><i class='bx bx-search'></i></a>
            <router-link to="/login"><i class='bx bx-user'></i></router-link>
            <router-link to="/shoppingCart"><i class='bx bx-cart'></i></router-link>

            <div class="bx bx-menu" id="burger-menu"></div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';
    // @import '../scss/components.scss';

    header {
        background-color: $color-light;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 4px;
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        z-index: 1000;
        @include flexLayoutSpacedBetween();
        padding: 10px 10%;

        .logo {
            img {
                max-width: 60px;
                height: auto;
            }
        }
    }

    .nav__menu {
        display: flex;
        align-items: center;
        a {
            @include navMenuText(18px);

            &:hover {
                color: $color-primary;
            }
        }
    }

    .nav__icon {
        display: flex;
        align-items: center;
        i {
            @include navIcons(28px);

            &:hover {
                transform: scale(1.1);
                color: $color-primary;
            }
        }
    }

    #burger-menu {
        font-size: 35px;
        color: $color-black;
        z-index: 11000;
        cursor: pointer;
    }


    @media screen and (max-width: 820px) {
        header {
            padding: 10px 2%;
            .logo {
                display: none;
            }
        }
        .nav__menu {
            a {
                @include navMenuText(14px);
            }
        }
    }

    @media screen and (max-width: 414px) {
        header {
            padding: 10px 2%;
        }
        .nav__menu {
            a {
                @include navMenuText(10px);
                padding: 6px;
            }
        }
        .nav__icon {
            i {
                @include navIcons(14px);
                padding: 0;
            }
        }
        #burger-menu {
            font-size: 16px;
        }
    }
</style>