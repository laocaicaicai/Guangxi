<template>
<!--分屏组件-->

<div id="screen">
    <div class="close1" @click="close()">
        关
        闭
    </div>
    <div class="screenOne">
        <div class="header">
            <h3>谷歌高清影像图</h3>
        </div>
        <div class="toggleLayer">
            <el-tooltip class="item" effect="dark" content="切换操作" placement="top-start">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>
        <div id="ProductLayer1">
            <div class="title">产品图层</div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <ul class="list-opt">
                    <li v-for="(item,index) in  LayerList" :key="index">

                        <el-checkbox :value="item.name" :label="item.name" v-model="checkItme" @change="layersOpt(item)"></el-checkbox>
                    </li>

                </ul>
            </el-scrollbar>
        </div>

        <div class="left1" id="viewDivOne"></div>
    </div>
    <div class="screenTwo">
        <div class="header">
            <h3>谷歌高清行政图</h3>
        </div>
        <div class="toggleLayer">
            <el-tooltip class="item" effect="dark" content="切换操作" placement="top-start">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>
        <div id="ProductLayer1">
            <div class="title">产品图层</div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <ul class="list-opt">
                    <li>
                        <el-checkbox>气溶胶反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>PM2.5颗粒物反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>PM10颗粒物反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>卫星云图操作</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>大气污染热点提取</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>秸秆焚烧火点监测</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>预报预警产品制作</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>臭氧反演模块</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>建筑裸地监测</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>风场</el-checkbox>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
        <div class="right1" id="viewDiv1"></div>
    </div>
    <div class="screenThree">
        <div class="header">
            <h3>天地图影像图</h3>
        </div>
        <div class="toggleLayer">
            <el-tooltip class="item" effect="dark" content="切换操作" placement="top-start">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>

        <div id="ProductLayer1">
            <div class="title">产品图层</div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <ul class="list-opt">
                    <li>
                        <el-checkbox>气溶胶反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>PM2.5颗粒物反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>PM10颗粒物反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>卫星云图操作</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>大气污染热点提取</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>秸秆焚烧火点监测</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>预报预警产品制作</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>臭氧反演模块</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>建筑裸地监测</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>风场</el-checkbox>
                    </li>
                </ul>
            </el-scrollbar>
        </div>

        <div class="left2" id="viewDiv2"></div>
    </div>
    <div class="screenFour">
        <div class="header">
            <h3> 天地图行政图</h3>
        </div>
        <div class="toggleLayer">
            <el-tooltip class="item" effect="dark" content="切换操作" placement="top-start">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>
        <div id="ProductLayer1">
            <div class="title">产品图层</div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <ul class="list-opt">
                    <li>
                        <el-checkbox>气溶胶反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>PM2.5颗粒物反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>PM10颗粒物反演</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>卫星云图操作</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>大气污染热点提取</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>秸秆焚烧火点监测</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>预报预警产品制作</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>臭氧反演模块</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>建筑裸地监测</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox>风场</el-checkbox>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
        <div class="right2" id="viewDiv3"></div>
    </div>

    <!-- 共有的图层操作
    -->

    <div class="rightOpt1">
        <div class="item">
            <i class="el-icon-coin"></i>
            <span class="titleName">图层</span>
            <div id="Layer1">
                <el-scrollbar wrap-class="scrollbar-wrapper">
                    <ul class="list-opt">
                        <li>
                            <el-checkbox>气溶胶反演</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>PM2.5颗粒物反演</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>PM10颗粒物反演</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>卫星云图操作</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>大气污染热点提取</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>秸秆焚烧火点监测</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>预报预警产品制作</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>臭氧反演模块</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>建筑裸地监测</el-checkbox>
                        </li>
                        <li>
                            <el-checkbox>风场</el-checkbox>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <div class="item" @click="showShutter">
            <i class="el-icon-reading"></i>
            <span class="titleName">卷帘</span>
        </div>
    </div>
</div>
</template>

<script>
import $ from "jquery";
import * as esriLoader from "esri-loader";
const googlePath = "https://www.google.cn/maps/vt/lyrs=y@112&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
import jsonData from '@/assets/guangxi.json'
export default {
    mounted() {

        var timer = null
        let that = this;
        clearTimeout(timer)
        //  解决父组件按钮点击触发四个地图并发渲染卡顿延迟
        timer = setTimeout(function () {
            that.initMap()

            that.initMap2();
            that.mapHover();
            that.toggleRollingshutter()
            that.toggleLayer();
            that.initMap3()
            that.initMap4()
        }, 100)
    },
    beforeDestroy() {
        this.view1 = null
        this.view2 = null
        this.view3 = null
        this.view4 = null
    },

    props: [
        "viewObj",
        "splitZoom", "splitCenter",
        "isShow",
        "boderGraraphics"
    ],
    data() {
        return {
            view1: null,
            view2: null,
            view3: null,
            view4: null,
            isFlag1: true,
            isFlag2: true,
            isFlag3: true,
            isFlag4: true,
            bodergraphicsLayer: null, //  边界图层
            productLayer: null, // 产品图层
            checkItme: [], // 产品图层操作
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
        };
    },
    methods: {
        // 海图悬浮效果- 显示标题
        mapHover() {
            $("#screen div")
                .mouseenter(function () {
                    $(this)
                        .find(".header")
                        .slideDown();
                })
                .mouseleave(function () {
                    $(this)
                        .find(".header")
                        .slideUp();
                });
        },
        // 切换产品图层 显示
        toggleLayer() {
            $(".toggleLayer").click(function () {
                var state = $(this)
                    .parent()
                    .find("#ProductLayer1")
                    .css("display");

                if (state == "block") {
                    $(this)
                        .parent()
                        .find("#ProductLayer1")
                        .slideUp();
                } else {
                    $(this)
                        .parent()
                        .find("#ProductLayer1")
                        .slideDown();
                }
            });
        },
        //切换图层 和卷帘效果
        toggleRollingshutter() {
            let that = this;
            $(".rightOpt1 .item").click(function (i) {
                $(this)
                    .addClass("activeItem")
                    .siblings()
                    .removeClass("activeItem");
                let item = $(this)
                    .find(".titleName")
                    .text();
                if (item == "图层") {

                    $("#Layer1").slideDown();
                } else {
                    $("#Layer1").slideUp();
                    that.$emit("showShutter")
                }

            });
        },
        // 加载第一个地图初始化
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

                        "esri/layers/WebTiledLayer",
                        "esri/layers/MapImageLayer",
                        "esri/layers/MapImage",
                        "esri/layers/GraphicsLayer",
                        "dojo/parser"

                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Extent,
                        WebTiledLayer,
                        MapImageLayer,
                        MapImage,
                        GraphicsLayer,
                        parser
                    ]) => {
                        parser.parse();

                        var map = that.view1 = new Map("viewDivOne", {

                            center: [108.604157, 23.46939],
                            zoom: 6,
                            logo: false
                        });

                        var cycleMap = new WebTiledLayer(googlePath);
                         map.addLayer(cycleMap);
                        var mil = new MapImageLayer();
                        map.addLayer(mil);
                        that.bodergraphicsLayer = new GraphicsLayer()
                        //  实例化产品图层
                        that.productLayer = new GraphicsLayer()
                         map.addLayer(that.bodergraphicsLayer);
                        map.addLayer(that.productLayer)

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
                        map.on("extent-change", function (e) {
                            if (that.isFlag1) {
                                that.view2.setExtent(map.extent);
                                that.view3.setExtent(map.extent);
                                that.view4.setExtent(map.extent);
                                that.isFlag2 = false
                                that.isFlag3 = false
                                that.isFlag4 = false
                            } else if (!that.isFlag1) {
                                that.isFlag1 = true
                            }

                        });

                    }
                );
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
        initMap2() {
            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址

            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Extent",

                        "esri/layers/WebTiledLayer",
                        "dojo/parser"

                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Extent,
                        WebTiledLayer,
                        parser
                    ]) => {
                        parser.parse();
                        var google2Path = "https://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
                        var map = that.view2 = new Map("viewDiv1", {

                            center: [108.604157, 23.46939],
                            zoom: 6,
                            logo: false
                        });
                        var cycleMap = new WebTiledLayer(google2Path);
                        map.addLayer(cycleMap);

                        // var view = (that.view1=that.viewObj)
                        map.on("extent-change", function (e) {
                            if (that.isFlag2) {
                                that.view1.setExtent(map.extent);
                                that.view3.setExtent(map.extent);
                                that.view4.setExtent(map.extent);
                                that.isFlag1 = false
                                that.isFlag3 = false
                                that.isFlag4 = false
                            } else if (!that.isFlag2) {
                                that.isFlag2 = true
                            }

                        });

                    }
                );
        },
        initMap3() {
            //天地图影像图层地址
            var tiandiPath = "https://t1.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=6e2b3eac41b5ab566376cbb6457759ef";
            //天地图行政图地址
            var tiandi2Path = "https://t1.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=6e2b3eac41b5ab566376cbb6457759ef"
            //天地图标注地址
            var tiandi3Path = "https://t1.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=6e2b3eac41b5ab566376cbb6457759ef"
            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址

            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Extent",

                        "esri/layers/WebTiledLayer",
                        "dojo/parser"

                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Extent,
                        WebTiledLayer,
                        parser
                    ]) => {
                        parser.parse();
                        var google2Path = "https://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
                        var map = that.view3 = new Map("viewDiv2", {

                            center: [108.604157, 23.46939],
                            zoom: 6,
                            logo: false
                        });
                        var cycleMap = new WebTiledLayer(tiandiPath);
                        map.addLayer(cycleMap);
                        var cycleMap1 = new WebTiledLayer(tiandi3Path);
                        map.addLayer(cycleMap1);
                        map.on("extent-change", function (e) {

                            if (that.isFlag3) {
                                that.view1.setExtent(map.extent);
                                that.view2.setExtent(map.extent);
                                that.view4.setExtent(map.extent);
                                that.isFlag1 = false
                                that.isFlag2 = false
                                that.isFlag4 = false
                            } else if (!that.isFlag3) {
                                that.isFlag3 = true
                            }

                        });
                    }
                );
        },
        initMap4() {
            //天地图影像图层地址
            var tiandiPath = "https://t1.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=6e2b3eac41b5ab566376cbb6457759ef";
            //天地图行政图地址
            var tiandi2Path = "https://t1.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=6e2b3eac41b5ab566376cbb6457759ef"
            //天地图标注地址
            var tiandi3Path = "https://t1.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=6e2b3eac41b5ab566376cbb6457759ef"
            let that = this;
            //  产品图层切换逻辑
            const options = {
                url: "http://192.168.2.72:8080/arcgis_js_api/library/3.9/3.9/init.js" // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址

            };
            esriLoader
                .loadModules(
                    [
                        "esri/map", "esri/geometry/Extent",

                        "esri/layers/WebTiledLayer",
                        "dojo/parser"

                    ],
                    options
                ) // 传入需要使用的类
                .then(
                    ([
                        Map, Extent,
                        WebTiledLayer,
                        parser
                    ]) => {
                        parser.parse();
                        var google2Path = "https://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
                        var map = that.view4 = new Map("viewDiv3", {

                            center: [108.604157, 23.46939],
                            zoom: 6,
                            logo: false
                        });
                        var cycleMap = new WebTiledLayer(tiandi2Path);
                        map.addLayer(cycleMap);
                        var cycleMap1 = new WebTiledLayer(tiandi3Path);
                        map.addLayer(cycleMap1);
                        map.on("extent-change", function (e) {

                            if (that.isFlag4) {
                                that.view1.setExtent(map.extent);
                                that.view2.setExtent(map.extent);
                                that.view3.setExtent(map.extent);
                                that.isFlag1 = false
                                that.isFlag2 = false
                                that.isFlag3 = false
                            } else if (!that.isFlag4) {
                                that.isFlag4 = true
                            }

                        });
                    }
                );
        },
        close() {
            this.$emit("closesplit")
        },
        //   展示卷帘
        showShutter() {

        },

        layersOpt(item) {
            this.checkItme = []
            this.checkItme.push(item.name)
            //  清空图层上的内容
            this.productLayer.clear();
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
                            that.productLayer.add(graphic)

                        })

                    }).catch(err => {
                    console.error(err);
                });
        },
         //  生成坐标算法
        getlonloat() {
            var z = 0.01;
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
                        that.productLayer.add(gra);

                    }).catch(err => {
                    console.error(err);
                });
        },
    }
};
</script>

<style lang="scss">
.esriPopup  {
    z-index:  5000;
    clear:both;
}
#screen {
    .close1 {
        position: absolute;
        z-index: 2000;
        top: 30%;
        background: #000;
        color: #fff;
        height: 100px;
        line-height: 30px;
        padding-top: 20px;
        width: 30px;
        text-align: center;
        font-size: 13.5px;
        cursor: pointer;
    }

     position: fixed;
    // z-index: 9000000;
    width: 100%;
    height: 100%;

    .activeItem {
        background: rgba(30, 37, 50, 0.8) !important;
        border-radius: 5px;
        font-weight: bold !important;
    }

    .activeI {
        color: rgb(19, 111, 205);
        font-weight: bold !important;
    }

    .rightOpt1 {
        width: 250px;
        z-index: 3000;
        position: absolute;
        top: 65px;
        right: 40px;
        height: 30px;
        background: rgba(36, 48, 51, 0.8);
        border-radius: 5px;

        .item {
            margin: 0;
            float: left;
            width: 50%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            position: relative;
            font-size: 13.5px;

            i {
                color: #fff;
                font-weight: normal;
            }

            #Layer1 {
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
                    height: 220px;
                    line-height: 30px;
                    padding: 0;

                    li {
                        border-bottom: 0.1px solid #909399;
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

                    .el-checkbox__input.is-checked+.el-checkbox__label {
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

    .screenOne {
        overflow: hidden;
        width: 50%;
        height: 50%;

        position: absolute;
        left: 0;
        border-bottom: 1px solid #000;

        .left1 {
            width: 100%;
            height: 100%;
        }

        .toggleLayer {
            width: 30px;
            height: 30px;
            background: rgb(31, 38, 51);
            z-index: 4000;
            position: absolute;
            top: 90px;
            left: 30px;
            border-radius: 5px;
            text-align: center;

            i {
                color: #fff;
                line-height: 30px;
                cursor: pointer;
            }
        }

        #ProductLayer1 {
            width: 180px;
            z-index: 5000;
            position: absolute;
            top: 60px;
            left: 80px;
            height: auto;
            background: rgba(36, 48, 51, 0.8);
            border-radius: 5px;
            display: none;

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
                height: 220px;
                line-height: 30px;
                padding: 0;

                li {
                    border-bottom: 0.1px solid #909399;
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

                .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #fff !important;
                    font-weight: bold;
                }
            }
        }

        #Layer {
            width: 180px;
            z-index: 5000;
            position: absolute;
            top: 60px;
            right: 30px;
            min-height: 380px;
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

                .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #fff !important;
                    font-weight: bold;
                }
            }
        }

        .header {
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 2000;
            height: 50px;
            background: rgba(0, 1, 10, 0.5);
            display: none;
            z-index: 3000;

            h3 {
                margin: 0;
                width: 150px;
                padding-left: 30px;
                height: 50px;
                line-height: 50px;
                color: #fff;
                font-size: 15px;
            }
        }
    }

    .screenTwo {
        width: 50%;
        height: 50%;
        overflow: hidden;
        position: absolute;
        right: 0;
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;

        #ProductLayer1 {
            width: 180px;
            z-index: 2000;
            position: absolute;
            top: 60px;
            left: 80px;
            height: auto;
            background: rgba(36, 48, 51, 0.8);
            display: none;
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
                height: 220px;
                line-height: 30px;
                padding: 0;

                li {
                    border-bottom: 0.1px solid #909399;
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

                .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #fff !important;
                    font-weight: bold;
                }
            }
        }

        .toggleLayer {
            width: 30px;
            height: 30px;
            background: rgb(31, 38, 51);
            z-index: 3000;
            position: absolute;
            top: 90px;
            left: 30px;
            border-radius: 5px;
            text-align: center;

            i {
                color: #fff;
                line-height: 30px;
                cursor: pointer;
            }
        }

        .header {
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 2000;
            height: 50px;
            background: rgba(0, 1, 10, 0.5);
            display: none;
            z-index: 3000;

            h3 {
                margin: 0;
                width: 150px;
                padding-left: 30px;
                height: 50px;
                line-height: 50px;
                color: #fff;
                font-size: 15px;
            }
        }

        .right1 {
            width: 100%;
            height: 100%;
        }
    }

    .screenThree {
        overflow: hidden;
        width: 50%;
        height: 50%;
        top: 50%;
        position: absolute;
        left: 0;

        #ProductLayer1 {
            width: 180px;
            z-index: 5000;
            position: absolute;
            top: 60px;
            left: 80px;
            height: auto;
            background: rgba(36, 48, 51, 0.8);
            border-radius: 5px;
            display: none;

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
                height: 220px;
                line-height: 30px;
                padding: 0;

                li {
                    border-bottom: 0.1px solid #909399;
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

                .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #fff !important;
                    font-weight: bold;
                }
            }
        }

        .toggleLayer {
            width: 30px;
            height: 30px;
            background: rgb(31, 38, 51);
            z-index: 3000;
            position: absolute;
            top: 90px;
            left: 30px;
            border-radius: 5px;
            text-align: center;

            i {
                color: #fff;
                line-height: 30px;
                cursor: pointer;
            }
        }

        .left2 {
            width: 100%;
            height: 100%;
        }

        .header {
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 2000;
            height: 50px;
            background: rgba(0, 1, 10, 0.5);
            display: none;
            z-index: 3000;

            h3 {
                margin: 0;
                width: 150px;
                padding-left: 30px;
                height: 50px;
                line-height: 50px;
                color: #fff;
                font-size: 15px;
            }
        }
    }

    .screenFour {
        width: 50%;
        height: 50%;
        top: 50%;
        position: absolute;
        right: 0;

        #ProductLayer1 {
            width: 180px;
            z-index: 5000;
            position: absolute;
            top: 60px;
            left: 80px;
            height: auto;
            background: rgba(36, 48, 51, 0.8);
            border-radius: 5px;
            display: none;

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
                height: 220px;
                line-height: 30px;
                padding: 0;

                li {
                    border-bottom: 0.1px solid #909399;
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

                .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #fff !important;
                    font-weight: bold;
                }
            }
        }

        border-left: 1px solid #000;

        .toggleLayer {
            width: 30px;
            height: 30px;
            background: rgb(31, 38, 51);
            z-index: 3000;
            position: absolute;
            top: 90px;
            left: 30px;
            border-radius: 5px;
            text-align: center;

            i {
                color: #fff;
                line-height: 30px;
                cursor: pointer;
            }
        }

        .right2 {
            width: 100%;
            height: 100%;
        }

        .header {
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 2000;
            height: 50px;
            background: rgba(0, 1, 10, 0.5);
            display: none;
            z-index: 3000;

            h3 {
                margin: 0;
                width: 150px;
                padding-left: 30px;
                height: 50px;
                line-height: 50px;
                color: #fff;
                font-size: 15px;
            }
        }
    }
}
</style>
