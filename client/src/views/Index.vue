<template>
    <div class="index">
        <Head_nav></Head_nav>
        <LeftMenu></LeftMenu>
        <router-view></router-view>
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