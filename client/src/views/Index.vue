<template>
    <div class="index">
        <Head_nav></Head_nav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>

        </div>
    </div>
</template>
<script>
    import Head_nav from '../components/HeadNav'
    import LeftMenu from '../components/LeftMenu'
    export default {
        name: 'index',
        components: {
            Head_nav,
            LeftMenu
        },
        data() {
            return {
                text: ''
            }
        },
        methods: {

        }
    };
</script>

<style>
    .index {
        overflow: hidden;
    }

    .rightContainer {
        padding: relative;
        top: 0;
        left: 180px;
        width: calc(100%-200px);
        height: calc(100%-70px);
        overflow: auto;
    }
</style>