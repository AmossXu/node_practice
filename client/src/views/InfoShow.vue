<template>
    <div class="infoShow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span='8'>
                <div class="user">
                    <img src="user.avatar" class="avatar" alt="">
                </div>
            </el-col>
            <el-col :span='16'>
                <div class="userinfo">
                    <div class="user_item">
                        <p>{{user.name}}</p>
                        <p>{{user.identity=='manager'?'管理员':'员工'}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'infoShow',
        components: {},
        computed: {
            user() {
                return this.$store.getters.user
            }
        }
    };
</script>

<style>

</style>