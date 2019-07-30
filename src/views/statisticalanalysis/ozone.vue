<template>
  <div class="analysispmOzone">
    <!-- 头部标题部分 -->
    <div class="titleBread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="titleshow product">统计分析</el-breadcrumb-item>
        <el-breadcrumb-item class="titleshow">臭氧</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容区域
    -->
    <div class="content">
      <div class="timeContrast">
        <div class="region">
          <div class="regionlable">地区</div>
          <div class="reginCheckBox">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>

            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
              style="display:inline-block"
            >
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <div class="content">
          <div class="timeOpt">
            <el-form :inline="true" class="demo-form-inline" size="mini">
              <el-form-item label="开始时间：">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：">
                <el-date-picker type="date" v-model="value2" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-form>
          </div>

          <div class="chart1" id="main1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

const cityOptions = [
  "南宁市",
  "柳州市",
  "来宾市",
  "梧州市",
  "桂林市",
  "贺州市",
  "贵港市",
  "河池市",
  "钦州市",
  "崇左市",
  "北海市",
  "玉林市",
  "百色市",
  "防城港市"
];
export default {
  data() {
    return {
      activeName: "first",
      checkAll: false,
      checkedCities: [
        "南宁市","柳州市","桂林市",
      ],
      cities: cityOptions,
      isIndeterminate: true,
      regionoptions: [
        {
          value: "选项1",
          label: "pm2.5"
        },
        {
          value: "选项2",
          label: "pm10"
        },
        {
          value: "选项3",
          label: "臭氧"
        }
      ],
      regionvalue: "",

      options: [
        {
          value: "选项1",
          label: "pm2.5"
        },
        {
          value: "选项2",
          label: "pm10"
        },
        {
          value: "选项3",
          label: "臭氧"
        }
      ],

      timevalue: "",

      timeoptions: [
        {
          value: "选项1",
          label: "地面数据"
        },
        {
          value: "选项2",
          label: "遥感数据"
        }
      ],
      value: "",
      value1: "",
      value2: "",

      myChart1: null
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
      }, 300);
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart1 = null;
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    initChart2() {
      this.myChart1 = echarts.init(document.getElementById("main1"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {},
        legend: {
          data: ["南宁市", "柳州市", "桂林市"],
          x: "60%", // 'center' | 'left' | {number},
          y: "top" //
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2019-6-5",
              "2019-6-6",
              "2019-6-7",
              "2019-6-8",
              "2019-6-9",
              "2019-6-10",
              "2019-6-11",
              "2019-6-12"
            ],
            axisLabel:{
    		       interval: 0
    	      },
            name: "日期"
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "O3(mg/m3)",
            axisLine: {
              //y轴样式
              show: true,
              lineStyle: {
                color: "#000",
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        series: [
          {
            name: "南宁市",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#999"
              }
            },
            symbol: "circle", //折线点设置为实心点
            symbolSize: 2, //折线点的大小
            itemStyle: {
              normal: {
                color: "#F3764A",
                barBorderRadius: 4
              }
            },
            type: "line",
            data: [200, 49, 70, 232, 256, 767, 1356, 1622]
          },
          {
            name: "柳州市",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 2, //折线点的大小
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#999"
              }
            },

            itemStyle: {
              normal: {
                color: "#136FCD",
                barBorderRadius: 4
              }
            },
            type: "line",
            data: [260, 590, 900, 264, 287, 707, 1756, 1822]
          },
          {
            name: "桂林市",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 2, //折线点的大小
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#999"
              }
            },

            itemStyle: {
              normal: {
                color: "#13CD73",
                barBorderRadius: 4
              }
            },
            type: "line",
            data: [400, 510, 1000, 2640, 230, 507, 156, 822]
          }
        ]
      };
      let that = this;
      this.myChart1.setOption(option);
      window.onresize = function() {
        that.myChart1.resize();
      };
    }
  }
};
</script>
<style lang="scss">
.analysispmOzone {
    padding: 10px 30px 30px 25px!important;
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000;
  }
  .el-input__inner {
    background-color: #e8ebf1 !important;
}
// .el-checkbox__inner  {
//     background-color: #e8ebf1 !important;
    
// }
//   // 地区对比
  .regionContrast {
    .region {
      height: 60px;
           line-height: 60px;
      border-top: 1px solid rgb(230, 230, 230);
      border-bottom: 1px solid rgb(230, 230, 230);
      position: relative;
      overflow: hidden;
      .regionlable {
        display: inline-block;
        width: 6%;
        max-width: 120px;
        height: 60px;
        line-height: 60px;
        background: rgb(230, 230, 230);
        font-size: 13px;
        margin-top: -2px;
        border: none;
        padding: 0;
        margin: 0;
        text-align: center;
      }
      .reginCheckBox {
        height: 100%;
        right: 0;
        width: 94%;
        top: 0;
        line-height: 25px;
        position: absolute;
       display: flex;
        justify-content: flex-start;
        .el-checkbox {
          margin: 0 10px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          border-color: none;
        }
      }
    }
    .chart {
      width: 100%;

      height: calc(100vh - 250px);
    }
    .timeOpt {
      height: 30px;
      line-height: 30px;
      margin: 30px 10px;
    }
  }
  // 时间对比
  .timeContrast {
    .region {
      height: 60px;
      line-height: 60px;
      border-top: 1px solid rgb(230, 230, 230);
      border-bottom: 1px solid rgb(230, 230, 230);
      position: relative;
      overflow: hidden;
      .regionlable {
        display: inline-block;
        width: 6%;
        max-width: 120px;
        height: 60px;
        line-height: 60px;
        background: rgb(230, 230, 230);
        font-size: 13px;
        margin-top: -2px;
        border: none;
        padding: 0;
        margin: 0;
        text-align: center;
      }
      .reginCheckBox {
        height: 100%;
        right: 0;
        width: 94%;
        top: 0;
        line-height: 25px;
        position: absolute;
       display: flex;
       justify-content: flex-start;
       .el-checkbox {
          margin: 0 10px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          border-color: none;
        }
      }
    }
    .chart1 {
      width: 100%;

      height: calc(100vh - 290px);
    }
    .timeOpt {
      height: 30px;
      line-height: 30px;
      margin: 30px 10px;
    }
  }

  width: 100%;
  height: 100%;

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
  .content {
    .el-tabs__nav-wrap::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: rgb(236, 239, 244);
      z-index: 1;
    }
    .el-tabs__item.is-active {
      color: #000;
      font-size: 13.5px;
    }
    .el-tabs__active-bar {
      background-color: rgb(19, 111, 205);
    }
    .el-tabs__item {
      color: rgb(199, 202, 204);
      font-size: 13px;
    }
    .el-tabs__nav-scroll {
      padding: 0 20px;
    }
    .el-tabs__content {
      margin: 10px;
    }
  }
}
</style>