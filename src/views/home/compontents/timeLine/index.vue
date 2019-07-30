<template>
<!--  时间轴进度条组件 -->
<div>
    <div class="timeLine">

        <el-row>
            <el-col :span="1">
                <div>
                    <i :class="playIcon" id="playIcon" @click="Play()"></i>
                </div>
            </el-col>
            <el-col :span="21">
                <div class="playGress">
                    <el-progress :percentage="precentLength"></el-progress>
                    <div class="scaleProgress">
                        <ul v-for="(item,index)  in   timeList" :key="index" :style=" ulStyle">
                            <li v-for="(li,index1) in  item.hour" :class="{activeLi: ( dateIndex == index&&houerIndex==index1) }" :key="index1" :style="liStyle" @click="houerClick(index,index1)"> {{li}}</li>
                            <div class="date" :class="{activeUl: ( dateIndex == index) }">
                                {{
                       item.date
                       }}</div>
                        </ul>

                    </div>
                </div>
            </el-col>

            <el-col :span="2">
                <div class="currentTime">
                    {{currentDate}}</div>
            </el-col>
        </el-row>

    </div>
</div>
</template>

<script>


export default {
    computed: {
        //  设置循环的ul 样式
        ulStyle() {
            var arr = this.timeList
            var obj = {
                height: '42px',
                width: 100 / arr.length + '%'
            }
            return obj
        },
        // 设置li样式
        liStyle() {
            var arr = this.timeList[0].hour
            var obj = {
                height: '20px',
                width: 100 / arr.length + '%'
            }
            return obj
        },
        // 取出数据中所有的houer 组成额外的二维数组做深度对比
        houerList() {
            var arr = []
            var timeList = this.timeList
            timeList.forEach(function (item) {
                arr.push(item.hour)
            })
            return arr

        },
      
        //  动态生成下标
      playIndex() {
            var arr1 = []
            var arr = this.houerList
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++)

                {
                    arr1.push([i,j])

                }
            }
            return arr1

        },

    },
    mounted() {

    },
    data() {
        return {
            index: 0,
            timer:null, // 全局定时器
            currentDate: '2019年6月23日',
            isPlay: false,
            playIcon: 'el-icon-video-play',
            precentLength: 3,
            dateIndex: 0,
            houerIndex: 0,
            countIndex:0,

            timeList: [{
                    date: '2019年6月23日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                },
                {
                    date: '2019年6月24日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                },
                {
                    date: '2019年6月25日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                },
                {
                    date: '2019年6月26日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                },
                {
                    date: '2019年6月27日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                },
                {
                    date: '2019年6月28日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                },
                {
                    date: '2019年6月29日',
                    hour: [
                        '10', '11', '12', '13', '14'
                    ]
                }
            ],

            

           

        }
    },
    methods: {
        Play() {
           
            let that = this;
             var arr = this.houerList
               var allprogressLen = arr[0].length * arr.length
            if (this.isPlay) {
                this.playIcon = 'el-icon-video-play'
                clearInterval(this.timer)
            } else {
                this.playIcon = 'el-icon-video-pause'
                clearInterval(this.timer)
                this.timer=  setInterval(function(){
                     that.houerClick(that.playIndex[that.countIndex][0], that.playIndex[that.countIndex][1])
                   that.countIndex++
               
                  
                //    that.dateIndex = that.playIndex[that.countIndex][0]
                //     that.houerIndex = that.playIndex[that.countIndex][1]
                   if(that.countIndex==allprogressLen) {
                       that.countIndex=0
                
                   }
                },1000)
            }

            this.isPlay = !this.isPlay;
        },
        houerClick(index, index1) {
            this.dateIndex = index
            this.houerIndex = index1
             var arr = this.houerList

            var len = 0;
            if (index < 1) {
                len = index1 + 1

            }
            if (index > 0) {
                len = index * 5 + index1 + 1

            }
            console.log(this.playIndex)
            //  总长度
            var allprogressLen = arr[0].length * arr.length

            //  设置当前时间
            this.currentDate = this.timeList[index].date
            // 设置进度条占比
            this.precentLength = 100 * (len / allprogressLen)

        }

    }
}
</script>

<style lang="scss">
.timeLine {
    /deep/ .el-progress-bar__outer {
        top: -7.6px;
        background-color: rgb(43, 53, 71);
        width: 100%;
        z-index: 2000;
    }

    /deep/ .el-progress__text {
        display: none;
    }

    .activeLi {
        background: rgb(19, 110, 204) !important;
        color: #fff !important;
    }

    .activeUl {
        color: #fff !important;
    }

    overflow: hidden;

    .currentTime {
        color: #fff;
        line-height: 50px;
        font-size: 13.5px;
        text-align: center;

    }

    height:50px;
    line-height:50px;
    background: rgb(43, 53, 71);
    border:1px solid rgba(76, 76, 76, 0.5);
    padding: 0 30px;

    #playIcon {
        color: #fff;
        font-size: 30px;
        margin-top: 10px;
    }

    .playGress {
        position: relative;
    }

    .date {
        color: #666;
        font-size: 13px;
        line-height: 20px;
        margin-left: 10px;
    }

    /deep/ .el-progress {
        height: 9px;
    }

    /deep/ .el-progress-bar {
        padding-right: 0;
        height: 2;

    }

    /deep/ .el-icon-circle-check:before {
        display: none;
    }

    /deep/ .el-icon-circle-close:before {
        display: none;
    }

    .scaleProgress {
        height: 40px;

        width: 100%;
        line-height: 40%;

        ul {
            list-style: none;
            float: left;

            margin: 0;
            padding: 0;
            border-right: 1px solid #fff;

            li {
                float: left;
                color: #666;
                font-size: 13px;
                line-height: 20px;
                text-align: center;

                cursor: pointer;
            }

            li:last-of-type {
                border-bottom: none;
            }

            li:hover {
                background: rgb(19, 110, 204) !important;
                color: #fff !important;
            }
        }

        ul:last-of-type {
            border-right: none
        }
    }
}
</style>
