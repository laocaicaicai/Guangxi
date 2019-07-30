<template>
<div class="homePage">
    <div v-show="showHome">

        <!-- 头部 -->
        <div class="header">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                    <h4> <img src="@/assets/img/logo.png" alt="">
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
        <div id="main"></div>
        <!-- 左侧导航栏 -->
        <div class="navBarlist">
            <sidebar />

            <span class="toggleBtn" @click="toggleNavBar()">
                <i :class="iconClass" style="color: #fff"></i>
            </span>
        </div>
        <!-- 切换产品图层 -->

        <div class="toggleLayer" @click="toggleLayer()">
            <el-tooltip class="item" effect="dark" content="切换产品图层" placement="top-start">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>
        <!-- 产品图层 -->

        <div id="ProductLayer">
            <div class="title">产品图层</div>

            <ul class="list-opt" style="height:270px; padding-bottom:30px;">
                <li v-for="(item,index) in  LayerList" :key="index">

                    <el-checkbox @change="showLayer(item)" :value="item.name" :label="item.name" v-model="checkItme"></el-checkbox>
                </li>

            </ul>

        </div>
        <!--右侧操作区域-->
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
        <!--时间轴-->
        <div id="timeline">
            <timeLine />
        </div>
        <!--底部-->
        <div>
            <bottom />
        </div>

    </div>
    <!--分屏组件-->

    <div>
        <transition name="custom"  leave-active-class="animated zoomOut">
            <splitScreen v-if="showSplitScreen" @closesplit="closeSplitScreen()" @showShutter="swithShutter()" />
        </transition>

    </div>

    <!--卷帘组件-->
    <div>
        <transition name="custom"  leave-active-class="animated zoomOut">
            <rollshutter v-if="showrollshutter" @closeShutter="closerollshutter()" />
        </transition>
    </div>
</div>
</template>

<script>
import sidebar from './compontents/sidebar/index'
import timeLine from './compontents/timeLine/index'
import bottom from './compontents/bottom/index'
import splitScreen from './compontents/splitScreen/index'
import rollshutter from './compontents/rollshutter/index'
// 广西边界数据
import jsonData from '@/assets/guangxi.json'
import $ from "jquery";
import * as esriLoader from "esri-loader";
const googlePath = "https://www.google.cn/maps/vt/lyrs=y@112&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
export default {
    mounted() {
        var timer = null
        let that = this;
        clearTimeout(timer)
        // 异步加载模仿  避免页面卡顿
        timer = setTimeout(function () {
            that.initMap()
            that.toggleRollingshutter();
        }, 100)

    },
    //  释放内存
    beforeDestroy() {
        if (this.map != null) {
            this.map = null
        }
    },
    data() {
        return {
            iconClass: "el-icon-s-fold",
            map: null, //地图实例对象
            showSplitScreen: false, // 展示分屏状态
            showHome: true, // 展示首页状态
            showrollshutter: false, //展示卷帘状态
            homeMapView: null,

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
            layerTen: null, //  pm10 de 的叠加图层服务全局实例
            layerTwo: null, // pm2.5  的叠加图层服务全局实例
            checkItme: [],
            GraphicsLayer: '',
            zoom: 0, // 子组件的缩放值
            center: [], //  子组件的中心坐标
            bodergraphicsLayer: null, //边界图层

        }
    },
    components: {
        sidebar,
        timeLine,
        bottom,
        splitScreen,
        rollshutter
    },
    methods: {
        initMap() {
            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Extent",

                        "esri/layers/MapImage", "esri/layers/MapImageLayer",
                        "esri/layers/WebTiledLayer",
                        "esri/layers/GraphicsLayer",
                        "dojo/parser"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Extent,
                        MapImage, MapImageLayer,
                        WebTiledLayer,
                        GraphicsLayer,
                        parser
                    ]) => {
                        parser.parse();

                        var map = that.map = new Map("main", {
                            center: [108.243685, 22.950986],
                            zoom: 6,
                            logo: false,

                        });
                        var cycleMap = new WebTiledLayer(googlePath);
                        map.addLayer(cycleMap);
                        // create and add the layer
                        var mil = new MapImageLayer({
                            "id": "usgs_screen_overlay"
                        });
                        map.addLayer(mil);
                        that.bodergraphicsLayer = new GraphicsLayer()
                        that.layerTwo = new GraphicsLayer()
                        map.addLayer(that.layerTwo)
                        map.addLayer(that.bodergraphicsLayer)
                        // create and add the image
                        var extent = new Extent({
                            "xmin": 70,
                            "ymin": 1,
                            "xmax": 150,
                            "ymax": 56,
                            "spatialReference": {
                                "wkid": 4326
                            }
                        });
                        var mi = new MapImage({
                            "extent": extent,

                            "href": "http://192.168.2.72:8080/20190713/SATE_L2_F2G_VISSR_MWB_LBT_SEC_LCN-IR1-20190713-0100.AWX.png"
                        });

                        mi.opacity = 0.5;

                        mil.addImage(mi);

                        map.on("load", that.drawPoint());
                    }
                )
                .catch(err => {
                    console.error(err);
                });
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
                    $('#timeline').css('width', "100vw")
                    $('#timeline').css('left', "0")
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
                    $('#timeline').css('width', "calc(100% - 251px)")
                    $('#timeline').css('left', "251px")
                });
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
        // 描绘边界的方法
        drawPoint() {

            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Point",
                        "esri/symbols/SimpleMarkerSymbol", "esri/graphic",
                        "dojo/_base/array", "dojo/dom-style", "dojox/widget/ColorPicker",
                        "dojo/domReady!"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Point,
                        SimpleMarkerSymbol, Graphic,
                        arrayUtils, domStyle, ColorPicker
                    ]) => {

                        var features = jsonData.features
                        var arr = []
                        var symbol = new SimpleMarkerSymbol({
                            "color": [255, 0, 0, 0],
                            "size": 2,
                            "angle": 0,
                            "xoffset": 0,
                            "yoffset": 0,

                            "outline": {
                                "color": [255, 0, 0, 255],
                                "width": 2,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            }
                        });
                        //
                        for (var i = 0; i < features.length; i++) {
                            arr = features[i].geometry.coordinates[0]
                        }
                        arr.forEach(function (item) {
                            var graphic = new Graphic(new Point(item), symbol);
                            that.bodergraphicsLayer.add(graphic)

                        })

                    }).catch(err => {
                    console.error(err);
                });
        },
        // 产品图层操作 展示对应图层
        showLayer(item) {
            this.checkItme = []
            this.checkItme.push(item.name)
            //  清空图层
            this.layerTwo.clear();
            // this.showPmtwo()
            if (item.name == "秸秆焚烧火点监测") {
                this.strawBurning()
            }
            //  大气污染热点提取
            if (item.name == "大气污染热点提取") {
               
                var arr = this.getlonloat();
                 console.log(arr[0])
                for (var k = 0; k < arr.length; k++) {
                    this.airPollution(arr[k][0],arr[k][1]);
                }
            }

        },
        //  pm2.5 展示
        showPmtwo() {

        },

        // 秸秆焚烧火点监测
        strawBurning() {
            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Point",
                        "esri/symbols/SimpleMarkerSymbol", "esri/graphic",
                        "dojo/_base/array", "dojo/dom-style", "dojox/widget/ColorPicker",
                        "esri/InfoTemplate",
                        "esri/dijit/PopupTemplate",
                        "dojo/domReady!"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Point,
                        SimpleMarkerSymbol, Graphic,
                        arrayUtils, domStyle, ColorPicker,
                        InfoTemplate,
                        PopupTemplate
                    ]) => {
                        var arr1 = [{

                                name: "秸秆焚烧火点1",
                                point: [108.243685, 22.950986]
                            },
                            {

                                name: "秸秆焚烧火点2",
                                point: [108.879542, 22.69836]
                            },
                            {

                                name: "秸秆焚烧火点3",
                                point: [107.814798, 22.822067]
                            },
                            {

                                name: "秸秆焚烧火点4",
                                point: [108.244835, 22.854575]
                            },
                            {

                                name: "秸秆焚烧火点5",
                                point: [108.138476, 22.800214]
                            },

                        ]

                        var symbol = new SimpleMarkerSymbol({
                            "color": [255, 0, 0, 0],
                            "size": 4,
                            "angle": 0,
                            "xoffset": 0,
                            "yoffset": 0,
                            "infoTemplate": new PopupTemplate({
                                "title": "Route "
                            }),
                            "outline": {
                                "color": [255, 0, 0, 255],
                                "width": 4,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            }
                        });
                        //

                        arr1.forEach(function (item) {
                            var graphic = new Graphic(new Point(item.point), symbol);
                            var template = new InfoTemplate();

                            template.setContent(item.name);
                            graphic.infoTemplate = template
                            that.layerTwo.add(graphic)
                            //  that.map.removeLayer( that.layerTwo)

                        })

                    }).catch(err => {
                    console.error(err);
                });
        },
        // 大气污染热点提取
        airPollution(arr,title) {

            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Point",
                        "esri/symbols/SimpleMarkerSymbol", "esri/graphic",
                        "dojo/_base/array", "dojo/dom-style", "dojox/widget/ColorPicker",
                        "esri/InfoTemplate",
                        "esri/dijit/PopupTemplate",
                        "esri/symbols/SimpleLineSymbol",
                        "esri/symbols/SimpleFillSymbol",
                        "esri/Color",
                        "dojo/domReady!"
                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Point,
                        SimpleMarkerSymbol, Graphic,
                        arrayUtils, domStyle, ColorPicker,
                        InfoTemplate,
                        PopupTemplate,
                        SimpleLineSymbol,
                        SimpleFillSymbol,
                        Color,

                    ]) => {

                        // 设置形状填充
                        var myPolygon = {
                            "geometry": {
                                "rings": [arr],
                                "spatialReference": {
                                    "wkid": 4326
                                }
                            },
                            "symbol": {
                                "color": [255, 0, 0, 60],
                                "outline": {
                                    "color": [255, 0, 0,250],
                                    "width": 1,
                                    "type": "esriSLS",
                                    "style": "esriSLSSolid"
                                },
                                "type": "esriSFS",
                                "style": "esriSFSSolid"
                            }
                        };
                           var template = new InfoTemplate();

                        template.setContent(title);
                        var gra = new Graphic(myPolygon);
                      gra.infoTemplate = template
                        console.log(gra)
                        that.layerTwo.add(gra);

                    }).catch(err => {
                    console.error(err);
                });
        },
      

        //  生成坐标算法
        getlonloat() {
            var z = 0.1;
            var recoArr = [];
            var arrall = [
                [108.243685, 22.950986,"大气污染热点1"],
                [108.945082, 23.843562,"大气污染热点2"],
                [108.655325, 23.360352,"大气污染热点3"],
                [107.997622, 23.139345,"大气污染热点4"],
                [108.365567, 21.865771,"大气污染热点5"]
            ];
            for (var i = 0; i < arrall.length; i++) {
                var longitude = arrall[i][0];
                var latitude = arrall[i][1];
                var x1 = longitude - z; //左上角点的经度
                var y1 = latitude + z; //左上角点的纬度
                var x2 = longitude + z; //右上角点的经度
                var y2 = latitude + z; //左上角点的纬度
                var x3 = longitude + z; //右下角点的经度
                var y3 = latitude - z; //右下角点的纬度
                var x4 = longitude - z; //左下角点的经度
                var y4 = latitude - z; //左下角点的纬度
                var newArr =[ [
                    [x1, y1],
                    [x2, y2],
                    [x3, y3],
                    [x4, y4],
                    [x1, y1]
                ],arrall[i][2]]
                recoArr.push(newArr);
            }
            return recoArr;
        },
        //  打开分屏
        homeSplitScreen() {
            let that = this;
            that.showHome = false
            that.showSplitScreen = true
            that.showrollshutter = false
        },
        //  关闭分屏
        closeSplitScreen() {
            this.showHome = true
            this.showSplitScreen = false
            this.showrollshutter = false
        },
        // 打开卷帘
        homeShutter() {
            let that = this;
            that.showHome = false
            that.showSplitScreen = false
            that.showrollshutter = true
        },
        // 关闭卷帘
        closerollshutter() {
            this.showHome = true
            this.showSplitScreen = false
            this.showrollshutter = false
        },
        //  切换卷帘
        swithShutter() {
            this.showHome = false
            this.showSplitScreen = false
            this.showrollshutter = true
        },
    },
}
</script>

<style lang="scss" scoped>
.homePage {
    .bottom {
        height: 30px;
        line-height: 30px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #1c222d;
        z-index: 99999;
        color: #555759;
        display: flex;
        justify-content: space-evenly;
        font-size: 10px;

        span {
            margin: 0 13px
        }
    }

    #timeline {
        width: calc(100% - 250px);
        height: 50px;
        overflow: hidden;
        position: fixed;
        bottom: 30px;
        left: 251px;

    }

    .header {
        height: 50px;
        width: 100%;
        position: absolute;
        background: rgba(0, 6, 59, 0.8);

        z-index: 3000;

        .item {
            display: inline-block;
            line-height: 50px;
            margin: 0 10px;
            color: #fff;
            font-size: 13px
        }

        h4 {
            background: rgb(19, 111, 205);
            margin: 0;
            color: #fff;
            height: 50px;
            line-height: 50px;
            padding-left: 10px;
            opacity: 1 !important;
            width: 250px;

            img {
                width: 30px;
                float: left;
                line-height: 50px;
                height: 30px;
                margin: 10px 5px;

            }

            span {
                float: left;
                height: 50px;
                line-height: 50px;
            }
        }
    }

    #main {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    }

    //  切换图层的方法
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

    // 左侧导航栏
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
                    padding-left: 0;

                    li {
                        // border-bottom: 0.1px solid #909399;
                        border-top: 0;
                    }

                    li:last-of-type {
                        border-bottom: none;
                        margin-bottom: 30px;
                    }

                    /deep/ .el-checkbox {
                        margin-left: 20px;
                        color: #fff;
                        font-size: 13px;
                    }

                    /deep/ .el-checkbox__label {
                        font-size: 13px;
                    }

                    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
                        color: #fff !important;
                        font-weight: bold;
                    }
                }
            }
        }
    }

    /deep/ .el-scrollbar {
        height: 100%;
    }

    /deep/ .scrollbar-wrapper {
        overflow-x: hidden !important;

        /deep/ .el-scrollbar__view {
            height: 100%;
        }
    }

    /deep/ .el-scrollbar__bar.is-vertical {
        right: 0px;
    }

    #ProductLayer {
        width: 180px;
        z-index: 3000;
        position: absolute;
        top: 70px;
        left: 320px;
        min-height: 370px;
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
            padding: 0;
            // li {
            //     border-bottom: 0.1px solid #909399;
            // }

            li:last-of-type {
                border-bottom: none;
            }

            /deep/ .el-checkbox {
                margin-left: 20px;
                color: #fff;
                font-size: 13px;
            }

            /deep/ .el-checkbox__label {
                font-size: 13px;
            }

            /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #fff !important;
                font-weight: bold;
            }
        }
    }
}
</style>
