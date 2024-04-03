<template>
    <div>
        <div class="banner-box">
            <img class="banner-img" src="@/assets/banner1.jpg" alt="">
            <div class="banner-text">联系我们</div>
        </div>
        <div class="form-info">
            <div class="form-container">
                <div class="form-img"><img class="info-img" src="@/assets/banner2.jpg" alt=""></div>
                <div class="form-right">
                    <div style="margin-bottom: 20px;font-size: 20px;">期待您的加入</div>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules"
                        label-width="auto" class="demo-ruleForm">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model.number="ruleForm.phone" type="tel" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" type="email" />
                        </el-form-item>
                        <el-form-item label="留言" prop="leavemessage">
                            <el-input v-model="ruleForm.leavemessage" type="textarea" autocomplete="off" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
const ruleFormRef = ref()
const ruleForm = reactive({
    name: '',
    phone: '',
    email: '',
    leavemessage: ''
})
const rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { type: 'number', message: '请输入数字' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ]
})

const submitForm = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            await resetForm();
            window.alert('您的信息提交成功！请等待我们的回复');
        }
    });
}

const resetForm = () => {
    Object.keys(ruleForm).forEach(key => {
        ruleForm[key] = '';
    });
}

</script>

<style lang="scss" scoped>
.banner-box {
    position: relative;
}

.banner-img {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.banner-text {
    color: white;
    font-size: 3vw;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
}

.form-container {
    display: flex;
    width: 90%;
    gap: 30px;
}

.form-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;

    .form-img {
        width: 400px;
        height: 300px;
        overflow: hidden;

        .info-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: .5s;
        }

        &:hover .info-img {
            transform: scale(1.1);
        }
    }

    .form-right {
        flex: 1;
    }
}</style>