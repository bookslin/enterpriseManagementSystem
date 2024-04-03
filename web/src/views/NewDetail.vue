<template>
    <el-row style="margin-bottom: 20px;">
        <el-col :span="17" :offset="1">
            <h2> {{ currentNews.title }}</h2>
            <div class="time">
                {{ whichTime(currentNews.editTime) }}
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="currentNews.content"></div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" class="text item" @click="handleChange(item._id)"
                    style="padding-bottom: 10px ;border-bottom: 1px solid #ccc;margin-bottom: 20px;cursor: pointer;">
                    <div class="topnews-title" :title="item.title">{{ item.title }}</div>
                    <div style="color: gray;font-size: 15px;">{{ whichTime(item.editTime) }}</div>
                </div>
            </el-card>
        </el-col>

    </el-row>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment'
import { StarFilled } from '@element-plus/icons-vue'


moment.locale('zh-cn')
const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])

watchEffect(async () => {
    const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
    // console.log(res2.data.data);
    // console.log(res1.data.data[0]);
    currentNews.value = res1.data.data[0]
    topNews.value = res2.data.data
})
const whichTime = time => {
    return moment(time).format("lll")
}
const handleChange = (id) => {
    router.push(`/new-detail/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}


.topnews-title {
    font-size: 18px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
}
</style>