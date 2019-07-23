<template>
<div id="mapContainer">
    <!-- 首页显示 -->
    <div v-show="showHome">

        <!-- 头部 -->
        <div class="header">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                     <h4> <img :src="bg" alt="">
               <span>广西大气环境遥感监测平台 </span></h4>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>

                <el-col :span="4">
                    <div class="item">
                        <i class="el-icon-location-outline"></i>
                        南宁市
                    </div>
                    <div class="item">欢迎管理员！</div>
                </el-col>
            </el-row>
        </div>
        <!-- 左侧导航栏 -->
        <div class="navBarlist">
            <sidebar />

            <span class="toggleBtn" @click="toggleNavBar()">
                <i :class="iconClass" style="color: #fff"></i>
            </span>
        </div>
        <!-- 中间地图实例化 -->
        <div id="viewDiv"></div>
        <!-- 切换产品图层 -->

        <div class="toggleLayer" @click="toggleLayer()">
            <el-tooltip class="item" effect="dark" content="切换产品图层" placement="top-start">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>

        <!-- 产品图层 -->

        <div id="ProductLayer">
            <div class="title">产品图层</div>
            <ul class="list-opt">
                <li v-for="(item,index) in  LayerList" :key="index">

                    <el-checkbox @change="showLayer(item)" :value="item.name" :label="item.name" v-model="checkItme"></el-checkbox>
                </li>

            </ul>
        </div>

        <!-- 图层 分屏 卷帘 -->

        <div class="rightOpt">
            <div class="item">
                <i class="el-icon-coin"></i>
                <span class="titleName">图层</span>
                <div id="Layer">
                    <el-scrollbar wrap-class="scrollbar-wrapper">
                        <ul class="list-opt">
                            <li>
                                <el-checkbox>影像地图</el-checkbox>
                            </li>
                            <li>
                                <el-checkbox>矢量地图</el-checkbox>
                            </li>
                            <li>
                                <el-checkbox>卫星云图</el-checkbox>
                            </li>
                            <li>
                                <el-checkbox>行政区域</el-checkbox>
                            </li>
                            <li>
                                <el-checkbox>水系</el-checkbox>
                            </li>
                            <li>
                                <el-checkbox>土地利用现状</el-checkbox>
                            </li>
                            <li>
                                <el-checkbox>省、市边界</el-checkbox>
                            </li>
                           <li>
                               <el-checkbox>源清单</el-checkbox>
                             </li>
                             <li>
                               <el-checkbox>数字高程模型(DEM)</el-checkbox>
                             </li>
                             <li>
                               <el-checkbox>交通路网</el-checkbox>
                             </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </div>
            <!-- el-icon-s-management -->
            <div class="item" @click.prevent="homeSplitScreen">
                <i class="el-icon-s-management"></i>
                <span class="titleName">分屏</span>
            </div>
            <div class="item" @click.prevent="homeShutter">
                <i class="el-icon-reading"></i>
                <span class="titleName">卷帘</span>
            </div>
        </div>
         <div class="bottom">
          <div>
            版权所有© |京ICP备08011069|北京航天宏图信息技术股份有限公司
          </div>
            <div>
              <span>联系我们</span>
              <span>客户投诉</span>
              <span>网站地图</span>
              <span>法律公告</span>

          </div>
      </div>
      <div id="timeline">
        <timeLine />
      </div>
    </div>

    <div v-show="showSplitScreen">
        <splitscreen :viewObj="viewMap" @closesplit="closeSplitScreen()"
        @showShutter="swithShutter()"  :splitZoom="zoom" :splitCenter="center"/>
    </div>


    <div v-show="showrollshutter">
        <rollshutter :mapOne="viewMap" @closeShutter="closerollshutter()"  :zoomRoll="zoom" :centerRoll="center"/>
    </div>

</div>
</template>

<script>
import img from '../../assets/img/logo.png';
import * as esriLoader from "esri-loader";
import sidebar from "./sidebar/index";
import splitscreen from "./splitscreen/index";
import rollshutter from './rollshutter/index'
import jsonData  from '../../assets/guangxi.json'
import $ from "jquery";
import timeLine from './time'
export default {
    components: {
        sidebar,
        splitscreen,
        rollshutter,
        timeLine
    },
    data() {
        return {
            iconClass: "el-icon-s-fold",
            viewMap: null, //首页产地的地图底图对象
            view: null, // 地图对象实例化容器
            showSplitScreen: false, // 展示分屏状态
            showHome: true, // 展示首页状态
            showrollshutter: false, //展示卷帘状态
            homeMapView: null,
              bg:require('../../assets/img/logo.png'),
            LayerList: [{
                    name: '气溶胶反演',
                    checked: false
                },
                {
                    name: 'PM2.5颗粒物反演',
                    checked: false
                },
                {
                    name: 'PM10颗粒物反演',
                    checked: true
                },
                {
                    name: '卫星云图操作',
                    checked: false
                },
                {
                    name: '大气污染热点提取',
                    checked: false
                },
                {
                    name: '秸秆焚烧火点监测',
                    checked: false
                },
                {
                    name: '预报预警产品制作',
                    checked: false
                },
                {
                    name: '臭氧反演模块',
                    checked: false
                },
                  {
                    name: '建筑裸地监测',
                    checked: false
                },
                  {
                    name: '风场',
                    checked: false
                },

            ],
            layerTen: null,  //  pm10 de 的叠加图层服务全局实例
            layerTwo: null, // pm2.5  的叠加图层服务全局实例
            checkItme: [],
            GraphicsLayer: '',
            zoom:0, // 子组件的缩放值
            center:[],//  子组件的中心坐标
            bodergraphicsLayer:'',//边界图层

        };
    },
    mounted() {
        //  初始化地图
        console.log(jsonData.features)

        this.initMap();
        this.toggleRollingshutter();

    },

    methods: {
        showLayer(item) {
            this.GraphicsLayer.removeAll()
            //this.layerTwo.removeAll()
            this.viewMap.remove(this.layerTwo)
            this.viewMap.remove(this.layerTen)
            this.checkItme = []
            this.checkItme.push(item.name)
            if (this.checkItme[0] == 'PM2.5颗粒物反演') {
                this.viewMap.add(this.layerTwo)
                this.view.zoom = 10
                this.view.center = [115.45951508938258, 38.86619924997554]
                 this.zoom =10
                this.center= [115.45951508938258, 38.86619924997554]

            }
            if (this.checkItme[0] == 'PM10颗粒物反演') {
                this.viewMap.add(this.layerTen)
                this.view.zoom = 10
                this.view.center = [115.45951508938258, 38.86619924997554]
                 this.zoom =10
                this.center= [115.45951508938258, 38.86619924997554]
            }
            if (this.checkItme[0] == '秸秆焚烧火点监测') {
                //  console.log(11)
                //  this.viewMap.add(this.layerTen)
                var res = [
                    [108.243685,22.950986],
                    [108.879542,22.69836],
                    [107.814798,22.822067],
                    [108.244835,22.854575],
                    [108.138476,22.800214],
                    [107.955653,22.873756],
                    [108.58921,22.76716]
                ]
                for (var i = 0; i < res.length; i++) {
                    this.drawPointfn(res[i])
                }

            }
            if (this.checkItme[0] == '大气污染热点提取') {
                var arr=this.getlonloat();
                for(var k=0;k<arr.length;k++){
                    this.drawSquare(arr[k]);
                }


            }

        },
        //  画点的方法
        drawPointfn(arry) {

            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.1.19:6001/arcjs411/init.js"// 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/Graphic"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Graphic
                    ]) => {

                        var point = {
                            type: "point", // autocasts as new Point()
                            longitude: arry[0],
                            latitude: arry[1]
                        };

                        // Create a symbol for drawing the point
                        var markerSymbol = {
                            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                            color: [255, 0, 0],
                            outline: {
                                // autocasts as new SimpleLineSymbol()
                                color: [255, 255, 255],
                                width: 0
                            }
                        };

                        // 创建点的实例
                        var pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol
                        });
                        this.GraphicsLayer.add(pointGraphic)
                        that.view.zoom = 7
                        that.view.center = [108, 22]
                         that.zoom =7
                that.center= [108, 22]

                    }
                )
                .catch(err => {
                    console.error(err);
                });
        },


        //画面的方法
        drawSquare(arrRings) {

            let that = this;
            //  产品图层切换逻辑
            const options = {
                url:"http://192.168.1.19:6001/arcjs411/init.jss" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/geometry/SpatialReference"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map,
                        MapView,
                        Graphic, SpatialReference
                    ]) => {
                        var arr=that.getlonloat()
                        var polygon = {
                            type: "polygon", // autocasts as new Polygon()
                            hasZ: true,
                            hasM: false,
                            spatialReference: new SpatialReference({
                                wkid: 4326
                            }),
                            // rings: [
                            //     [108.35, 22.82],
                            //     [108.37, 22.82],
                            //     [108.37, 22.79],
                            //     [108.35, 22.79],
                            //     [108.35, 22.82]
                            // ]
                            rings:arrRings
                        };

                        // Create a symbol for rendering the graphic
                        var fillSymbol = {
                            type: "simple-fill", // autocasts as new SimpleFillSymbol()
                            color: [255, 0, 0, 0.8],
                            outline: {
                                // autocasts as new SimpleLineSymbol()
                                color: [255, 255, 255],
                                width: 0
                            }
                        };

                        // Add the geometry and symbol to a new graphic
                        var polygonGraphic = new Graphic({
                            geometry: polygon,
                            symbol: fillSymbol
                        });
                        that.view.zoom = 14
                        that.view.center = [108.35, 22.82]
                                    that.zoom =14
                       that.center= [108.35, 22.82]
                        that.GraphicsLayer.add(polygonGraphic)
                        console.log(that.GraphicsLayer)

                    }
                )
                .catch(err => {
                    console.error(err);
                });
        },
        // 初始化地图
        initMap() {
            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.1.19:6001/arcjs411/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/Map",
                        "esri/config",
                        "esri/request",
                        "esri/Color",
                        "esri/views/SceneView",
                        "esri/views/MapView",
                        "esri/widgets/LayerList",
                        "esri/layers/BaseTileLayer",
                        "esri/layers/support/TileInfo",
                        "esri/geometry/Extent",
                        "esri/geometry/SpatialReference",
                        'esri/layers/WebTileLayer',
                        "esri/layers/FeatureLayer",
                        "esri/layers/ImageryLayer",
                        "esri/layers/GraphicsLayer",
                        "dojo/domReady!"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map,
                        esriConfig,
                        esriRequest,
                        Color,
                        SceneView,
                        MapView,
                        LayerList,
                        BaseTileLayer,
                        TileInfo,
                        Extent,
                        SpatialReference,
                        WebTileLayer,
                        FeatureLayer,
                        ImageryLayer,
                        GraphicsLayer
                    ]) => {
                        let that = this;
                        var map = that.viewMap = new Map({
                            // basemap: "streets"
                        });

                        var view = that.view = new MapView({
                            container: "viewDiv",
                            map: map,
                            zoom: 6,
                            center: [ 108.604157,23.46939], // longitude, latitude

                        });
                         view.ui.move("zoom", "top-right");
                        that.zoom =6
                         that.center= [ 108.604157,23.46939]
                        view.on("click", function (e) {
                            console.log(e)
                        })

                        view.ui._removeComponents(["attribution"]);
                        var name10 = 'HAZ_PM10_RCUR_201907120500_COTM_HIM8AHI_130000.tif';
                        var name2 = 'HAZ_PM25_RCUR_201907120500_COTM_HIM8AHI_130000.tif'
                        var tiledLayer = new WebTileLayer({
                            urlTemplate: 'http://mt0.google.cn/vt/lyrs=y@112&hl=zh-CN&gl=cn&x={col}&y={row}&z={level}&s=Gali',
                            subDomains: ['a', 'b', 'c', 'd'],
                            copyright: ""

                        })
                        map.add(tiledLayer)

                        //  layer 10叠加图层
                        var layer10 = that.layerTen = new ImageryLayer({
                            url: "http://211.154.196.253:6080/arcgis/rest/services/Sjz_Service/PM10/ImageServer",
                            definitionExpression: "name='" + name10 + "'",
                            id: 'imageLayer',
                            opacity: 0.5,

                        });

                        var layer2 = that.layerTwo = new ImageryLayer({
                            url: "http://211.154.196.253:6080/arcgis/rest/services/Sjz_Service/PM25/ImageServer",
                            definitionExpression: "name='" + name2 + "'",
                            id: 'imageLayer',
                            opacity: 0.5,

                        });
                        //  map.add(layer10);

                        that.GraphicsLayer = new GraphicsLayer();
                        that.viewMap.add(that.GraphicsLayer)
                        //边界图层
                        that.bodergraphicsLayer = new GraphicsLayer()
                        map.add(that.bodergraphicsLayer)
                        for(var l=0;l<jsonData.features.length;l++){
          // console.log(jsonData.features[l].geometry.coordinates)
                              that.drawBorderFn(jsonData.features[l].geometry.coordinates)
                          }
                    }
                )
                .catch(err => {
                    console.error(err);
                });
        },
        // 左侧导航栏切换逻辑
        toggleNavBar() {
            let that = this;
            var left = parseFloat($(".navBarlist").css("left"));

            if (left == 0) {
                that.iconClass = "el-icon-s-unfold";
                $(".navBarlist").animate({
                    left: "-250px"
                }, "slow", function () {
                    // 将其切换图层以及产品图层左移
                    $(".toggleLayer")
                        .show()
                        .css("left", "10px");
                    $("#ProductLayer")
                        .show()
                        .css("left", "50px");
                         $('#timeline').css('width',"100vw")
                        $('#timeline').css('left',"0")
                });
            } else {
                $(".toggleLayer").hide();
                $("#ProductLayer").hide();
                that.iconClass = "el-icon-s-fold";
                $(".navBarlist").animate({
                    left: "0"
                }, "slow", function () {
                    $(".toggleLayer")
                        .show()
                        .css("left", "280px");
                    $("#ProductLayer")
                        .show()
                        .css("left", "320px");
                      $('#timeline').css('width',"calc(100% - 251px)")
                      $('#timeline').css('left',"251px")
                });
            }
        },
        //  切换图层显示跟隐藏
        toggleLayer() {
            var isshow = $("#ProductLayer").css("display");

            if (isshow == "block") {
                $("#ProductLayer").fadeOut("slow");
            } else {
                $("#ProductLayer").fadeIn("slow");
            }
        },
        //切换图层 和卷帘效果
        toggleRollingshutter() {
            let that = this;
            $(".rightOpt .item").click(function () {
                $(this)
                    .addClass("activeItem")
                    .siblings()
                    .removeClass("activeItem");
                let item = $(this)
                    .find(".titleName")
                    .text();
                if (item == "图层") {
                    $("#Layer").slideDown();
                } else {
                    $("#Layer").slideUp();
                }

            });
        },
        //绘制边界
        drawBorderFn(data) {
          console.log('边界方法')
          let that =this
          //渲染省‘市’县边界
          const options = {
            url: 'http://192.168.1.19:6001/arcjs411/init.js'
          }
          esriLoader
            .loadModules(['esri/layers/GraphicsLayer', 'esri/Graphic'], options)
            .then(
              ([GraphicsLayer, Graphic]) => {
                var polygon = {
                  type: 'polygon', // autocasts as new Polygon()
                  // rings: areaborder.prove.geometries[0].coordinates
                  rings: data
                }
                var fillSymbol = {
                  //黄色
                  type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                  color: [255, 0, 0, 0],
                  outline: {
                    // autocasts as new SimpleLineSymbol()
                    color: [255, 0, 0],
                    width: 2
                  }
                }
                var polygonGraphic = new Graphic({
                  geometry: polygon,
                  symbol: fillSymbol
                })

                that.bodergraphicsLayer.add(polygonGraphic)

              },
              reason => {
                console.log(reason)
              }
            )
        },

        homeShutter() {
            let that = this;
            that.showHome = false
            that.showSplitScreen = false
            that.showrollshutter = true
        },
        homeSplitScreen() {
            let that = this;
            that.showHome = false
            that.showSplitScreen = true
            that.showrollshutter = false
        },
        closeSplitScreen() {
            this.showHome = true
            this.showSplitScreen = false
            this.showrollshutter = false
        },
        closerollshutter() {
            this.showHome = true
            this.showSplitScreen = false
            this.showrollshutter = false
        },
        swithShutter() {
            this.showHome = false
            this.showSplitScreen = false
            this.showrollshutter = true
        },
        getlonloat(){
            var z = 0.01;
            var recoArr=[];
            var arrall=[[106.686814,23.398565],[108.945082,23.843562],[108.655325,23.360352],[107.997622,23.139345],[108.365567,21.865771]];
            for(var i=0;i<arrall.length;i++){
               var longitude= arrall[i][0];
               var latitude=arrall[i][1];
               var x1 = longitude - z; //左上角点的经度
               var y1 = latitude + z; //左上角点的纬度
               var x2 = longitude + z; //右上角点的经度
               var y2 = latitude + z; //左上角点的纬度
               var x3 = longitude + z; //右下角点的经度
               var y3 = latitude - z; //右下角点的纬度
               var x4 = longitude - z; //左下角点的经度
               var y4 = latitude - z; //左下角点的纬度
               var newArr=[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]];
               recoArr.push(newArr);
            }
            return recoArr;
        }
    }
};
</script>

<style lang="scss">
  #timeline{
      width:calc(100% - 250px);
      height:60px;
      position:fixed;
      bottom:1.5vh;
      left:251px;

  }
.esri-ui-top-right {
    top: 90px;
    right: 0;
}
#mapContainer {

  .bottom{
  height: 3vh;
  line-height: 3vh;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #1c222d ;
  z-index: 99999;
  color: #555759 ;
  display: flex;
  justify-content: space-evenly;
  font-size: 10px;
  span{
    margin: 0 13px
  }
}
  .activeItem {
    background: rgba(30, 37, 50, 0.8) !important;
    border-radius: 5px;
    font-weight: bold !important;
  }
  .activeI {
    color: rgb(19, 111, 205);
    font-weight: bold !important;
  }
  .rightOpt {
    width: 220px;
    z-index: 3000;
    position: absolute;
    top: 65px;
    right: 20px;
    height: 30px;
    background: rgba(36, 48, 51, 0.8);
    border-radius: 5px;
    .item {
      float: left;
      width: 33.3%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 0;
      cursor: pointer;
      color: #fff;
      position: relative;
      font-size: 13.5px;
      i {
        color: #fff;
        font-weight: normal;
      }
      #Layer {
        display: none;
        width: 180px;
        z-index: 5000;
        clear: both;
        position: absolute;
        top: 40px;
        left: 0;
        height: auto;
        text-align: left;
        background: rgba(36, 48, 51, 0.8);
        border-radius: 5px;
        .title {
          background: rgba(43, 53, 71, 0.8);
          height: 30px;
          border-radius: 5px;
          color: #fff;
          font-size: 13.5px;
          line-height: 30px;
          padding: 0 30px;
        }

        .list-opt {
          list-style: none;
          height: 300px;
          line-height: 30px;
          padding: 0;

          li {
           // border-bottom: 0.1px solid #909399;
            border-top: 0;
          }
          li:last-of-type {
            border-bottom: none;
            margin-bottom: 30px;
          }
          .el-checkbox {
            margin-left: 20px;
            color: #fff;
            font-size: 13px;
          }
          .el-checkbox__label {
            font-size: 13px;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #fff !important;
            font-weight: bold;
          }
        }
      }
    }
  }
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
  .toggleLayer {
    width: 35px;
    height: 35px;
    background: rgb(31, 38, 51);
    z-index: 3000;
    position: absolute;
    top: 70px;
    left: 280px;
    border-radius: 5px;
    text-align: center;
    i {
      color: #fff;
      line-height: 35px;
      cursor: pointer;
    }
  }
  #ProductLayer {
    width: 180px;
    z-index: 3000;
    position: absolute;
    top: 70px;
    left: 320px;
    min-height: 350px;
    background: rgba(36, 48, 51, 0.8);
    border-radius: 5px;
    .title {
      background: rgba(43, 53, 71, 0.8);
      height: 30px;
      border-radius: 5px;
      color: #fff;
      font-size: 13.5px;
      line-height: 30px;
      padding: 0 30px;
    }

    .list-opt {
      list-style: none;
      height: 30px;
      line-height: 30px;
      li {
        border-bottom: 0.1px solid #909399;
      }
      li:last-of-type {
        border-bottom: none;
      }
      .el-checkbox {
        margin-left: 20px;
        color: #fff;
        font-size: 13px;
      }
      .el-checkbox__label {
        font-size: 13px;
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #fff !important;
        font-weight: bold;
      }
    }
  }
  .item {
    display: inline-block;
    line-height: 50px;
    margin: 0 10px;
    color: #fff;
    font-size: 13px;
  }
  .header {
    height: 50px;
    width: 100%;
    position: absolute;
    background: rgba(0, 6, 59, 0.8);
    box-shadow: 1px 1px 1px rgba(0, 6, 59, 0.8);
    z-index: 3000;

    h4 {
      background: rgb(19, 111, 205);
      margin: 0;
      color: #fff;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      opacity: 1 !important;
      width: 250px;
         img{
        width:30px;
        float: left;
        line-height: 50px;
        height:30px;
        margin:10px 5px;

      }
       span {
         float: left;
         height: 50px;
         line-height: 50px;
       }
    }
  }
  .navBarlist {
    height: 100%;
    width: 250px;
    top: 50px;
    height: calc(100vh - 50px);
    position: absolute;
    background: rgba(0, 6, 59, 0.8);
    box-shadow: 1px 1px 1px rgba(0, 6, 59, 0.8);
    // background: linear-gradient(150deg, #102472, #00063b);
    z-index: 3000;
    // opacity: 0.8;
    left: 0;

    .toggleBtn {
      position: absolute;
      top: 50%;
      left: 250px;
      width: 22px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 8px;
      background: rgb(16, 28, 64);
      cursor: pointer;
    }
    h4 {
      background: rgb(19, 111, 205);
      margin: 0;
      color: #fff;
      height: 50px;
      line-height: 50px;
      padding-left: 30px;
      opacity: 1 !important;
    }
  }
  #viewDiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    // background: red;
  }


}
</style>
