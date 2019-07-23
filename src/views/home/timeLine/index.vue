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
        <div  class="playGress">
            <el-progress :percentage="precentLength" ></el-progress>
            <div class="scaleProgress">
               <ul v-for="(item,index)  in   timeList" :key="index" :style=" ulStyle">
                   <li  v-for="(li,index1) in  item.hour"   :class="{activeLi: ( dateIndex == index&&houerIndex==index1) }" :key="index1" :style="liStyle" @click="houerClick(index,index1)">  {{li}}</li>
                   <div class="date"  :class="{activeUl: ( dateIndex == index) }" >
                      {{
                       item.date
                       }}</div>
               </ul>
               
            </div>
        </div>
    </el-col>
 
  <el-col :span="2">
      <div class="currentTime">
      {{currentDate}}</div></el-col>
</el-row>
        
       </div> 
    </div>
</template>
 <script>
import { clearInterval } from 'timers';
 
 export default {
    computed:{
        //  设置循环的ul 样式
          ulStyle(){
              var arr = this.timeList 
                   var obj = {
                       height:'42px',
                       width:100/arr.length  +'%'
                   }
                   return obj
          },
           // 设置li样式
          liStyle (){
              var arr  = this.timeList[0].hour
                 var obj = {
                       height:'20px',
                       width:100/arr.length  +'%'
                   }
                    return obj
          },
          // 取出数据中所有的houer 组成额外的二维数组做深度对比
         houerList(){
             var arr  =[]
             var  timeList =  this.timeList
             timeList.forEach(function(item){
                arr.push(item.hour)
             })
             return arr
            
           },
        //  扁平化数组给进度条赋值进度
        pltterHouer(){
              var arr1  =[]
             var  arr=  this.houerList
             for(var i=0;i<arr.length;i++)
            {
                for(var j=0;j<arr[i].length;j++)
                
                {   
                    arr1.push(arr[i][j])
                   
                    
                }
             }
             return arr1
            
             
        },
      


         

        
    },
    mounted(){

          
    }, 
     data(){
         return {
             index:0,
             currentDate:'2019年6月23日',
             isPlay:false,
             playIcon:'el-icon-video-play',
             precentLength:3,
             dateIndex:0,
             houerIndex:0,
             timeList:[
                  {
                      date:'2019年6月23日',
                       hour:[
                          '10', '11','12','13','14'
                       ]
                  },
                   {
                      date:'2019年6月24日',
                       hour:[
                          '10', '11','12','13','14'
                       ]
                  },
                  {
                      date:'2019年6月25日',
                       hour:[
                          '10', '11','12','13','14'
                       ]
                  },
                   {
                      date:'2019年6月26日',
                       hour:[
                          '10', '11','12','13','14'
                       ]
                  },
                  {
                      date:'2019年6月27日',
                       hour:[
                          '10', '11','12','13','14'
                       ]
                  },
                   {
                      date:'2019年6月28日',
                       hour:[
                          '10', '11','12','13','14'
                       ]
                  }
             ],

            // 播放下标 暂时写死没必要动态生成
            
         playIndex:[
             [0,0],  [0,1], [0,2],[0,3],[0,4],
              [1,0],  [1,1], [1,2],[1,3],[1,4],
                [2,0],  [2,1], [2,2],[2,3],[2,4],
                  [3,0],  [3,1], [3,2],[3,3],[3,4],
                    [4,0],  [4,1], [4,2],[4,3],[4,4],
                     [5,0],  [5,1], [5,2],[5,3],[5,4]

         ]
             
             
         }
     },
     methods:{
         Play(){
             var  timer= null 
             let that  =this;
          

             if( this.isPlay) {
                 this.playIcon ='el-icon-video-play'
                  clearInterval(timer)
             }else{
                  this.playIcon ='el-icon-video-pause' 
             }
            
                this.isPlay =!this.isPlay;
         },
        houerClick(index,index1){
               this.dateIndex = index
               this.houerIndex =index1
                // console.log(index,index1)

               var len =0;
               if(index<1) {
                   len =index1+1
                   
               }
               if(index>0) {
                   len = index*5+index1+1
                     
               }
               this.currentDate = this.timeList[index].date
            this.precentLength  =  100*(len/this.pltterHouer.length)
          
      
               
            
           }
        
     }
 }
 </script>
<style lang="scss">

    .timeLine {
        .el-progress-bar__outer {
           top:-7.6px;
           background-color: transparent !important;
           width:100%;
           z-index:
       }
       .el-progress__text {
           display: none;
       }
        .activeLi{
            background: rgb(19,110,204) !important;
             color:#fff !important;
        }
         .activeUl{
               color:#fff !important;
         }
        overflow: hidden;
        .currentTime {
            color:  #fff;
            line-height:50px;
            font-size: 13.5px;
            text-align: center;
            
        }
        height:50px;
        line-height:50px;
          background: rgba(43,53,71,0.5);
       border:1px  solid rgba(76,76,76,0.5);
       padding:  0   30px;
       #playIcon  {
           color: #fff;
          font-size:  30px;
          margin-top: 10px;
       }
       .playGress  {
           position: relative;
       }
       .date {
           color: #666;
            font-size:13px;
            line-height: 20px;
            margin-left: 10px;
       }
       .el-progress  {
                 height:9px;
       }
       .el-progress-bar {
             padding-right:0;
             height:2;
             
       }
       
       .el-icon-circle-check:before {
           display: none;
       }
       .el-icon-circle-close:before {
    display: none;
}
.scaleProgress {
    height:40px;
  
    width:100%;
    line-height: 40%;
    ul {
        list-style: none;
        float: left;
        
        margin:  0;
        padding: 0;
        border-right:1px solid #fff;
        li {
            float:left;
            color: #666;
            font-size:13px;
            line-height: 20px;
            text-align: center;

            cursor: pointer;
                   }
                    li:hover {
                          background: rgb(19,110,204) !important;
            color:#fff !important;
                    }
    }
     ul:last-of-type{
           border-right:none
     }
}
    }   

</style>