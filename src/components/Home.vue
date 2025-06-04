<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header class="header-container">
            <div style="display:flex;gap:10px;align-items: center;">
            <div class="header-sys-icon">
                <i class="iconfont icon-HIS"></i>
                <span class="span-sys-name">医院电子信息系统</span>       
                     
            </div>
            <el-button  @click="goHome" icon="el-icon-s-home" class="button-home" size=mini>主页</el-button>
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

                <div class="over-view">
                    <el-statistic
                        group-separator=","
                        :precision="0"
                        :value="statistic_data['01']"
                        title="总建档人数"
                    ></el-statistic>

                    <el-statistic
                        group-separator=","
                        :precision="0"
                        :value="statistic_data['02']"
                        title="当日就诊人数"
                    ></el-statistic>

                    <el-statistic
                        group-separator=","
                        :precision="0"
                        :value="statistic_data['03']"
                        title="当日检查人数"
                    ></el-statistic>


                </div>
                <div class="card-container">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>近14天就诊量趋势</span>
                            <el-button style="float: right; padding: 3px 0" type="text" class="el-icon-full-screen"></el-button>
                        </div>

                        <div id="echart-visit-trend" style="width: 100%; height: 300px;"></div>
                    </el-card>

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>医嘱类型数量占比</span>
                            <el-button style="float: right; padding: 3px 0" type="text" class="el-icon-full-screen"></el-button>
                        </div>

                        <div id="echart-check-distribution" style="width: 100%; height: 300px;"></div>

                    </el-card>

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>门诊各科室就诊人数</span>
                            <el-button style="float: right; padding: 3px 0" type="text" class="el-icon-full-screen"></el-button>
                        </div>
                        <div id="echart-dept-visit" style="width: 100%; height: 300px;"></div>
                    </el-card>

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <el-button style="float: right; padding: 3px 0" type="text" class="el-icon-full-screen"></el-button>
                        </div>

                    </el-card>


                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import * as echarts from 'echarts';

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
                },

                statistic_data: {
                    '01': 7,
                    '02': 2,
                    '03': 2
                }

            }
        },

        created() {
            window.homeV = this
            this.getDepartmentTreeData()

        },
        mounted() {
            this.getStatisticData()
            setInterval(this.getStatisticData,50000)
        },
        methods: {
            ...mapActions(['getDepartmentTreeData']),
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            goHome(){
                this.$router.push('/home')
            },
            
            // 点击按钮，切换菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath
            },
            getLast14Days() {
                const dates = [];
                const today = new Date();

                for (let i = 0; i < 14; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    dates.push(`${yyyy}-${mm}-${dd}`);
                }

                return dates;
            },

            async getStatisticData() {
                const regdates = this.getLast14Days();
                const queryString = regdates.map(date => `regdates=${date}`).join('&');
                const {data:res} = await this.$http.get(`/outvisit/overview/?${queryString}`)
                console.log(res)
                if(res.code===200){
                    window.tmpd = res.data
                    this.statistic_data['01']=_.filter(res.data,o=>{return o.code==='01'})[0]['n']
                    this.statistic_data['02']=_.filter(res.data,o=>{return o.code==='02'})[0]['n']
                    this.statistic_data['03']=_.filter(res.data,o=>{return o.code==='03'})[0]['n']


                    const data7 = _.filter(res.data,o=>{return o.code==='07'})
                    this.updateDeptVisitChart(data7);
                    
                    const data6 = _.filter(res.data,o=>{return o.code==='06'})
                    this.updateCheckPieChart(data6);
                    
                    const data5 = _.filter(res.data,o=>{return o.code==='05'})
                    this.updateVisit05LineChart(data5);
                    
                }
            },
            updateDeptVisitChart(data07) {
                const chartDom = document.getElementById('echart-dept-visit');
                if (!chartDom) return;

                if (!this.deptChart) {
                    this.deptChart = echarts.init(chartDom);
                }

                const deptNames = data07.map(item => item.desc);  // 例如：普通内科、骨科等
                const deptCounts = data07.map(item => item.n);    // 数量：比如 4、3、1

                const option = {
                    title: {
                    text: '各科室就诊人数',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        fontSize: 14
                    }
                    },
                    tooltip: {},
                    xAxis: {
                    type: 'category',
                    data: deptNames,
                    axisLabel: {
                        rotate: 45,
                        interval: 0
                    }
                    },
                    yAxis: {
                    type: 'value'
                    },
                    series: [
                    {
                        data: deptCounts,
                        type: 'bar',
                        itemStyle: {
                        color: '#409EFF'
                        }
                    }
                    ]
                };

                this.deptChart.setOption(option);
            },

            updateCheckPieChart(data06) {
                const chartDom = document.getElementById('echart-check-distribution');
                if (!chartDom) return;

                if (!this.checkChart) {
                    this.checkChart = echarts.init(chartDom);
                }

                const option = {
                    title: {
                    text: '项目类型占比',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        fontSize: 14
                    }
                    },
                    tooltip: {
                    trigger: 'item'
                    },
                    legend: {
                    orient: 'vertical',
                    left: 'left'
                    },
                    series: [
                    {
                        name: '项目类型',
                        type: 'pie',
                        radius: '60%',
                        data: data06.map(item => ({
                        name: item.desc,
                        value: item.n
                        })),
                        emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                        }
                    }
                    ]
                };

                this.checkChart.setOption(option);
            },
            updateVisit05LineChart(data05) {
                const chartDom = document.getElementById('echart-visit-trend');
                if (!chartDom) return;

                if (!this.visit05Chart) {
                    this.visit05Chart = echarts.init(chartDom);
                }

                const dates = data05.map(item => item.desc);
                const values = data05.map(item => item.n);

                const option = {
                    title: {
                    text: '近期患者就诊量',
                    left: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: dates,
                        axisLabel: { rotate: 45 }
                    },
                    yAxis: {
                        type: 'value',
                        minInterval: 1
                    },
                    series: [
                    {
                        name: '就诊人数',
                        type: 'line',
                        data: values,
                        smooth: true,
                        symbol: 'circle'
                    }
                    ]
                };

                this.visit05Chart.setOption(option);
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




    .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 560px;
    height: 450px;
  }





.over-view {
    padding-top: 20px;
    width: 100%;
    height: 100px;
    display: flex;
}

.el-statistic >>> .head{
    font-size: 18px !important;
}
    
.el-statistic >>> .con .number {
    font-size: 25px !important;
}


.button-home {
    background-color: transparent;
    color: white;
    border: 0;
}
</style>
