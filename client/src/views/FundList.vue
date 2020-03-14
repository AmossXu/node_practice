<template>
    <div class="fillContainer">
        <div>
            <el-form :inline='true' ref='add_data'>
                <el-form-item class="btnRight">
                    <el-button type='primary' size='small' icon='view' @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableContainer">
            <el-table v-if='tableData.length>0' :data="tableData" style="width: 100%" max-height='450px' border>
                <el-table-column prop='date' label="创建时间" width="250" align='center'>
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop='type' label="收支类型" width="150" align='center'>
                </el-table-column>
                <el-table-column prop='describe' label="收支表述" width="180" align='center'>
                </el-table-column>
                <el-table-column prop='income' label="收入" width="180" align='center'>
                    <template slot-scope="scope">
                        <span style="color:#4bd3ff">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop='expend' label="支出" width="170" align='center'>
                    <template slot-scope="scope">
                        <span style="color:#ff0000">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop='cash' label="账户现金" width="170" align='center'>
                </el-table-column>
                <el-table-column prop='remark' label="备注" width="220" align='center'>
                </el-table-column>
                <el-table-column label="操作" prop='operation' align='center' width="180px" fixed='right'>
                    <template slot-scope="scope">
                        <el-button size="small" idcon='edit' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <DialogAdd :dialog='dialog' :formData='formData' @update='getProfile'>
        </DialogAdd>
    </div>
</template>

<script>
    import DialogAdd from '../components/DialogAdd.vue';
    export default {
        name: 'fundList',
        components: {
            DialogAdd
        },
        created() {
            this.getProfile()
        },
        data() {
            return {
                tableData: {},
                dialog: {
                    show: false,
                    title: '',
                    option: 'edit'
                },
                formData: {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
            }
        },
        methods: {
            getProfile() {
                //获取表格数据
                this.$axios.get('/api/profile/profiles')
                    .then(res => {
                        // console.log(res);
                        this.tableData = res.data
                    }).catch(err => console.log(err))
            },
            handleEdit(index, row) {
                // console.log('edit');
                //编辑
                this.dialog = {
                    show: true,
                    title: '修改资金信息',
                    option: 'edit'
                }
                this.formData = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
            },
            handleDelete(index, row) {
                // console.log('delete');
                this.$axios.delete(`/api/profile/delete/${row._id}`)
                    .then(res => {
                        this.$message({
                            message: "数据删除成功",
                            type: "success"
                        })
                        this.getProfile()
                    })
            },
            handleAdd() {
                // console.log('add');
                this.dialog = {
                    show: true,
                    title: '添加资金信息',
                    option: 'add'
                }
            }
        }
    };
</script>

<style scoped>
    .fillContainer {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }

    .btnRight {
        float: right;
    }
</style>