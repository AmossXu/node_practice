<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class="logo-container">
                <img src="../assets/LOGO.png" alt="" class="logo">
            </el-col>
            <el-col :span='6' class="user">
                <div class="userinfo">
                    <img :src="user.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <!-- 下拉列表 -->

                        <el-dropdown @command="setDialogInfo">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
    export default {
        name: 'head_nav',
        components: {},
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        methods: {
            setDialogInfo(command) {
                // console.log(command);
                switch (command) {
                    case 'info':
                        this.showInfoList();
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },
            showInfoList() {
                // console.log('个人信息');
                this.$router.push('./infoshow')
            },
            logout() {
                // 清除token
                localStorage.removeItem('eleToken')
                //清除vuex store
                this.$store.dispatch('clearCurrentState')
                //跳转
                this.$router.push('./login')
            }

        }
    };
</script>

<style scoped>
    .head-nav {
        height: 60px;
        width: 100%;
        min-width: 600px;
        padding: 5px;
        color: cornsilk;

        background-color: black;
    }

    .logo {
        width: 70px;
    }

    .user {
        float: right;
    }

    .username {
        float: right;
    }

    .userinfo {
        text-align: right;
    }

    .welcome {
        float: left;
        margin-top: 15px;
        margin-left: 10px;
    }

    .avatar {
        margin-top: 10px;
        margin-left: 40px;
        width: 40px;
        float: left;
    }

    .el-dropdown {
        color: cornsilk;
    }

    .avatarname {
        color: #5ab9f8;
    }

    .username {
        margin-top: 20px;
        float: left;
    }
</style>