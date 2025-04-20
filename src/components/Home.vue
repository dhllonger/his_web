<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <!-- <img src="../assets/Nanjing_Medical_University_logo.jpg" alt=""> -->
                <span>医院电子信息系统</span>
            </div>
            <el-button type="info" @click="logout" size=mini>退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container class="el-container-class">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '160px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :unique-opened="false"
                         :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    

                    <el-menu-item index="/patientInfo" key="view_all">
                        <i class="el-icon-notebook-1"></i>
                        <span>患者建档信息</span>
                    </el-menu-item>


                    <el-submenu index="" :key="777">
                        <template slot="title">
                            <i class="el-icon-grape"></i>
                            <span>数据源</span>
                        </template>

                        <el-menu-item index="/dbclass" :key="779">
                            <template slot="title">
                                <i class="iconfont icon-peizhishujuyuan"></i>
                                <span>数据库配置</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="/test" :key="780">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>测试</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                    <el-menu-item index="/flowIndex" :key="778">
                        <i class="iconfont icon-node_multiple" style="padding-left:5px;"></i>
                        <span>graph</span>
                    </el-menu-item>


                    <el-submenu index="888" :key="888">
                        <template slot="title">
                            <i class="el-icon-sort"></i>
                            <span>电子病历</span>
                        </template>
                        <el-menu-item index="/etlview" :key="778">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>表抽取任务</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="/dqpsql" :key="775">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>数据质量</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main id="body-main">
                <!-- 路由占位符 -->
                <keep-alive >
                    <router-view :key="$route.fullPath"></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'

    export default {
        data() {
            return {
                // 左侧菜单数据
                menulist: [],
                iconsObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 是否折叠
                isCollapse: true,
                // 被激活的链接地址
                activePath: '',
            }
        },

        async created() {
            window.homeV = this
            
            // this.getMenuList()
            // this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            
            // 点击按钮，切换菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath
            }
        },
        watch: {
            
        }
    }
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #333744;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        height: 30px !important;

    }

    .el-aside {
        background-color: #333744;
    }

    .el-menu {
        border-right: none;
    }
    .el-menu-item {
        min-width: 160px;
    }

    .el-main {
        background-color: #0aedf1;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    #body-main {
        background-color: #ddd !important;
        padding: 0px;
    }
    .el-container-class {
        height: calc(100% - 30px);
    }
</style>
