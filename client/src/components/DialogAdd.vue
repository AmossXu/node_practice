<template>
    <div class="dialogAdd">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :append-to-body="false"
            :close-on-click-modal="false">
            <el-form :model="dialog">

            </el-form>

            <div class="form">
                <el-form ref='form' :model='formData' :rules='form_rules' label-width='120px'
                    style="margin:10px;width:auto">
                    <el-form-item lable='收支类型'>
                        <el-select v-model='formData.type' placeholder='收支类型'>
                            <el-option v-for='(formtype,index) in format_type_list' :key='index' :label='formtype'
                                :value='formtype'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='describe' label='收支描述'>
                        <el-input type='describe' v-model='formData.describe'></el-input>
                    </el-form-item>
                    <el-form-item prop='income' label='收入'>
                        <el-input type='income' v-model='formData.income'></el-input>
                    </el-form-item>
                    <el-form-item prop='expend' label='支出'>
                        <el-input type='expend' v-model='formData.expend'></el-input>
                    </el-form-item>
                    <el-form-item prop='cash' label='账户现金'>
                        <el-input type='cash' v-model='formData.cash'></el-input>
                    </el-form-item>
                    <el-form-item prop='remark' label='备注'>
                        <el-input type='remark' v-model='formData.remark'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click="clickSubmit('form')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'add',
        components: {},
        props: {
            dialog: Object,
            formData: Object
        },
        data() {
            return {

                format_type_list: [
                    "提现",
                    "充值",
                    "转账"
                ],
                form_rules: {
                    income: [{
                        required: true,
                        message: '收入不能为空',
                        trigger: 'blur'
                    }],
                    expend: [{
                        required: true,
                        message: '开销不能为空',
                        trigger: 'blur'
                    }],
                    cash: [{
                        required: true,
                        message: '现金不能为空',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            clickSubmit(form) {
                // console.log('sub');
                this.$refs[form].validate(valid => {
                    if (valid) {
                        //判断是add还是edit
                        const url = this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`
                        const op = this.dialog.option == 'add' ? '添加' : '编辑'
                        this.$axios.post(`/api/profile/${url}`, this.formData)
                            .then(res => {
                                //操作成功
                                this.$message({
                                    message: "数据添加成功",
                                    type: "success"
                                })
                                //隐藏
                                this.dialog.show = false
                                this.$emit('update')
                            }).catch(err => console.log(err))
                    }
                })
            }
        }
    };
</script>

<style>

</style>