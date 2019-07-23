<template>
  <div class="reportShow">
    <!-- 头部标题部分 -->
    <div class="titleBread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="titleshow">报告展示</el-breadcrumb-item>

      </el-breadcrumb>
    </div>

    <!--  中间部分 -->
    <div class="content">
      <el-col type="flex" justify="space-between">

        <el-col :span="24">
          <div class="rightConent">
            <div class="timeOpt">
              <div>
                <span>开始时间：</span>
                <el-date-picker v-model="startTime" type="date" placeholder="选择开始日期" size="mini"></el-date-picker>
              </div>
              <div>
                <span>结束时间：</span>
                <el-date-picker type="date" placeholder="选择结束日期" size="mini" v-model="endTime"></el-date-picker>
              </div>
              <div>
                  <span>报告类型：</span>
                <el-select v-model="value" placeholder="请选择"  @change="dataChange">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                            </el-select>
              </div>
              <div>
                 <el-select v-model="value" placeholder="请选择"  @change="dataChange">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                            </el-select>
              </div>

            </div>

            <div class="mian">
              <el-table :data="tableData" style="width: 100%" size="small">
                   <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="报告名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="date" label="时间" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
                  <template>
                       <el-button
                      type="text"
                      style="color:#000;"
                      size="mini"
                      @click="see()"
                    >查看</el-button>
                    <el-button
                      type="text"
                      style="color:#000;"
                      size="mini"
                      @click=" singDownLoad()"
                    >下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
                <div class="foot">
                    <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
                </div>
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>
<script>

import pdf from "../../assets/word/tianqi.pdf";

export default {
  data() {
    return {
      isPlay: false, //是否进行播放

      currImgIndex: 0, // 当前定时器循环图片的额数组
      timner: null,
      startTime: "",
      endTime: "",

      options: [
        {
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
      tableData: [


      ],
       tableData1: [
        {
          date: "2019年4月25日",
          name: " 秸秆燃烧火点日报"
        },
        {
          date: "2019年4月24日",
          name: " 秸秆燃烧火点日报"
        },
        {
          date: "2019年4月23日",
           name: " 秸秆燃烧火点日报"
        },
        {
          date: "2019年4月22日",
        name: " 秸秆燃烧火点日报"
        },
        {
          date:"2019年4月21日",
         name: " 秸秆燃烧火点日报"
        },
        {
          date: "2019年4月20日",
         name: " 秸秆燃烧火点日报"
        },
        {
          date:"2019年4月19日",
         name: " 秸秆燃烧火点日报"
        },
        {
          date: "2019年4月18日",
         name: " 秸秆燃烧火点日报"
        },
        {
          date: "2019年4月17日",
         name: " 秸秆燃烧火点日报"
        },
        {
          date:"2019年4月16日",
         name: " 秸秆燃烧火点日报"
        },

      ],
       tableData2: [
      {
          date: "2019年4月25日",
          name: " 空气质量遥感监测日报"
        },
        {
          date: "2019年4月24日",
          name: " 空气质量遥感监测日报"
        },
        {
          date: "2019年4月23日",
           name: " 空气质量遥感监测日报"
        },
        {
          date: "2019年4月22日",
        name: " 空气质量遥感监测日报"
        },
        {
          date:"2019年4月21日",
         name: " 空气质量遥感监测日报"
        },
        {
          date: "2019年4月20日",
         name: " 空气质量遥感监测日报"
        },
        {
          date:"2019年4月19日",
         name: " 空气质量遥感监测日报"
        },
        {
          date: "2019年4月18日",
         name: " 空气质量遥感监测日报"
        },
        {
          date: "2019年4月17日",
         name: " 空气质量遥感监测日报"
        },
        {
          date:"2019年4月16日",
         name: " 空气质量遥感监测日报"
        },

      ]
    };
  },
  computed: {

  },
  methods: {


    // 表格单个下载
    opendata(){
        this.tableData=this.tableData2
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
    window.open(pdf," _blank")
    },
    dataChange(value){
        if(value=='空气质量遥感监测日报'){
              this.tableData=this.tableData2
        }else{
          this.tableData=this.tableData1
        }


    }
  },
  mounted(){
    this.opendata()
  }
};
</script>
<style lang="scss" >
.reportShow {
  width: 100%;
  height: 100%;
  padding: 10px 30px 30px 25px!important;
   .content{
      height: 85vh;
      overflow-y: auto;
    }
  .el-select-dropdown__item {
    border-top: 0;
    border-bottom: 0;
  }
  // .el-input--mini .el-input__inner {
  //   width: 150px;
  // }
  .el-input__inner  {
                background-color:rgb(232,235,241) !important;

                height: 28px;
                line-height: 28px;
  }
 .el-table td {
        background:  rgb(233,236,242);
         border-bottom:  0.5px solid #ccc
  }
   .el-table th {
          background: rgb(233,236,242);
       border-bottom:  1px solid rgb(51,51,51);
   }

  padding: 30px;

  .timeOpt {
    margin-bottom: 10px;
      .el-select__caret {
      height: 28px;
      line-height: 28px;
    }
    .el-input__inner{

      font-size: 13px;
    }

    div {
      display: inline-block;
      width: 23%;

      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
       &:nth-of-type(3){
        width: 35%;
      }
      span {
        font-size: 13px;
        color: #999;
      }
    }
    div:last-of-type {
       width: 15%;
    }
  }
  .imgContainer {
    width: 100%;
    height: 550px;
    background: #fff;
    box-shadow: darkgrey 2px 2px 30px 5px;
    margin-bottom: 15px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    max-width: 550px;
    img {
      width: 100%;
      height: 500px;
    }
    .opt {
      height: 50px;
      width: 100%;
      background: rgb(51, 51, 51);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      position: absolute;
      bottom: 0;
      text-align: center;
      i {
        color: #fff;
        display: inline-block;
        line-height: 50px;
        font-size: 30px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
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
  }
  .foot{
    width: 30%;
     margin: 20px 0 30px 28%;
     .number{
         font-size: 14px;
         color: #989898;
        background-color: rgb(233,236,242);
     }
     .active{
         color: #333;
          font-size: 14px;
     }
       .el-pagination .btn-next, .el-pagination .btn-prev{
      background-color: rgb(233,236,242);
    }
     .el-pager li{
       background-color: rgb(233,236,242);
     }

  }
  .has-gutter{
      color: #999;
      height: 40px;
      line-height: 40px;
  }
  .el-table__row{
      color: #666;
      height: 48px;
      line-height: 48px;
  }
}
 .titleshow{

     font-size:20px;

     .el-breadcrumb__inner{
  font-weight:bold!important
     }
    }

    .content::-webkit-scrollbar {
            display: none;
        }
</style>
