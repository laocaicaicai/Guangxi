<template>
  <div class="pmTwo">
    <!-- 头部标题部分 -->
    <div class="titleBread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item  class="titleshow product">专题产品</el-breadcrumb-item>
        <el-breadcrumb-item  class="titleshow">卫星云图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--  中间部分 -->
    <div class="content">
      <el-row type="flex" justify="space-between">
        <el-col :span="13">
          <div class="imgContainer">
            <img :src="currentImg" alt />
            <div class="opt">
              <i class="el-icon-caret-left" @click="play('prevPlay')"></i>
              <i :class="palyIcon" @click="play('play')"></i>
              <i class="el-icon-caret-right" @click="play('nextPlay')"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
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
                <el-button type="primary" size="mini">
                  <i class="el-icon-download" style="color:#fff"></i>
                  <span style="color:#fff" @click="downLoadGif()">下载</span>
                </el-button>
              </div>
            </div>

            <div class="mian">
              <el-table :data="tableData" style="width: 100%" size="small">
                <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="date" label="时间" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip width="100">
                  <template>
                    <el-button
                      type="text"
                      style="color:#000;"
                      size="mini"
                      @click="singDownLoad()"
                    >下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import img1 from "../../assets/img/ZCT/201907100800ZCT.png";
import img2 from "../../assets/img/ZCT/201907100900ZCT.png";
import img3 from "../../assets/img/ZCT/201907101000ZCT.png";
import img4 from "../../assets/img/ZCT/201907101100ZCT.png";
import img5 from "../../assets/img/ZCT/201907101200ZCT.png";
import img6 from "../../assets/img/ZCT/201907101300ZCT.png";
import img7 from "../../assets/img/ZCT/201907101400ZCT.png";
import img8 from "../../assets/img/ZCT/201907101500ZCT.png";
import img9 from "../../assets/img/ZCT/201907101600ZCT.png";
import img10 from "../../assets/img/ZCT/201907101700ZCT.png";
import img11 from "../../assets/img/ZCT/201907101800ZCT.png";

import gif from "../../assets/img/gif/ZCT.gif";
import { clearInterval, setInterval } from "timers";
export default {
  data() {
    return {
      isPlay: false, //是否进行播放
      currentImg: img1, //  当前的图片对象
      currImgIndex: 0, // 当前定时器循环图片的额数组
      timner: null,
      startTime: "",
      endTime: "",
      imgArr: [
        {
          id: 1,
          path: img1
        },
        {
          id: 2,
          path: img2
        },
        {
          id: 3,
          path: img3
        },
        {
          id: 4,
          path: img4
        },
        {
          id: 5,
          path: img5
        },

        {
          id: 6,
          path: img6
        },
        {
          id: 7,
          path: img7
        },
        {
          id: 8,
          path: img8
        },
        {
          id: 9,
          path: img9
        },
        {
          id: 10,
          path: img10
        },
          {
          id: 11,
          path: img11
        }
      ],
      options: [
        {
          value: "整点图",
          label: "整点图"
        },
        {
          value: "日均图",
          label: "日均图"
        }
      ],
      value: "整点图",
      tableData: [
        {
          date: "2019-07-10 08:00",
          name: "广西壮族自治区葵花卫星真彩图"
        },
        {
          date: "2019-07-10 09:00",
        name: "广西壮族自治区葵花卫星真彩图"
        },
        {
          date: "2019-07-10 10:00",
           name: "广西壮族自治区葵花卫星真彩图"
        },
        
        {
          date: "2019-07-10 11:00",
        name: "广西壮族自治区葵花卫星真彩图"
        },
        {
          date: "2019-07-10 12:00",
         name: "广西壮族自治区葵花卫星真彩图"
        },
        {
          date: "2019-07-10 13:00",
         name: "广西壮族自治区葵花卫星真彩图"
        },
        {
          date: "2019-07-10 14:00",
         name: "广西壮族自治区葵花卫星真彩图"
        },
        {
          date: "2019-07-10 15:00",
         name: "广西壮族自治区葵花卫星真彩图"
        },
      
       
      ]
    };
  },
  computed: {
    palyIcon() {
      if (this.isPlay) {
        return "el-icon-video-pause";
      } else {
        clearInterval(this.timner);
        return "el-icon-video-play";
      }
    }
  },
  mounted() {
       this.endTime= new Date(); 
        // 开始时间11
       var seconds=  (new Date()).getTime() - 7*24*3600*1000;
       var oldTime  =  new Date(seconds)
        this.startTime = oldTime
  },



  methods: {
    // 综合条件生成gif   下载
    downLoadGif() {
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = gif;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    },
    //  播放器
    play(type) {
      let that = this;
      if (type == "play") {
        this.isPlay = !this.isPlay;
        clearInterval(this.timner);
        this.timner = setInterval(function() {
          that.currImgIndex++;
          if (that.currImgIndex == that.imgArr.length) {
            that.currImgIndex = 0;
          }

          that.currentImg = that.imgArr[that.currImgIndex].path;
        }, 1000);
      }
      if (type == "prevPlay") {
        this.isPlay = false;

        if (that.currImgIndex == 0) {
          that.currImgIndex = that.imgArr.length;
        }
        that.currImgIndex--;

        that.currentImg = that.imgArr[that.currImgIndex].path;
      }
      if (type == "nextPlay") {
        this.isPlay = false;
        that.currImgIndex++;
        if (that.currImgIndex == that.imgArr.length) {
          that.currImgIndex = 0;
        }

        that.currentImg = that.imgArr[that.currImgIndex].path;
      }
    },
    // 表格单个下载

    singDownLoad() {
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = this.currentImg;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  }
};
</script>
<style lang="scss">
.pmTwo {
  .download{
    text-align: center;
  }
  width: 100%;
  height: 100%;
   padding: 10px 30px 30px 25px!important;
  .el-select-dropdown__item {
    border-top: 0;
    border-bottom: 0;
  }
  .el-input__inner  {
                background-color:rgb(232,235,241) !important;
  }
  .el-input--mini .el-input__inner {
    width: 150px;
 
  }
  .el-table td {
        background:   #e8ebf1;
         border-bottom:  0.5px solid #ccc;
         text-align: center;
  }
   .el-table th {
       background:   #e8ebf1;
       border-bottom:  1px solid rgb(51,51,51);
        text-align: center;
   }
   
  padding: 30px;

  .timeOpt {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    div {
      display: inline-block;
      width: 45%;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      
      span {
        font-size: 13px;
        color: #999;

      }
      .el-date-editor{
       
      }
     
    }
  }
  .imgContainer {
    width: 100%;
    height: auto;
    background: #fff;
    box-shadow: darkgrey 2px 2px 30px 5px;
    margin-bottom: 15px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  
    img {
      width: 100%;
      height:70vh ;
      
     
     
    }
    .opt {
      height: 50px;
      width: 100%;
      background: rgb(51, 51, 51);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
   
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