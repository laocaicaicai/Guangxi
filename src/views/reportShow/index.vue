<template>
<div class="reportShow">
    <!-- 头部标题部分 -->
    <div class="titleBread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="titleshow">报告展示</el-breadcrumb-item>

        </el-breadcrumb>
    </div>

    <div>
        <el-form :inline="true" size="mini">
            <el-form-item label="开始时间:">
                <el-date-picker v-model="startTime" type="date" placeholder="选择开始日期"  size="mini"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
                <el-date-picker type="date" placeholder="选择结束日期" size="mini" v-model="endTime" ></el-date-picker>
            </el-form-item>
            <el-form-item label=" 报告类型：">
                <el-select v-model="value" placeholder="请选择" @change="dateSel()">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="value1" placeholder="请选择" @change="typeSel()">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>

    <div class="mian">
        <el-table :data="tableData" style="width: 100%" size="small">
            <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="报告名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="date" label="时间" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
                <template>
                    <el-button type="text" style="color:#000;" size="mini" @click="see()">查看</el-button>
                    <el-button type="text" style="color:#000;" size="mini" @click=" singDownLoad()">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="foot">
        <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
    </div>

</div>
</template>

<script>
import pdf from "../../assets/word/tianqi.pdf";
export default {
    computed: {},
    mounted() {},
    data() {
        return {
            startTime: "",
            endTime: "",
            defalutEnd:"",
            options: [{
                    value: "年报",
                    label: "年报"
                },
                {
                    value: "季报",
                    label: "季报"
                },
                {
                    value: "月报",
                    label: "月报"
                },
                {
                    value: "周报",
                    label: "周报"
                },
                {
                    value: "日报",
                    label: "日报"
                },
            ],
            value: "",
            options1: [],
            value1: "PM2.5反演产品年报",
            tableData: [{
                    date: "2019年4月25日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月24日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月23日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月22日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月21日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月20日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月19日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月18日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月17日",
                    name: " PM2.5反演产品年报"
                },
                {
                    date: "2019年4月16日",
                    name: " PM2.5反演产品年报"
                },
            ]
        }
    },
    computed: {

    },
    watch: {
        value() {

            let arr = []

            arr = [{
                    value: "PM2.5反演产品" + this.value,
                    label: "PM2.5反演产品" + this.value
                }, {
                    value: "PM10反演产品" + this.value,
                    label: "PM10反演产品" + this.value
                },
                {
                    value: "大气污染热点产品" + this.value,
                    label: "大气污染热点产品" + this.value
                },
                {
                    value: "秸秆焚烧产品" + this.value,
                    label: "秸秆焚烧产品" + this.value
                }, {

                    value: "臭氧反演产品" + this.value,
                    label: "臭氧反演产品" + this.value
                }

            ]

            this.options1 = arr
            // alert(0)
        }
    },
    mounted() {
        this.value = '年报'
        //结束时间
        this.endTime = new Date(); 
        // 开始时间
       var seconds=  (new Date()).getTime() - 7*24*3600*1000;
       var oldTime  =  new Date(seconds)
       this.startTime = oldTime

    },
    methods: {
        typeSel() {
            let arr = this.tableData
            for (var i = 0; i < arr.length; i++) {
                arr[i].name = this.value1
            }
        },
        dateSel() {
            this.value1 = ''
        },
        singDownLoad() {
            var link = document.createElement("a");
            link.setAttribute("download", "");
            link.href = pdf;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        },
        see() {
            window.open(pdf, " _blank")
        },

    }
}
</script>

<style lang="scss">
.reportShow {
    width: 100%;
    height: 100%;
    padding: 10px 30px 30px 25px !important;

    li {
        border-top: none !important;
    }

    .foot {
        text-align: right;
        padding: 30px;

        .el-pager li {
            background-color: rgb(232, 235, 241) !important;
        }

        .el-pagination .btn-next,
        .el-pagination .btn-prev {
            background-color: rgb(232, 235, 241) !important;
        }
    }

    .content {
        height: 85vh;
        overflow-y: auto;
    }

    .el-input__inner {
        background-color: rgb(232, 235, 241) !important;

        height: 28px;
        line-height: 28px;
    }

    .el-table th,
    .el-table tr {
        background-color: #e9ecf2;
    }

    .titleBread {
        height: 30px;
        line-height: 30px;
        border-left: 5px solid rgb(19, 111, 205);
        padding-left: 10px;
        margin-bottom: 15px; font-weight:bold;


        .el-breadcrumb {
            line-height: 30px;
            font-size: 20px;
          
        }

        .el-breadcrumb__inner {
            color: #000;
              font-weight:bold;
        }
    }
}
</style>
