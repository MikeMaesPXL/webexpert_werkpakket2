<script></script>
<template>
    <section class="footer__section">
        <div class="footer">
            <footer>
                <div class="social">
                    <a href="https://www.instagram.com/g2esports/"><i class='bx bxl-instagram'></i></a>
                    <a href="https://www.tiktok.com/@g2esports"><i class='bx bxl-tiktok'></i></a>
                    <a href="https://twitter.com/G2esports"><i class='bx bxl-twitter'></i></a>
                    <a href="https://www.reddit.com/r/G2eSports/?rdt=39025"><i class='bx bxl-reddit'></i></a></div>
                <ul class="list-inline">
                    <li class="list-inline-item"><router-link to="/">Home</router-link></li>
                    <li class="list-inline-item"><router-link to="/shop">G2 Shop</router-link></li>
                    <li class="list-inline-item"><router-link to="/teams">Teams</router-link></li>
                    <li class="list-inline-item"><router-link to="/news">News</router-link></li>
                    <li class="list-inline-item"><router-link to="/about">About G2</router-link></li>
                </ul>
                <p class="copyright">G2 Esports © 2023</p>
            </footer>
        </div>
    </section>
</template>
<style lang="scss" scoped>
    @import '../scss/base.scss';

    .footer__section {
    @include footerSectionStyling();

    .footer {
        background-color: $color-primary;
        padding: 40px 0;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 4px;
        color: $color-light;

        ul {
            padding: 0;
            list-style: none;
            text-align: center;
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 0;
        }
        li {
            padding: 0 10px;
        }
        ul a {
            color: inherit;
            text-decoration: none;
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
        .social {
            text-align: center;
            padding-bottom: 25px;
            > a {
                @include textColorAndSize($color-light, 24px);
                width: 40px;
                height: 40px;
                line-height: 40px;
                display: inline-block;
                text-align: center;
                border-radius: 50%;
                border: 2px solid $color-light;
                margin: 0 8px;   
                opacity: 0.75;

                &:hover {
                    opacity: 0.9;
                }
            }
        }
        .copyright {
            @include textColorAndSize($color-light, 16px);
            margin-top: 15px;
            text-align: center;
            margin-bottom: 0;
        }
    }
}
</style>