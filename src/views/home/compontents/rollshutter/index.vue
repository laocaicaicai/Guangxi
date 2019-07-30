<template>
<div class="UDpage">
    <div class="close1" @click="close()">
        关
        闭
    </div>
    <el-row class="thanbox">

        <div id="map1">
            <div id="map2">

            </div>
            <div class="toggleLayer" @click="toggleLayer()">
                <el-tooltip class="item" effect="dark" content="切换操作" placement="top-start">
                    <i class="el-icon-menu"></i>
                </el-tooltip>
            </div>
            <div id="Layer" v-show="showLayer">
                <div class="title">产品图层</div>
                <el-scrollbar wrap-class="scrollbar-wrapper">
                    <ul class="list-opt">
                        <li v-for="(item,index) in  LayerList" :key="index">

                            <el-checkbox :value="item.name" :label="item.name" v-model="checkItme" @change="layersOpt(item)"></el-checkbox>
                        </li>

                    </ul>
                </el-scrollbar>
            </div>
            <!-- 开启卷帘 -->
            <div id="switchTooltips">
                <span id="labelName">启用卷帘功能:</span>
                <el-tooltip :content="'启用卷帘: ' + value" placement="top">
                    <el-switch v-model="value" active-value="启用" inactive-value="关闭" @change="switchRollShutter">
                    </el-switch>
                </el-tooltip>
            </div>

        </div>
    </el-row>
</div>
</template>

<script>
import esriLoader from "esri-loader";
import $ from "jquery";
//  谷歌影像地图
import jsonData from '@/assets/guangxi.json'
const googlePath = "https://www.google.cn/maps/vt/lyrs=y@112&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
//  谷歌行政图
const google2Path = "https://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali";
export default {
    data() {
        return {
            UPmap: "", //上层地图
            DOWNmap: "", //上层地图
            viewup: "",
            viewdown: "",
            Ext: "",
            housingLayer: "",
            housingLayer2: "",
            view1: null,
            view2: null,
            isFlag1: true,
            isFlag2: true,
            value: '关闭',
            showLayer: false,
            bodergraphicsLayer: null, //边界图层
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
    // 释放地图资源
    beforeDestroy() {
        this.view1 = null
        this.view2 = null
    },
    methods: {
        switchRollShutter(val) {
            var height = $(document).height();
            var width = $(document).width()
            let map1toplayerdiv;
            map1toplayerdiv = map1toplayerdiv ?
                map1toplayerdiv :
                document.getElementById("map2");

            map1toplayerdiv.style.clip = "rect(0px,0px,0px,0px)";

            this.view1.on("mouse-move", function (e) {
                //释放鼠标按钮或显示触摸结束后触发

                e.stopPropagation();
                map1toplayerdiv = map1toplayerdiv ?
                    map1toplayerdiv :
                    document.getElementById("map2");
                var offsetX = e.x;
                var offsetY = e.y;

                if (val == "启用") {
                    map1toplayerdiv.style.clip =
                        "rect(0px," + offsetX + "px," + height + "px,0px)";
                } else {
                    map1toplayerdiv.style.clip =
                        "rect(0px," + width + "px," + height + "px,0px)";
                }

            });

            this.view2.on("mouse-move", function (e) {
                //释放鼠标按钮或显示触摸结束后触发
                e.stopPropagation();
                map1toplayerdiv = map1toplayerdiv ?
                    map1toplayerdiv :
                    document.getElementById("map2");
                var offsetX = e.x;
                var offsetY = e.y;

                if (val == "启用") {
                    map1toplayerdiv.style.clip =
                        "rect(0px," + offsetX + "px," + height + "px,0px)";
                } else {
                    map1toplayerdiv.style.clip =
                        "rect(0px," + width + "px," + height + "px,0px)";
                }
            })

        },
        mapUpFn() {
            var height = $(document).height();
            let that = this;
            const options = {
                // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
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
                )
                .then(
                    ([
                        Map, Extent,
                        MapImage, MapImageLayer,
                        WebTiledLayer,
                        GraphicsLayer,
                        parser
                    ]) => {
                        var map1 = that.view1 = new Map("map1", {
                            center: [108.604157, 23.46939],
                            zoom: 6,
                            logo: false,

                        });
                        var cycleMap1 = new WebTiledLayer(google2Path);
                        map1.addLayer(cycleMap1);
                        var map2 = that.view2 = new Map("map2", {
                            center: [108.604157, 23.46939],
                            zoom: 6,
                            logo: false,

                        });
                        var cycleMap2 = new WebTiledLayer(googlePath);
                        map2.addLayer(cycleMap2);
                     that.productLayer = new GraphicsLayer()
                     
                        map2.addLayer(that.productLayer)

                        var mil = new MapImageLayer({
                            "id": "usgs_screen_overlay1"
                        });
                        map2.addLayer(mil);
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
                        that.bodergraphicsLayer = new GraphicsLayer()
                        map2.addLayer(that.bodergraphicsLayer)
                        mi.opacity = 0.5;

                        mil.addImage(mi);
                        map2.on("load", that.drawPoint());
                        //   设置地图同步监听移动
                        map1.on("extent-change", function (e) {

                            if (that.isFlag1) {
                                that.view2.setExtent(map1.extent);

                                that.isFlag2 = false

                            } else if (!that.isFlag1) {
                                that.isFlag1 = true
                            }

                        });

                        map2.on("extent-change", function (e) {

                            if (that.isFlag2) {
                                that.view1.setExtent(map2.extent);

                                that.isFlag1 = false

                            } else if (!that.isFlag2) {
                                that.isFlag2 = true
                            }

                        });
                    },
                    reason => {
                        console.log(reason);
                    }
                );
        },
        close() {
            this.$emit("closeShutter")

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
        toggleLayer() {
            this.showLayer = !this.showLayer

            // if()

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
    },
    mounted() {
        var timer = null
        let that = this;
        clearTimeout(timer)
        timer = setTimeout(function () {
            that.mapUpFn()
        }, 100)
    }
};
</script>

<style lang="scss">
.UDpage {
    width: 100%;
    position: fixed;
  
    height: 100%;

    .close1 {
        position: absolute;
        z-index: 2500;
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

    .thanbox {
        width: 100%;

        height: 100%;
        box-sizing: border-box;

        border: 1px solid #f7f7f7;
        position: relative;

        #map1 {
            width: 100%;
            height: 100%;
            position: absolute;
        }

        #labelName {
            color: #fff;
        }

        #map2 {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2000;
        }

        .toggleLayer {
            position: absolute;
            top: 80px;
            left: 100px;
            z-index: 4000;
            background: #000;
            width: 35px;
            height: 35px;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;

            i {
                color: #fff;
                line-height: 35px;

            }
        }

        #switchTooltips {
            position: absolute;
            top: 80px;
            left: 300px;
            z-index: 4000;
        }

        #Layer {

            width: 180px;
            z-index: 5000;
            clear: both;
            position: absolute;
            top: 150px;
            left: 100px;

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
</style>
