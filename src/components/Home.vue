<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header class="header-container">
            <div class="header-sys-icon">
                <i class="iconfont icon-HIS"></i>
                <span class="span-sys-name">医院电子信息系统</span>            
            </div>

            <span class="span-role-name">{{path_map_role[$route.fullPath]}}</span>
            <div style="display:flex;">
                <el-button size="small" class="user-info-but"   type="warning" >
                    <i class="iconfont icon-yisheng2"/>
                    <span>{{userInfo.userName}}</span>
                    </el-button>
                <el-button type="info" @click="logout" size=mini>退出</el-button>
            </div>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container class="el-container-class">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '160px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :unique-opened="false"
                         
                         :collapse="isCollapse" :collapse-transition="false" router 
                         :default-active="activePath">
                    

                    <el-menu-item index="/patientInfo" key="view_all">
                        <i class="iconfont icon-huanzheguanli"></i>
                        <span>患者建档信息</span>
                    </el-menu-item>


                    <el-submenu index="" :key="777">
                        <template slot="title">
                            <i class="iconfont icon-qingbingliguanli"></i>
                            <span>患者就诊</span>
                        </template>

                        <el-menu-item index="/medicalRecord" :key="779">
                            <template slot="title">
                                <i class="iconfont icon-jiuyijiuzhen"></i>
                                <span>诊断与病历</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="/medicalOrder" :key="780">
                            <template slot="title">
                                <i class="iconfont icon-yizhufenxi"></i>
                                <span>医嘱</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                    <el-menu-item index="/medicalBill" :key="778">
                        <i class="iconfont icon-jiesuan" ></i>
                        <span>结算</span>
                    </el-menu-item>


                    

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
                
                // 是否折叠
                isCollapse: true,
                // 被激活的链接地址
                activePath: '/patientInfo',
                path_map_role: {
                    '/home': '主页',
                    '/patientInfo': '患者信息',
                    '/medicalRecord': '诊断与病历',
                    '/medicalOrder': '医嘱开立与缴费'
                }
            }
        },

        created() {
            window.homeV = this
            this.getDepartmentTreeData()

        },
        methods: {
            ...mapActions(['getDepartmentTreeData']),
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
        computed: {
            ...mapState(['departmentTreeData','userInfo']),
        },
        watch: {
            
        }
    }
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .header-container {
        background-color: #333744;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        height: 40px !important;

    }

    .header-sys-icon {
        display: flex;
        justify-content: space-between;
    }

    .header-sys-icon .span-sys-name {
        font-size: 16px;
        font-family: KaiTi;
        padding-left: 5px;
    }


    .span-role-name {
        font-size: 18px;
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
        background-color: #fff !important;
        padding: 0px;
        margin: 10px;
    }
    .el-container-class {
        height: calc(100% - 30px);
    }


    .el-menu .iconfont {
        font-size: 20px;
        padding-right: 4px;
    }

    .icon-qingbingliguanli {
        font-size: 26px !important;
    }

    .icon-jiuyijiuzhen {
        font-size: 23px !important;
    }

    
</style>
