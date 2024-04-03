<template>
    <div class="container">
        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item :key="1">
                <div style="position: relative;" :style="{ backgroundImage: `url(${require('@/assets/index1.png')})` }">
                    <div class="cneter">铸造 · 未来</div>
                </div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{ backgroundImage: `url(${require('@/assets/index2.jpg')})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{ backgroundImage: `url(${require('@/assets/index3.png')})` }"></div>
            </el-carousel-item>
        </el-carousel>
        <!-- <div class="cneter">引领 · 未来</div> -->
    </div>
</template>

<style lang="scss" scoped>
.el-carousel div {
    width: 100%;
    height: 100%;
    background-size: cover;
}

// .container {
//     position: relative;
// }

.cneter {
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 80px;
    color: white;
    text-align: center;
}
</style>