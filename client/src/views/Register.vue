<template>
    <div class="index">
        <div class="form_container">
            <div class="register_box">
                <el-form :model="registerUser" :rules="rules" ref="registerform" label-width="80px"
                    class="register_form">
                    <h1>后台管理系统</h1>
                    <el-form-item label="用户名" prop="name">
                        <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerUser.checkPass" placeholder="请确认密码"></el-input>
                    </el-form-item>

                    <el-form-item label="选择身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="btns" @click="regist('registerform')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        components: {},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerUser.checkPass !== '') {
                        this.$refs.registerform.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {

                registerUser: {
                    name: '',
                    email: '',
                    password: '',
                    checkPass: '',
                    identity: ''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 30,
                        message: '长度在2到30个之间',
                        trigger: 'blur'
                    }],
                    email: [{
                        type: 'email',
                        required: true,
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            regist(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/users/register', this.registerUser)
                            .then(res => {
                                //注册成功
                                this.$message({
                                    message: '账号注册成功！',
                                    type: 'success'
                                })
                            })

                        this.$router.push('./login')
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .register_box {
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

    .register_form {
        position: absolute;
        bottom: 20px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .register_form h1 {
        text-align: center;
        margin-bottom: 20px;
    }
</style>