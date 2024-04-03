<template>
    <div>
        <div class="mainer">
            <div class="product">
                <div class="product-box">
                    <div class="product-left">
                        <div class="product-text">
                            <div style="color: white;font-size: 25px;margin-bottom: 20px;">我们的产品</div>
                            <div v-for="item in looplist" :key="item._id" @click="selectProduct(item)"
                                :class="{ 'selected': item === selectedProduct }">
                                <div class="product-title">{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="product-right">
                        <img class="product-img1" v-if="selectedProduct"
                            :src="'http://localhost:3000' + selectedProduct.cover" alt="">
                    </div>
                </div>
                <div class="introduction">
                    <div
                        style="font-size: 25px;height: 60px;line-height: 60px;background-color: #37516dea;color: white;padding-left: 20px;">
                        产品介绍</div>
                    <div style="background-color: rgba(221, 228, 229, 0.5);min-height: 250px;font-size: 20px;color: #444;">
                        <div style="width: 50%;padding: 20px;">
                            {{ selectedProduct?.introduction }}
                        </div>
                        <div style="font-size: 15px;padding: 0 20px;">{{ selectedProduct?.detail }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const looplist = ref([]);
const selectedProduct = ref(null);

onMounted(async () => {
    const res = await axios.get("/webapi/product/list");
    looplist.value = res.data.data;
    // console.log( looplist.value);
    if (looplist.value.length > 0) {
        selectedProduct.value = looplist.value[0];
    }
});

const selectProduct = (product) => {
    selectedProduct.value = product;
    // console.log( selectedProduct.value);
};
</script>

<style lang="scss" scoped>
.mainer {
    position: relative;
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    overflow-y: hidden;

    .product {
        position: relative;
        width: 1300px;
        margin: 0 auto;

        .product-box {
            display: flex;
            // width: 90%;
            width: 1300px;
            height: 450px;

            .product-left {
                width: 35%;
                background-color: rgb(9, 141, 242);
                position: relative;

                .product-text {
                    position: absolute;
                    top: 100px;
                    left: 50px;
                    color: white;

                    .product-title {
                        margin-bottom: 15px;
                        cursor: pointer;
                    }

                    .selected .product-title {
                        color: rgb(216, 184, 24);
                    }
                }
            }

            .product-right {
                width: 65%;
            }

            .product-img1 {
                width: 100%;
                height: 100%;
                // object-fit: cover;
            }
        }
    }
}

</style>