<template>
<div class="analysisBareland">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <!-- 头部标题部分 -->
    <div class="titleBread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="titleshow product">统计分析</el-breadcrumb-item>
            <el-breadcrumb-item class="titleshow">扬尘裸地</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 内容区域
    -->
    <div class="content">
        <div class="timeOpt">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="日期：">
                    <el-date-picker v-model="value1" type="month" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="类型筛选：">
                    <el-select v-model="value" placeholder="请选择" @change="selType(value)">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-row :gutter="20">
                <el-col :span="15">

                    <div class="chart1">
                        <div id="main1"></div>
                    </div>

                </el-col>
                <el-col :span="9">
                    <div class="chart1">
                        <div id="table1">
                            <el-table :data="tableData" style="width: 100%" size="mini">
                                <el-table-column type="index" label="序号"></el-table-column>
                                <el-table-column prop="name" label="地区"></el-table-column>
                                <el-table-column prop="num" label="数量" width="70"></el-table-column>
                                <el-table-column prop="area" label="面积" width="100"></el-table-column>
                                <el-table-column label="操作" width="50">
                                    <template slot-scope="scope">
                                        <div style="cursor:pointer" @click="downLoad(scope.row)">下载</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    <!-- </el-scrollbar> -->
</div>
</template>

<script>
import echarts from "echarts";
import guangxi from "@/assets/word/luodi/guangxi.xlsx";
import naning from "../../assets/word/luodi/nanning.xlsx";

export default {
    data() {
        return {
            options: [{
                    value: "总面积",
                    label: "总面积"
                },
                {
                    value: "面积占比",
                    label: "面积占比"
                },

            ],
            value: "总面积",

            value1: "",
            value2: "",

            myChart1: null,
            myChart2: null,
            tableData: [{
                    num: "283",
                    name: "广西壮族自治区",
                    area: "9793",
                    path: guangxi
                },
                {
                    num: "35",
                    name: "南宁市",
                    area: "1120",
                    path: naning
                },
                {
                    num: "20",
                    name: "柳州市",
                    area: "789",
                    path: guangxi
                },
                {
                    num: "42",
                    name: "桂林市",
                    area: "1021",
                    path: guangxi
                },
                {
                    num: "283",
                    name: "梧州市",
                    area: "9793",
                    path: guangxi
                },
                {
                    num: "19",
                    name: "北海市",
                    area: "1111",
                    path: guangxi
                },
                {
                    num: "25",
                    name: "防城港市",
                    area: "599",
                    path: guangxi
                },
                {
                    num: "36",
                    name: "钦州市",
                    area: "910",
                    path: guangxi
                },
                {
                    num: "18",
                    name: "贵港市",
                    area: "720",
                    path: guangxi
                },
                {
                    num: "27",
                    name: "玉林市",
                    area: "908",
                    path: guangxi
                },
                {
                    num: "36",
                    name: "百色市",
                    area: "901",
                    path: guangxi
                },
                {
                    num: "29",
                    name: "贺州市",
                    area: "888",
                    path: guangxi
                },
            ]
        };
    },
    computed: {
        isOpen() {
            return this.$store.state.app.sidebar.opened;
        }
    },
    mounted() {
        this.value1 = new Date()
        let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} "
                },
                // title: {
                //   text: "裸地面积"
                // },
                legend: {
                    x: "center",
                    y: "bottom",
                    data: [
                        "南宁市",
                        "柳州市",
                        "桂林市",
                        "梧州市",
                        "北海市",
                        "防城港市",
                        "钦州市",
                        "贵港市",
                        "玉林市",
                        "百色市",
                        "贺州市"
                    ]
                },
                series: [{
                        name: "裸地面积",
                        type: "pie",
                        selectedMode: "single",
                        radius: [0, "30%"],

                        label: {
                            normal: {
                                position: "center",
                                color: "#FFFFFF"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [{
                            value: 3006,
                            name: "裸地面积(平方公里)"
                        }]
                    },
                    {
                        name: "裸地面积(平方公里)",
                        type: "pie",
                        radius: ["40%", "58%"],
                        label: {
                            normal: {
                                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}   ",
                                backgroundColor: "#eee",
                                borderColor: "#aaa",
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: "#999",
                                        lineHeight: 20,
                                        align: "center"
                                    },

                                    hr: {
                                        borderColor: "#aaa",
                                        width: "100%",
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 20
                                    },
                                    per: {
                                        color: "#eee",
                                        backgroundColor: "#334455",
                                        padding: [1, 2],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        data: [{
                                value: 112,
                                name: "南宁市"
                            },
                            {
                                value: 389,
                                name: "柳州市"
                            },
                            {
                                value: 426,
                                name: "桂林市"
                            },
                            {
                                value: 102,
                                name: "梧州市"
                            },
                            {
                                value: 111,
                                name: "北海市"
                            },
                            {
                                value: 319,
                                name: "防城港市"
                            },
                            {
                                value: 210,
                                name: "钦州市"
                            },
                            {
                                value: 320,
                                name: "贵港市"
                            },
                            {
                                value: 408,
                                name: "玉林市"
                            },
                            {
                                value: 201,
                                name: "百色市"
                            },
                            {
                                value: 408,
                                name: "贺州市"
                            }
                        ]
                    }
                ]
            };
        this.initChart1(option);
        // this.initChart2();
    },
    watch: {
        isOpen() {
            var timer = null;
            let that = this;
            clearTimeout(timer);
            // 增加节流防止watch 观察太快  导致eachrt  不执行resize  方法
            timer = setTimeout(function () {
                that.myChart1.resize();
                // that.myChart2.resize();
            }, 300);
        }
    },
    beforeDestroy() {
        if (this.myChart) {
            this.myChart1 = null;
        }
    },
    methods: {
        selType(item) {
            if (item == '总面积') {
                let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} "
                },
                // title: {
                //   text: "裸地面积"
                // },
                legend: {
                    x: "center",
                    y: "bottom",
                    data: [
                        "南宁市",
                        "柳州市",
                        "桂林市",
                        "梧州市",
                        "北海市",
                        "防城港市",
                        "钦州市",
                        "贵港市",
                        "玉林市",
                        "百色市",
                        "贺州市"
                    ]
                },
                series: [{
                        name: "裸地面积",
                        type: "pie",
                        selectedMode: "single",
                        radius: [0, "30%"],

                        label: {
                            normal: {
                                position: "center",
                                color: "#FFFFFF"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [{
                            value: 3006,
                            name: "裸地面积(平方公里)"
                        }]
                    },
                    {
                        name: "裸地面积(平方公里)",
                        type: "pie",
                        radius: ["40%", "58%"],
                        label: {
                            normal: {
                                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}    ",
                                backgroundColor: "#eee",
                                borderColor: "#aaa",
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: "#999",
                                        lineHeight: 20,
                                        align: "center"
                                    },

                                    hr: {
                                        borderColor: "#aaa",
                                        width: "100%",
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 20
                                    },
                                    per: {
                                        color: "#eee",
                                        backgroundColor: "#334455",
                                        padding: [1, 2],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        data: [{
                                value: 112,
                                name: "南宁市"
                            },
                            {
                                value: 389,
                                name: "柳州市"
                            },
                            {
                                value: 426,
                                name: "桂林市"
                            },
                            {
                                value: 102,
                                name: "梧州市"
                            },
                            {
                                value: 111,
                                name: "北海市"
                            },
                            {
                                value: 319,
                                name: "防城港市"
                            },
                            {
                                value: 210,
                                name: "钦州市"
                            },
                            {
                                value: 320,
                                name: "贵港市"
                            },
                            {
                                value: 408,
                                name: "玉林市"
                            },
                            {
                                value: 201,
                                name: "百色市"
                            },
                            {
                                value: 408,
                                name: "贺州市"
                            }
                        ]
                    }
                ]
            };

             this.initChart1(option);
            } else {
                 let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // title: {
                //   text: "裸地面积"
                // },
                legend: {
                    x: "center",
                    y: "bottom",
                    data: [
                        "南宁市",
                        "柳州市",
                        "桂林市",
                        "梧州市",
                        "北海市",
                        "防城港市",
                        "钦州市",
                        "贵港市",
                        "玉林市",
                        "百色市",
                        "贺州市"
                    ]
                },
                series: [{
                        name: "裸地面积",
                        type: "pie",
                        selectedMode: "single",
                        radius: [0, "30%"],

                        label: {
                            normal: {
                                position: "center",
                                color: "#FFFFFF"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [{
                            value: 3006,
                            name: "裸地面积(平方公里)"
                        }]
                    },
                    {
                        name: "裸地面积(平方公里)",
                        type: "pie",
                        radius: ["40%", "58%"],
                        label: {
                            normal: {
                                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                                backgroundColor: "#eee",
                                borderColor: "#aaa",
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: "#999",
                                        lineHeight: 20,
                                        align: "center"
                                    },

                                    hr: {
                                        borderColor: "#aaa",
                                        width: "100%",
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 20
                                    },
                                    per: {
                                        color: "#eee",
                                        backgroundColor: "#334455",
                                        padding: [1, 2],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        data: [{
                                value: 112,
                                name: "南宁市"
                            },
                            {
                                value: 389,
                                name: "柳州市"
                            },
                            {
                                value: 426,
                                name: "桂林市"
                            },
                            {
                                value: 102,
                                name: "梧州市"
                            },
                            {
                                value: 111,
                                name: "北海市"
                            },
                            {
                                value: 319,
                                name: "防城港市"
                            },
                            {
                                value: 210,
                                name: "钦州市"
                            },
                            {
                                value: 320,
                                name: "贵港市"
                            },
                            {
                                value: 408,
                                name: "玉林市"
                            },
                            {
                                value: 201,
                                name: "百色市"
                            },
                            {
                                value: 408,
                                name: "贺州市"
                            }
                        ]
                    }
                ]
            };
             this.initChart1(option);
            }
        },
        downLoad(row) {
            var link = document.createElement("a");
            link.setAttribute("download", "");
            link.href = row.path;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        },

        initChart1( options) {
            this.myChart1 = echarts.init(document.getElementById("main1"));
            
            let that = this;
            this.myChart1.setOption(options);
            window.onresize = function () {
                that.myChart1.resize();
            };
        },
        initChart2() {
            this.myChart2 = echarts.init(document.getElementById("main2"));
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "line" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ["秸秆焚烧", "异常热源点", "森林火", "工矿火"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [{
                    type: "category",
                    data: [
                        "2019-6-8",
                        "2019-6-9",
                        "2019-6-10",
                        "2019-6-11",
                        "2019-6-12"
                    ]
                }],
                yAxis: [{
                    type: "value"
                }],
                series: [{
                        name: "秸秆焚烧",
                        type: "bar",
                        stack: "数量",
                        label: {
                            normal: {
                                show: true,
                                position: "insideTop"
                            }
                        },
                        barMaxWidth: 30,
                        data: [1, 1, 1, 1, 2]
                    },
                    {
                        name: "异常热源点",
                        type: "bar",
                        stack: "数量",
                        label: {
                            normal: {
                                show: true,
                                position: "insideTop"
                            }
                        },
                        barMaxWidth: 30,
                        data: [1, 1, 1, 1, 1]
                    },
                    {
                        name: "森林火",
                        type: "bar",
                        stack: "数量",
                        label: {
                            normal: {
                                show: true,
                                position: "insideTop"
                            }
                        },
                        barMaxWidth: 30,
                        data: [1, 1, 2, 1, 1]
                    },
                    {
                        name: "工矿火",
                        type: "bar",
                        stack: "数量",
                        label: {
                            normal: {
                                show: true,
                                position: "insideTop"
                            }
                        },
                        barMaxWidth: 30,
                        data: [2, 1, 1, 1, 1]
                    }
                ]
            };
            let that = this;
            this.myChart2.setOption(option);
            window.onresize = function () {
                that.myChart2.resize();
            };
        }
    }
};
</script>

<style lang="scss">
.analysisBareland {
    // 地区对比
    padding: 10px 30px 30px 25px !important;

    .el-scrollbar {
        height: 100%;
    }

    .scrollbar-wrapper {
        overflow-x: hidden !important;

        .el-scrollbar__view {
            height: 100%;
        }
    }

    .el-scrollbar__bar.is-vertical {
        right: 0px;
    }

    #main1 {
        height: 70vh;
        width: 100%;
    }

    .el-input__inner {
        background-color: rgb(232, 235, 241) !important;
    }

    .el-table td {
        background: rgb(233, 236, 242);
        border-bottom: 0.5px solid #ccc;
        text-align: center;
    }

    .el-table th {
        background: rgb(233, 236, 242);
        border-bottom: 1px solid rgb(51, 51, 51);
        text-align: center;
    }

    .timeOpt {
        height: 30px;
        line-height: 30px;
        margin: 20px 10px;
    }

    .titleBread {
        height: 30px;
        line-height: 30px;
        border-left: 5px solid rgb(19, 111, 205);
        padding-left: 10px;
        margin-bottom: 15px;

        //margin: 30px 0 30px 30px;
        .el-breadcrumb {
            line-height: 30px;
        }

        .el-breadcrumb__inner {
            color: #000;
        }

        .titleshow {
            font-size: 20px;

            .el-breadcrumb__inner {
                font-weight: bold !important;
            }
        }

        .product {
            .el-breadcrumb__inner {
                color: #999
            }
        }
    }
}
</style>
