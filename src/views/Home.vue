<template>
    <div class="aside-menu-hr">
        <el-affix :offset="0">
            <el-dropdown>
                <font-awesome-icon icon="fa-solid fa-bars" size="xl"/>
                <template #dropdown>
                    <el-dropdown-menu width="100%">
                        <el-dropdown-item :index="index" v-for="(item, index) in articles" @click="changeContent(item, index)">{{ item.shortTitle }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-affix>
    </div>
    <el-container>
        <el-aside class="aside-menu-vt">
            <el-menu mode="vertical" :default-active="currenIndex">
                <el-menu-item :index="index" v-for="(item, index) in articles" @click="changeContent(item, index)">
                    {{ item.shortTitle }}
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main class="content">
                <el-text>{{ content }}</el-text>
            </el-main>
            <el-footer>
                <el-space>
                    <el-button @click="doLike" circle>
                        <font-awesome-icon v-if="!isLike" icon="fa-regular fa-thumbs-up" />
                        <font-awesome-icon v-else icon="fa-solid fa-thumbs-up" />
                    </el-button>
                    <el-text>{{ like }}</el-text>
                </el-space>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        this.currenIndex = 0;
        let article = this.articles[this.currenIndex];
        this.content = article.content;
        this.like = article.like;
        this.isLike = article.isLike;
    },
    data() {
        return {
            content: "",
            like: 0,
            isLike: false,
            currenIndex: 0,
            articles: [
                {
                    shortTitle: "Button 按钮",
                    title: "Button 按钮",
                    content: "使用 type、plain、round 和 circle 来定义按钮的样式。",
                    like: 0,
                    isLike: false
                },
                {
                    shortTitle: "Border 边框",
                    title: "Border 边框",
                    content: "我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。",
                    like: 0,
                    isLike: false
                },
                {
                    shortTitle: "Color 色彩",
                    title: "Color 色彩",
                    content: "Element Plus 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。",
                    like: 0,
                    isLike: false
                }
            ]
        }
    },
    methods: {
        changeContent(item, index) {
            //更改当前所在文章索引
            this.currenIndex = index;
            //切换页面文章数据
            this.content = item.content;
            this.like = item.like;
            this.isLike = item.isLike;
        },
        doLike() {
            let article = this.articles[this.currenIndex];
            //更新点赞数
            if (article.isLike) {
                article.like--;
                article.isLike = false;
            } else {
                article.like++;
                article.isLike = true;
            }
            //切换页面文章数据
            this.like = article.like;
            this.isLike = article.isLike;
        }
    }
}
</script>


<style scoped>
    .el-aside {
        padding: 48px 32px 0 0;
    }

    .el-aside,
    .el-menu {
        border: 0;
    }
</style>
