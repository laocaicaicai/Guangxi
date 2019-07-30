<template>
  <div class="analysisFireProducts">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <!-- 头部标题部分 -->
    <div class="titleBread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="titleshow product">统计分析</el-breadcrumb-item>
        <el-breadcrumb-item class="titleshow">火点产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容区域
    -->
    <div class="content" >
      <div class="timeOpt">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <el-form-item label="开始时间：">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker type="date" v-model="value2" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
         <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="13">
              <div class="left1"> 
                  <div id="main1"></div>
                  <div>
                     <el-table :data="tableData" style="width: 100%" size="mini">
                  <el-table-column prop="name" label="地区"></el-table-column>
                  <el-table-column prop="num" label="数量"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <div style="cursor:pointer" @click="downLoad(scope.row)">下载</div>
                    </template>
                  </el-table-column>
                </el-table>
                  </div>
                  
              </div>
            </el-col>
            <el-col :span="10">
                 <div class="left2"> 
                     <div id="main2"></div>
                      <div>
                     <el-table :data="tableData1" style="width: 100%" size="mini">
                  <el-table-column prop="name" label="地区"></el-table-column>
                  <el-table-column prop="num" label="数量"></el-table-column>
                  <el-table-column label="操作">
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
import guangxi from "@/assets/word/fireProduct/guangxi.xlsx";
import naning from "../../assets/word/fireProduct/naning.xlsx";
import xingning from "../../assets/word/fireProduct/xingning.xlsx";
export default {
  data() {
    return {
      options: [
        {
          value: "广西壮族自治区",
          label: "广西壮族自治区"
        },
        {
          value: "南宁市",
          label: "南宁市"
        },
        {
          value: "桂林市",
          label: "桂林市"
        },
        {
          value: "北海市",
          label: "北海市"
        }
      ],
      value: "广西壮族自治区",

      value1: "",
      value2: "",

      myChart1: null,
      myChart2: null,
      tableData: [
        {
          num: "283",
          name: "广西壮族自治区",
          path: guangxi
        },
        {
          num: "35",
          name: "南宁市",
          path: naning
        },
        {
          num: "30",
          name: "柳州市",
          path: xingning
        },
         {
          num: "34",
          name: "桂林市",
          path: naning
        },
         {
          num: "35",
          name: "梧州市",
          path: naning
        },
      ],
       tableData1: [
     
       
        {
          num: "2",
          name: "兴宁区",
          path: xingning
        },
         {
          num: "5",
          name: "江南区",
          path: naning
        },
         {
          num: "4",
          name: "青秀区",
          path: naning
        },
          {
          num: "8",
          name: "西乡塘区",
          path: naning
        },
          {
          num: "5",
          name: "邕宁区",
          path: naning
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
    //结束时间
        this.value2= new Date(); 
        // 开始时间
       var seconds=  (new Date()).getTime() - 7*24*3600*1000;
       var oldTime  =  new Date(seconds)
        this.value1 = oldTime
    this.initChart1();
    this.initChart2();
  },
  watch: {
    isOpen() {
      var timer = null;
      let that = this;
      clearTimeout(timer);
      // 增加节流防止watch 观察太快  导致eachrt  不执行resize  方法
      timer = setTimeout(function() {
        that.myChart1.resize();
        that.myChart2.resize();
      }, 300);
    }
  },
  beforeDestroy() {
    if (this.myChart) {
       this.myChart1 = null;
    }
  },
  methods: {
    downLoad(row) {
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = row.path;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    },

    initChart1() {
      this.myChart1 = echarts.init(document.getElementById("main1"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
          text: "全区火点统计图"
        },

        legend: {
          //orient: "vertical",
          x: 'center',
          y:'bottom',
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
            "贺州市",
            "河池市",
            "来宾市",
            "崇左市"
          ]
        },
        series: [
          {
            name: "火点数量",
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
            data: [{ value: 254, name: "共计254个热点网格" }]
          },
          {
            name: "火点数量",
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
            data: [
              { value: 31, name: "南宁市" },
              { value: 10, name: "柳州市" },
              { value: 34, name: "桂林市" },
              { value: 10, name: "梧州市" },
              { value: 10, name: "北海市" },
              { value: 31, name: "防城港市" },
              { value: 10, name: "钦州市" },
              { value: 34, name: "贵港市" },
              { value: 10, name: "玉林市" },
              { value: 10, name: "百色市" },
              { value: 31, name: "贺州市" },
              { value: 10, name: "河池市" },
              { value: 34, name: "来宾市" },
              { value: 10, name: "崇左市" }
            ]
          }
        ]
      };
      let that = this;
      this.myChart1.setOption(option);
      window.onresize = function() {
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
         title: {
          text: "南宁市火点统计图"
        },
        legend: {
             //orient: "vertical",
          x: "center",
          y:"bottom",
          data: ["秸秆焚烧", "异常热源点", "森林火", "工矿火"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "7%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2019-6-8",
              "2019-6-9",
              "2019-6-10",
              "2019-6-11",
              "2019-6-12"
            ],
            axisLabel:{
    		       interval: 0
    	      },
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
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
      window.onresize = function() {
        that.myChart2.resize();
      };
    }
  }
};
</script>
<style lang="scss">
.analysisFireProducts {
    padding: 10px 30px 30px 25px!important;
  .left1 {
   
    height: 95vh;
    width:100%;
  }
  .left2 {
 
    height: 95vh;
    width:100%;
  }
  // 地区对比
  padding-bottom: 50px;
  height: 100vh;
.el-input__inner  {
                background-color:rgb(232,235,241) !important;
  }
 .el-table td {
        background:  rgb(233,236,242);
         border-bottom:  0.5px solid #ccc
  }
   .el-table th {
          background: rgb(233,236,242);
       border-bottom:  1px solid rgb(51,51,51);
   }
   .main{
     height: 75vh;
     overflow-y: auto;
    
   }
   .main::-webkit-scrollbar {
            display: none;
        }
  
  #main1 {
    height: 60vh;
    width: 100%;
  }
  #main2 {
    height: 60vh;
    width: 100%;
  }
  #table1 {
    width: 100%;
    padding-bottom: 30px;
    .el-table td {
      background: #f1f4f6;
    }
    .el-table th {
      background: #f1f4f6;
    }
  }
  .chart {
    width: 100%;
    height: calc(100vh - 100px);
  }
  .chart1 {
    width: 100%;
    background: rgb(241, 244, 246);
    box-shadow: darkgrey 2px 2px 3px 1px;
    border-radius: 10px;
    height: calc(100vh - 100px);
    padding: 30px 20px;
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
    
    .el-breadcrumb {
      line-height: 30px;
    }

    .el-breadcrumb__inner {
      color: #000;
    }
    .titleshow{
        font-size: 20px;
        .el-breadcrumb__inner{
           font-weight: bold!important;
        }
      } 
    .product{
        .el-breadcrumb__inner{
          color: #999
        }
    }
  }
}
</style>