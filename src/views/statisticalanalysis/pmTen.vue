<template>
  <div class="analysispmTwo">
    <!-- 头部标题部分 -->
    <div class="titleBread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="titleshow product">统计分析</el-breadcrumb-item>
        <el-breadcrumb-item class="titleshow">PM10</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容区域
    -->
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="地区对比" name="first">
          <div class="regionContrast">
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
                  <el-form-item>
                  

                  </el-form-item>
                </el-form>
              </div>

              <div class="chart" id="main"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="时间对比" name="second">
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
                  v-model="checkedCities1"
                  @change="handleCheckedCitiesChange"
                  style="display:inline-block"
                >
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div class="region">
              <div class="regionlable1">类型</div>
              <div class="reginCheckBox1">
                <el-checkbox
                  v-for="(item,index)  in   timeoptions"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                  :checked='index==1?true:false'
                  @change="typeData(item.label)"
                  v-model="checkedData"
                >{{item.label}}</el-checkbox>
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
        </el-tab-pane>
      </el-tabs>
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
      checkAll: true,
      checkedCities: [ "南宁市",
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
      "防城港市"],
      checkedCities1:["南宁市","柳州市","桂林市",],

      cities: cityOptions,
      isIndeterminate: false,
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
          value: "1",
          label: "地面数据"
        },
        {
          value: "2",
          label: "遥感数据"
        }
      ],
      value: "",
      value1: "",
      value2: "",
      myChart: null, //   echart  实例化
      myChart1: null,
      echartsData:[200, 49, 70, 232, 256, 121, 77, 132,121,111,134,200,300,312],
      echartsData1:[200, 49, 70, 232, 256, 222, 99, 128,121,222,333,123,321,232],
   seriesList:[
          {
            name: "南宁市遥感数据",
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
            data:  [260, 121, 300, 77, 50, 99, 157, 222]
          },
          {
            name: "柳州市遥感数据",
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
            data: [60 ,342, 77, 195, 57 ,223, 123, 338]
          },
          {
            name: "桂林市遥感数据",
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
            data: [222, 111, 333, 123, 321, 121, 212, 131]
          }
        ],
    seriesList1: [
          {
            name: "南宁市地面数据",
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
                barBorderRadius: 4,
           
              }
            },
            type: "line",
            data:  [30, 50, 121, 222, 232,147, 258, 369]
          },
          {
            name: "柳州市地面数据",
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
            data: [260, 121, 300, 264, 287, 99, 111, 222]
          },
          {
            name: "桂林市地面数据",
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
            data: [274 ,154, 77 ,105, 141, 317, 98]
          }
        ],
          yangan:["南宁市遥感数据", "柳州市遥感数据", "桂林市遥感数据"],
          dimian:["南宁市地面数据", "柳州市地面数据", "桂林市地面数据"],
          checkedData:[]
    }
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
    this.dataShow();
     this.initChart2(this.seriesList)
  },
  watch: {
    isOpen() {
      var timer = null;
      let that = this;
      clearTimeout(timer);
      // 增加节流防止watch 观察太快  导致eachrt  不执行resize  方法
      timer = setTimeout(function() {
        that.myChart.resize();
        that.myChart1.resize();
      }, 300);
    },
    activeName() {
      var timer = null;
      let that = this;
      clearTimeout(timer);
      // 增加节流防止watch 观察太快  导致eachrt  不执行resize  方法
      timer = setTimeout(function() {
        that.myChart.resize();
        that.myChart1.resize();
      }, 100);
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart = null;
    }
  },
  methods: {
    dataShow(){
        var data=this.echartsData
        var data1=this.echartsData1
        this.initChart(data,data1)
        this.initChart2(data1)
    },
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
    initChart(data,data1) {
      this.myChart = echarts.init(document.getElementById("main"));
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
          data: ["遥感数据", "地理数据"],
          x: "80%", // 'center' | 'left' | {number},
          y: "top" //
        },
        xAxis: [
          {
            type: "category",
            data: cityOptions,
            name: "城市",
            axisLabel:{
    		       interval: 0
    	      },
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "PM10(mg/m3)",
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
            name: "遥感数据",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#999"
              }
            },
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                color: "#F3764A",
                barBorderRadius: 4
              }
            },
            type: "bar",
            data: data
          },
          {
            name: "地理数据",
            barMaxWidth: 20,
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
            type: "bar",
            data: data1
          }
        ]
      };
      let that = this;
      this.myChart.setOption(option);
      window.onresize = function() {
        that.myChart.resize();
      };
    },
    initChart2(data,data1) {
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
          data: data1,
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
            name: "城市"
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "PM10(mg/m3)",
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
        series:data
      };
      let that = this;
      this.myChart1.clear();
      this.myChart1.setOption(option);
      window.onresize = function() {
        that.myChart1.resize();
      };
    },
    typeData(val){
      console.log(this.checkedData);
         
      if(this.checkedData.length==1){
      
          if(this.checkedData[0]=='遥感数据'){
            var series=this.seriesList
            this.initChart2(series,this.yangan)
          }else{
            var series=this.seriesList1
            this.initChart2(series,this.dimian)
          }
      }else if(this.checkedData.length==2){
          var arr=this.yangan.concat(this.dimian)
          var series=this.seriesList.concat(this.seriesList1)
          this.initChart2(series,arr) 
      }else{
         var series=[]
         var arr=[]
        this.initChart2(series,arr)
      }
   
      // if(val=='遥感数据'){
      //  var series=this.seriesList
      //  this.initChart2(series,this.yangan)
      // }else{
      //   var series=this.seriesList1
      //   this.initChart2(series,this.dimian)
      // }
      
      
    }
  }
};
</script>
<style lang="scss">
.analysispmTwo {
    padding: 10px 30px 30px 25px!important;
    .el-checkbox{
      margin-right: 0!important;
    }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000;
  }
   .el-input__inner {
    background-color: #e8ebf1 !important;
}
  // 地区对比
  .regionContrast {
    .region {
      height: 60px;
      line-height:60px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
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
        margin-top: -3px;
        border: none;
        padding: 0;

        text-align: center;
          &:nth-of-type(2){
          border: none;
      }
      }
      .reginCheckBox {
        height: 100%;
        right: 0;
        width: 94%;
        top: 0;
        line-height: 25px;
        position: absolute;
        display: flex;
        justify-content:flex-start;
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

      height: calc(100vh - 350px);
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
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      position: relative;
      overflow: hidden;
      &:nth-of-type(2){
          border: none;
      }
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
       .regionlable1 {
        display: inline-block;
        width: 6%;
        max-width: 120px;
        height: 30px;
        line-height: 30px;
        background: rgb(230, 230, 230);
        font-size: 13px;
        margin-top: -2px;
        border: none;
        padding: 0;
        margin: 0;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      .reginCheckBox {
        height: 100%;
        right: 0;
        width: 94%;
        top: 0;
        line-height: 25px;
        position: absolute;
        display: flex;
        justify-content:flex-start; 
        .el-checkbox {
          margin: 0 10px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          border-color: none;
        }
      }
       .reginCheckBox1 {
         border-bottom: 1px solid #cccccc;
        height: 30px;
        right: 0;
        width: 94%;
        top: 0;
        line-height: 25px;
        position: absolute;
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

      height: calc(100vh - 350px);
    }
    .timeOpt {
      height: 30px;
      line-height: 30px;
      margin: 10px;
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
      font-size: 14px;
    }
    .el-tabs__active-bar {
      background-color: rgb(19, 111, 205);
    }
    .el-tabs__item {
      color: rgb(199, 202, 204);
      font-size: 13.5px;
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