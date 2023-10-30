<template>
    <div class="container">
        <div class="login-panel">
            <div class="login-title">
                <el-text>登录</el-text>
            </div>
            <div class="login-form">
                <el-form ref="formRef" :model="logindata" :rules="loginRule">
                    <el-form-item prop="email">
                        <el-input placeholder="邮箱" type="email" v-model="logindata.email" prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码" type="password" v-model="logindata.password" show-password  prefix-icon="Lock"/>
                    </el-form-item>
                    <el-button type="primary" @click="login(formRef)">立即登录</el-button>
                </el-form>
            </div>
            <div class="link">
                <router-link to="/">
                    <el-button type="primary" style="margin-right: 10px">找回密码</el-button>
                </router-link> 
                <span style="margin-right: 23px"></span>
                <router-link to="/user/register">
                    <el-button type="primary">没有账号？点击注册</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref,reactive } from 'vue';
    import { userLogin } from '@/http/user';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/user';

    const router = useRouter();

    //使用user状态
    const userStore = useUserStore();
    
    
    //响应式数据
    const logindata = reactive({
        email: '',
        password: ''
    })

    //校验规则
    //https://blog.csdn.net/weixin_43405300/article/details/132326466
    const loginRule = {
        email:[
            {required: true,message:'请输入邮箱',triger:'blur'},
            {type:'email',message:'请输入正确的邮箱',triger:'blur'}
        ],
        password:[
            {required: true,message:'请输入密码',triger:'blur'},
            {min:8,max:20,message:'密码的长度在8到20之间',triger:'blur'}
        ]
    }

    const formRef = ref(logindata);
    
    // 登录表单提交函数，接受一个表单引用(formRef)作为参数
    const login = (formRef) => {
        // 使用表单引用进行表单校验
        formRef.validate((valid) => {
            // 如果所有校验通过
            if (valid) {
                // 向服务器提交登录信息（通过 userLogin 函数实现）
                userLogin(logindata).then(res => { 
                    // 如果登录成功
                    if(res.success == true && res.code == 1){
                        // 登录成功后，存储用户状态
                        userStore.setUser(res.data.userinfo);
                        // 显示成功提示消息
                        ElMessage({message: '登录成功',type: 'success',offset:100});
                        // 重定向用户到个人信息页面
                        router.push('/user/mine');
                    }else{
                        // 登录失败时，显示警告消息
                        ElMessage({message: res.msg,type: 'warning',offset:100});
                    }
                }).catch(err => {
                    // 登录失败后捕获异常并显示错误消息
                    ElMessage({message: err.msg,type: 'error',offset:100});
                })
            } else {
                // 如果有部分校验未通过，显示错误消息
                ElMessage({message: '请检查输入信息',type: 'error',offset: 100});
                return false;// 防止继续执行提交
            }
        });
    }
    
</script>

<style>
.container {
    width: 100%;
    height: 100%;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to bottom, white 50%, #99CCFF);
}

.login-panel {
    margin: 100px;
    width: 280px;
}

.login-title {
    width: 100%;
    height: 100px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-title .el-text {
    font-size: 48px;
}

.login-form {
    margin-bottom: 12px;
}

.link {
    display: flex;
    justify-content: center;
}

.el-input {
    border-radius: 100px;
}

.el-button {
    width: 100%;
}

a {
    text-decoration: none;
    font-size: 12px;
    color: var(--el-text-color);
}
</style>