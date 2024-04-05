<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理" />

            <el-table :data="getSlicedData" style="width: 100%">
                <el-table-column prop="title" label="标题" />

                <el-table-column label="分类" sortable prop="category">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>

                <el-table-column label="更新时间" sortable prop="editTime">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="是否发布" sortable prop="isPublish">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
                        <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background hide-on-single-page :page-size="pageSize" layout="prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        </el-card>
        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size: 12px;color: gray;"> {{ formatTime.getTime(previewData.editTime) }}</div>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>

                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import formatTime from "@/util/formatTime"
import { Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue"
import { useRouter } from 'vue-router';
const router = useRouter()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)

const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)

const getTotalPages = computed(() => Math.ceil(tableData.value.length / pageSize.value))

const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1 // Reset current page when changing page size
}

const handleCurrentChange = (val) => {
    currentPage.value = val
}

const getSlicedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return tableData.value.slice(start, end)
})

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get(`/adminapi/news/list`)
    // console.log(res.data);
    tableData.value = res.data.data
    total.value = res.data.data.length
    // console.log(tableData.value);
}

//格式化分类信息
const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category - 1]
}

//开关回调
const handleSwitchChange = async (item) => {

    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })
    await getTableData()
}
//预览回调
const handlePreview = (data) => {
    // console.log(data);
    previewData.value = data
    dialogVisible.value = true
}

//删除回调
const handleDelete = async (item) => {
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableData()
}

//编辑回调
const handleEdit = (item) => {
    router.push(`/news-manage/editnews/${item._id}`)
}


</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlcontent {
    img {
        max-width: 100%;
    }
}

.el-pagination {
    justify-content: center;
    padding: 10px;
}
</style>