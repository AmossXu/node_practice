<template>
    <div class="index">
        <div class="form_container">
            <div class="login_box">
                <el-form :model="loginUser" :rules="rules" ref="loginform" label-width="80px" class="login_form">
                    <h1>后台管理系统</h1>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" class="btns" @click="login('loginform')">登录</el-button>
                    </el-form-item>
                    <div class="noAcount">
                        <p>还没有账号?现在 <router-link to='/register'>注册</router-link>
                        </p>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode';
    export default {
        name: 'login',
        data() {
            return {

                loginUser: {
                    email: '',
                    password: '',
                },
                rules: {
                    email: [{
                        type: 'email',
                        required: true,
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/users/login', this.loginUser)
                            .then(res => {
                                //登录成功，获取tokentoken
                                const {
                                    token
                                } = res.data;
                                //存储到ls
                                localStorage.setItem('eleToken', token);

                                //解析token
                                const decoded = jwt_decode(token);
                                // console.log(decoded);

                                //token存储到vuex中
                                this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
                                this.$store.dispatch('setUser', decoded);

                                // console.log(this.$store);

                                this.$router.push('./index')

                                this.$message({
                                    message: '登录成功！',
                                    type: 'success'
                                })
                            })
                    }
                });
            },
            isEmpty(value) { //是否为空
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                )
            }
        }
    }
</script>

<style scoped>
    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 20px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .login_form h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .noAcount {
        text-align: right;
        font-size: 12px;
        color: #333;
    }

    .noAcount p a {
        color: #409eff;
    }
</style>