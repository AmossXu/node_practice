<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b">
                <router-link to='/home'>
                    <el-menu-item index="0">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <template v-for='item in items'>
                        <el-submenu v-if='item.children' :index='item.path' :key='item.path'>
                            <template slot="title">
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for='(citem,cindex) in item.children' :to='citem.path' :key='cindex'>
                                <el-menu-item :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>
                </router-link>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'left-menu',
        data() {
            return {
                items: [{
                    name: '资金管理',
                    path: 'fund',
                    children: [{
                        path: 'fundlist',
                        name: '资金流水'
                    }]
                }, {
                    name: '信息管理',
                    path: 'info',
                    children: [{
                        path: 'infoshow',
                        name: '个人信息'
                    }]
                }]
            }
        }
    }
</script>

<style scoped>
    .menu_page {
        width: 201px;
        height: 900px;
        float: left;
    }
</style>