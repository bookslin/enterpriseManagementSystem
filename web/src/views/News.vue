<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/news-banner.jpg')})` }"> </div>
        <div class="news-text">新闻资讯</div>
        <div class="search">
            <el-popover placement="bottom" title="" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="serchText" style="width: 50%" placeholder="请输入关键字" :prefix-icon="Search"
                        type="search" size="large" @input="visible = true" @blur="visible = false" />
                </template>
                <div v-if="searchnewslist.length">
                    <!-- <div style="margin-bottom: 10px;color: #000;">搜索结果</div> -->
                    <div class="search-item" v-for="data in searchnewslist" :key="data._id"
                        @click="handleChangepage(data._id)">
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50"></el-empty>
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="handleChangepage(item._id)">
                        <div class="topnews-header">
                            <div class="topnews-title" :title="item.title">{{ item.title }}</div>
                            <div style="color: gray;font-size: 15px;">{{ whichTime(item.editTime) }}</div>
                        </div>
                        <div class="image-box"> <img class="image" :src="'http://localhost:3000' + item.cover" alt=""></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs style="margin: 20px;" v-model="wichTab" class="demo-tabs">
            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div style="padding: 10px;" v-for="data in tabnews[item.name]" :key="data._id">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="handleChangepage(data._id)">
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }"></div>
                                <div class="topnews-header">
                                    <div class="topnews-title" :title="data.title">{{ data.title }}</div>
                                    <div style="color: gray;font-size: 15px;">{{ whichTime(data.editTime) }}</div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                :timestamp="whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue"
import { ref, onMounted, computed } from 'vue'
import axios from "axios"
import moment from 'moment'
import _ from 'lodash'
import { useRouter } from "vue-router"

moment.locale('zh-cn')
const serchText = ref("")
const visible = ref(false)
const newslist = ref([])
const wichTab = ref(1)
const tablist = [
    { label: '最新动态', name: 1 },
    { label: '典型案例', name: 2 },
    { label: '通知公告', name: 3 },
]

const tabnews = computed(() => _.groupBy(newslist.value, item => item.category))

onMounted(async () => {
    var res = await axios.get("/webapi/news/list")
    // console.log(res.data);
    newslist.value = res.data.data
})
const searchnewslist = computed(() => serchText.value ? newslist.value.filter(item => item.title.includes(serchText.value)) : [])

const topNewsList = computed(() => newslist.value.slice(0, 4))

const whichTime = time => {
    return moment(time).format("lll")
}

const router = useRouter()
const handleChangepage = (id) => {
    // console.log(id);
    router.push(`/new-detail/${id}`)
}
</script>

<style scoped lang="scss">
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
}

.news-text {
    font-size: 40px;
    color: white;
    position: absolute;
    top: 150px;
    width: 100%;
    text-align: center;
}

.search {
    position: absolute;
    top: 270px;
    width: 100%;
    text-align: center;

}

.search-item {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    padding: 0 10px;

    &:hover {
        background: rgb(128, 132, 134);
        color: aqua;
    }
}

.topnews {
    margin: 20px;

    .image-box {
        width: 100%;
        height: 150px;

        .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: .5s;
        }

        &:hover .image {
            transform: scale(1.1);
        }
    }

    .topnews-header {
        padding: 12px;

        .topnews-title {
            height: 40px;
            line-height: 40px;
            font-size: 20px;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
    margin-right: 20px;
    transition: transform 0.5s;
}

.tab-image:hover {
    transform: scale(1.1);
}
</style>