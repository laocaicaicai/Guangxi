<template>
<transition name="custom" enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div id="screen">
        <div class="close" @click="close()">
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
                <h3>在线高清海鸟图</h3>
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
                <h3>高德高清影像图</h3>
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
</transition>
</template>

<script>
import $ from "jquery";
import * as esriLoader from "esri-loader";
import {
    clearTimeout
} from 'timers';

export default {
    mounted() {
        let that = this;
        // 解决组件立即加载属性而地图暂未加载到
        var timer = null
        clearTimeout(timer)
        timer = setTimeout(function () {
            that.initMap();
            that.initMap2();
            that.initMap3();
            that.initMap4();
            that.mapHover();
            that.toggleLayer();
            that.toggleRollingshutter();
        }, 2000)

    },
    watch: {
        splitZoom() {
            let that = this;
            var timer = null
            clearTimeout(timer)
            timer = setTimeout(function () {

                that.view4.zoom = that.view3.zoom = that.view2.zoom = that.view1.zoom = that.splitZoom
                that.view4.center = that.view3.center = that.view2.center = that.view1.center = that.splitCenter
            }, 2100)
            // console.log(this.splitZoom)
            // console.log(this.view1)
            //
        }
    },
    props: [
        "viewObj",
        "splitZoom", "splitCenter"
    ],
    data() {
        return {
            view1: null,
            view2: null,
            view3: null,
            view4: null
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
                }

            });
        },
        // 加载第一个地图初始化
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
                        ImageryLayer
                    ]) => {
                        // var map = new Map({
                        //   basemap: "streets", // The initial basemap to toggle from
                        //   ground: "world-elevation"
                        // });
                        var map = that.viewObj

                        var view = (that.view1 = new MapView({
                            container: "viewDivOne",
                            map: map,
                            zoom: that.splitZoom,
                            center: that.splitCenter, // longitude, latitude
                        }));
                        view.ui._removeComponents(["attribution"]);

                        // var view = (that.view1=that.viewObj)
                        view.on("drag", function (e) {
                            that.view1.extent = view.extent;
                            that.view2.extent = view.extent;
                            that.view3.extent = view.extent;
                            that.view4.extent = view.extent;
                        });
                        view.watch("animation", function (response) {
                            //地图漂移监听
                            if (response && response.state === "running") {} else {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                            }
                        });
                        view.on("mouse-wheel", function (evt) {
                            //延时器：避免滚轮效果监测过于灵敏，而出现效果误差
                            setTimeout(function () {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                            }, 30);
                        });
                    }
                );
        },
        initMap2() {
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
                        "esri/layers/WebTileLayer",
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
                        WebTileLayer
                    ]) => {

                        let TintLayer = BaseTileLayer.createSubclass({
                            properties: {
                                urlTemplate: null,
                                tint: {
                                    value: null,
                                    type: Color
                                }
                            },
                            // generate the tile url for NumericalForecastSlide given level, row and column
                            getTileUrl: function (level, row, col) {
                                return this.urlTemplate
                                    .replace("{z}", level)
                                    .replace("{x}", col)
                                    .replace("{y}", row);
                            },
                            fetchTile: function (level, row, col) {
                                let url = this.getTileUrl(level, row, col);
                                return esriRequest(url, {
                                    responseType: "image",
                                    allowImageDataAccess: true
                                }).then(
                                    function (response) {
                                        // when esri request resolves successfully
                                        // get the image from the response
                                        var image = response.data;
                                        var width = this.tileInfo.size[0];
                                        var height = this.tileInfo.size[0];

                                        // create NumericalForecastSlide canvas with 2D rendering context
                                        var canvas = document.createElement("canvas");
                                        var context = canvas.getContext("2d");
                                        canvas.width = width;
                                        canvas.height = height;

                                        // Draw the blended image onto the canvas.
                                        context.drawImage(image, 0, 0, width, height);

                                        return canvas;
                                    }.bind(this)
                                );
                            }
                        });
                        esriConfig.request.corsEnabledServers.push("http://www.google.cn/");

                        let stamenTileLayer = new TintLayer({
                            urlTemplate: "http://www.google.cn/maps/vt/lyrs=s@157&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                            tint: new Color("#004FBB"),
                            title: "影像"
                        });
                        let AnooMarkerLayer = new TintLayer({
                            urlTemplate: "http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                            tint: new Color("#004FBB"),
                            title: "标注"
                        });
                        let digitalTileLayer = new TintLayer({
                            urlTemplate: "http://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                            tint: new Color("#004FBB"),
                            title: "地图"
                        });
                        let map = new Map({
                            layers: [digitalTileLayer, AnooMarkerLayer]
                        });

                        // var map = new Map({
                        //   basemap: "topo-vector",
                        //   ground: "world-elevation" // show elevation
                        // });

                        var view = (that.view2 = new MapView({
                            container: "viewDiv1",
                            map: map,
                            zoom: that.splitZoom,
                            center: that.splitCenter,
                        }));
                        view.ui._removeComponents(["attribution"]);

                        view.on("drag", function (e) {
                            that.view1.extent = view.extent;
                            that.view2.extent = view.extent;
                            that.view3.extent = view.extent;
                            that.view4.extent = view.extent;
                        });
                        view.watch("animation", function (response) {
                            //地图漂移监听
                            if (response && response.state === "running") {
                                console.log("Animation in progress");
                            } else {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                            }
                        });
                        view.on("mouse-wheel", function (evt) {
                            //延时器：避免滚轮效果监测过于灵敏，而出现效果误差
                            setTimeout(function () {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                            }, 30);
                        });
                    }
                );
        },
        initMap3() {
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
                        "esri/layers/WebTileLayer",
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
                        WebTileLayer
                    ]) => {
                        var map = new Map({
                            basemap: "hybrid",
                            ground: "world-elevation" // show elevation
                        });

                        var view = (that.view3 = new MapView({
                            container: "viewDiv2",
                            map: map,
                            zoom: that.splitZoom,
                            center: that.splitCenter, // longitude, latitude
                        }));
                        view.ui._removeComponents(["attribution"]);

                        view.on("drag", function (e) {
                            that.view1.extent = view.extent;
                            that.view2.extent = view.extent;
                            that.view3.extent = view.extent;
                            that.view4.extent = view.extent;
                        });
                        view.watch("animation", function (response) {
                            //地图漂移监听
                            if (response && response.state === "running") {
                                console.log("Animation in progress");
                            } else {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                                // that.view1.extent = view.extent;
                            }
                        });
                        view.on("mouse-wheel", function (evt) {
                            //延时器：避免滚轮效果监测过于灵敏，而出现效果误差
                            setTimeout(function () {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                            }, 30);
                        });
                    }
                );
        },
        initMap4() {
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
                        "esri/layers/WebTileLayer",
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
                        WebTileLayer
                    ]) => {
                         let TintLayer = BaseTileLayer.createSubclass({
                properties: {
                    urlTemplate: null,
                    tint: {
                        value: null,
                        type: Color
                    }
                },

                // generate the tile url for a given level, row and column
                getTileUrl: function (level, row, col) {
                    return this.urlTemplate
                        .replace("{z}", level)
                        .replace("{x}", col)
                        .replace("{y}", row);
                },

                // This method fetches tiles for the specified level and size.
                // Override this method to process the data returned from the server.
                fetchTile: function (level, row, col) {
                    // call getTileUrl() method to construct the URL to tiles
                    // for a given level, row and col provided by the LayerView
                    var url = this.getTileUrl(level, row, col);

                    // request for tiles based on the generated url
                    // set allowImageDataAccess to true to allow
                    // cross-domain access to create WebGL textures for 3D.
                    return esriRequest(url, {
                        responseType: "image",
                        allowImageDataAccess: true
                    }).then(
                        function (response) {
                            // when esri request resolves successfully
                            // get the image from the response
                            var image = response.data;
                            var width = this.tileInfo.size[0];
                            var height = this.tileInfo.size[0];

                            // create a canvas with 2D rendering context
                            var canvas = document.createElement("canvas");
                            var context = canvas.getContext("2d");
                            canvas.width = width;
                            canvas.height = height;

                            // Draw the blended image onto the canvas.
                            context.drawImage(image, 0, 0, width, height);

                            return canvas;
                        }.bind(this)
                    );
                }
            });

            // *******************************************************
            // Start of JavaScript application
            // *******************************************************

            // Add stamen url to the list of servers known to support CORS specification.
            esriConfig.request.corsEnabledServers.push("webst01.is.autonavi.com");

            // Create a new instance of the TintLayer and set its properties
            let digitallTileLayer = new TintLayer({
                urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                tint: new Color("#004FBB"),
                title: "高德"
            });
            let satelliteTileLayer = new TintLayer({
                urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                tint: new Color("#004FBB"),
                title: "高德"
            });
            let stamenTileLayer = new TintLayer({
                urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
                tint: new Color("#004FBB"),
                title: "高德"
            });

            // add the new instance of the custom tile layer the map
            let map = new Map({
                layers: [satelliteTileLayer, stamenTileLayer]
            });


                        var view = (that.view4 = new MapView({
                            container: "viewDiv3",
                            map: map,
                            zoom: that.splitZoom,
                            center: that.splitCenter, // longitude, latitude
                        }));
                        view.on("drag", function (e) {
                            that.view1.extent = view.extent;
                            that.view2.extent = view.extent;
                            that.view3.extent = view.extent;
                            that.view4.extent = view.extent;
                        });
                        view.ui._removeComponents(["attribution"]);

                        view.watch("animation", function (response) {
                            //地图漂移监听
                            if (response && response.state === "running") {
                                console.log("Animation in progress");
                            } else {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                                // that.view1.extent = view.extent;
                            }
                        });
                        view.on("mouse-wheel", function (evt) {
                            //延时器：避免滚轮效果监测过于灵敏，而出现效果误差
                            setTimeout(function () {
                                that.view1.extent = view.extent;
                                that.view2.extent = view.extent;
                                that.view3.extent = view.extent;
                                that.view4.extent = view.extent;
                            }, 30);
                        });
                    }
                );
        },
        close() {
            this.$emit("closesplit")
        },
        //   展示卷帘
        showShutter() {

            this.$emit("showShutter")
        },
    }
};
</script>

<style lang="scss">
#screen {
    .close {
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
    z-index: 9000000;
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
