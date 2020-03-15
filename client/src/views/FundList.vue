<template>
    <div class="fillContainer">
        <div>
            <el-form :inline='true' ref='add_data' :model='search_data'>
                <!-- 时间筛选 -->
                <el-form-item label='按照时间筛选'>
                    <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                    --
                    <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                    <el-form-item class="btnRight">
                        <el-button type='primary' size='small' icon='search' @click="handleSearch()">筛选</el-button>
                    </el-form-item>
                </el-form-item>
                <!-- 添加 -->
                <el-form-item class="btnRight">
                    <el-button type='primary' size='small' icon='view' v-if="user.itendity=='manager'"
                        @click="handleAdd()">添加</el-button>
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
                <el-table-column v-if="user.itendity=='manager'" label="操作" prop='operation' align='center'
                    width="180px" fixed='right'>
                    <template slot-scope="scope">
                        <el-button size="small" idcon='edit' v-if="user.itendity=='manager'"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" v-if="user.itendity=='manager'"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row>
                <el-col :span='24'>
                    <div class="pagination">
                        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page.sync="paginitions.page_index" :page-sizes="paginitions.page_sizes"
                            :page-size="paginitions.page_size" :layout="paginitions.layout" :total="paginitions.total">
                        </el-pagination> -->
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="paginitions.page_index" :page-sizes="paginitions.page_sizes"
                            :page-size="paginitions.page_size" layout="total, sizes, prev, pager, next, jumper"
                            :total="paginitions.total">
                        </el-pagination>
                        <!-- <el-pagination @sizi-change='handleSizeChange' background layout="prev, pager, next"
                            :total="1000">
                        </el-pagination> -->
                    </div>
                </el-col>
            </el-row>
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
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        data() {
            return {
                filterTableData: {},
                paginitions: {
                    page_index: 1, //当前页码
                    total: 0, //一共多少
                    page_size: 5, //一页显示多少条
                    page_sizes: [5, 10, 15], //每页显示多少条
                    layout: "total,sizes,prev,pager,next,junmper" //翻页属性
                },
                tableData: {},
                allTableData: {},
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
                search_data: {
                    startTime: '',
                    endTime: ''
                }
            }
        },
        methods: {
            getProfile() {
                //获取表格数据
                this.$axios.get('/api/profile/profiles')
                    .then(res => {
                        // console.log(res);
                        this.allTableData = res.data
                        //设置分页数据
                        this.filterTableData = res.data
                        this.setPaginations();
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
            },
            handleSizeChange(page_size) {
                // console.log(1);
                this.paginitions.page_index = 1;
                this.paginitions.page_size = page_size;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < page_size;
                })
            },
            handleCurrentChange(page) {
                // console.log(page);
                //获取当前页
                let index = this.paginitions.page_size * (page - 1);
                //数据的总数
                let nums = this.paginitions.page_size * page;
                //容器
                let tables = [];

                for (let i = index; i < nums; i++)
                    if (this.allTableData[i]) {
                        tables.push(this.allTableData[i]);
                    }
                this.tableData = tables
            },
            setPaginations() {
                //分页属性设置
                this.paginitions.total = this.allTableData.length;
                this.paginitions.page_index = 1;
                this.paginitions.page_size = 5;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < this.paginitions.page_size;
                })
            },
            handleSearch() {
                console.log('search');
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间"
                    })
                    this.getProfile();
                    return;
                }
                const sTime = this.search_data.startTime;
                const eTime = this.search_data.endTime;

                this.allTableData = this.filterTableData.filter(item => {
                    // console.log(item);
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= sTime && time <= eTime;
                });
                //分页调用
                this.setPaginations();
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