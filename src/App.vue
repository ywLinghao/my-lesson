<template>
    <el-container>
        
        <router-view></router-view>
    </el-container>
</template>

<script>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()

export default {
    name: 'App',
    created() {
        this.activeIndex = '/';
    },
    data() {
        return {
            swiDark: ref(isDark.value),
            activeIndex: '/'
        }
    }
}
</script>

<style>
    @import '@/assets/base.css';
</style>
