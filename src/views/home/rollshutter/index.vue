<template>
<transition name="custom" enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div class="UDpage">
        <div class="close" @click="close()">
            关
            闭
        </div>
        <el-row class="thanbox">

            <div id="map1">
                <div id="map2"></div>
            </div>
        </el-row>
    </div>
</transition>
</template>

<script>
import esriLoader from "esri-loader";
import $ from "jquery";
import {
    setTimeout,
    clearInterval
} from 'timers';
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
        };
    },
    props: [
        "mapOne",
        "zoomRoll", "centerRoll"
    ],
    watch: {
        zoomRoll() {
            let that = this;
            var timer = null
            clearInterval(timer)
            timer = setTimeout(function () {
                console.log(that.view2)
                that.view2.zoom = that.zoomRoll
                that.view1.zoom = that.zoomRoll
                that.view2.center = that.view1.center = that.centerRoll
            }, 2100)
        },
        // centerRoll(){
        //   let  that =this;
        // var timer = null
        // clearInterval(timer)
        //    timer= setTimeout(function(){
        //       that.view1.zoom = that.zoomRoll
        //       that.view1.center = that.centerRoll
        //     },1000)
        // }
    },
    methods: {
        mapUpFn() {
            var height = $(document).height();
            let that = this;
            const options = {
                // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
                url: "http://192.168.1.19:6001/arcjs411/init.js"
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
                        "dojo/domReady!"
                    ],
                    options
                )
                .then(
                    ([Map,
                        esriConfig,
                        esriRequest,
                        Color,
                        SceneView,
                        MapView,
                        LayerList,
                        BaseTileLayer,
                        TileInfo,
                        Extent,
                        SpatialReference
                    ]) => {

                        let map = that.mapOne
                        var view1 = that.view1 = new MapView({
                            // center: [120, 30],
                            container: "map1",
                            map: map,

                                zoom: that.zoomRoll,
                            center: that.centerRoll, // longitude, latitude
                            // zoom: 3
                        });
                        console.log(this.UPmap);

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
            let map1 = new Map({
                layers: [digitalTileLayer, AnooMarkerLayer]
            });
                        var view2 = that.view2 = new MapView({
                            // center: [120, 30],
                            map: map1,
                            container: "map2",
                            // "zoomRoll","centerRoll"
                            zoom: that.zoomRoll,
                            center: that.centerRoll, // longitude, latitude
                        });
                        console.log(this.DOWNmap);

                        let map1toplayerdiv;
                        map1toplayerdiv = map1toplayerdiv ?
                            map1toplayerdiv :
                            document.getElementById("map2");
                        console.log(map1toplayerdiv);
                        map1toplayerdiv.style.clip = "rect(0px,0px,0px,0px)";

                        view1.on("pointer-move", function (e) {
                            //释放鼠标按钮或显示触摸结束后触发
                            e.stopPropagation();
                            map1toplayerdiv = map1toplayerdiv ?
                                map1toplayerdiv :
                                document.getElementById("map2");
                            var offsetX = e.x;
                            var offsetY = e.y;
                            var width = "100%";
                            //   var height = height;
                            map1toplayerdiv.style.clip =
                                "rect(0px," + offsetX + "px," + height + "px,0px)";
                        });

                        view2.on("pointer-move", function (e) {
                            //释放鼠标按钮或显示触摸结束后触发
                            e.stopPropagation();
                            map1toplayerdiv = map1toplayerdiv ?
                                map1toplayerdiv :
                                document.getElementById("map2");
                            var offsetX = e.x;
                            var offsetY = e.y;
                            var width = "100%";

                            map1toplayerdiv.style.clip =
                                "rect(0px," + offsetX + "px," + height + "px,0px)";
                        });
                        view1.watch("animation", function (response) {
                            //地图漂移监听
                            if (response && response.state === "running") {
                                console.log("Animation in progress");
                            } else {
                                console.log("No animation");
                                view2.extent = view1.extent;
                            }
                        });
                        view2.watch("animation", function (response) {
                            //地图漂移监听
                            if (response && response.state === "running") {
                                console.log("Animation in progress");
                            } else {
                                console.log("No animation");
                                view1.extent = view2.extent;
                            }
                        });
                        view1.on("drag", function (evt) {
                            //地图拖拽
                            console.log("拖拽监听——右");
                            console.log("状态——右", evt.action);
                            if (evt.action == "end") {
                                view2.extent = view1.extent;
                            }
                        });
                        view2.on("mouse-wheel", function (evt) {
                            //滚轮监听
                            console.log(evt.deltaY);
                            setTimeout(function () {
                                view1.extent = view2.extent;
                            }, 30);
                        });
                        view1.on("mouse-wheel", function (evt) {
                            //滚轮监听
                            console.log(evt.deltaY);
                            setTimeout(function () {
                                view2.extent = view1.extent;
                            }, 30);
                        });
                    },
                    reason => {
                        console.log(reason);
                    }
                );
        },
        close() {
            this.$emit("closeShutter")

        }
    },
    mounted() {
        var timer = null
        let that = this;
        clearTimeout(timer)
        timer = setTimeout(function () {
            that.mapUpFn()
        }, 3000)
    }
};
</script>

<style lang="scss">
.UDpage {
    width: 100%;
    position: fixed;
    z-index: 9000000;
    height: 100%;

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

        #map2 {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        // #viewDivdown{
        //     position: absolute;
        //     z-index: 88;
        //     width: 100%;
        //     height: 100%;
        //     background: #eeeeee;
        //     // position: relative;
        // }
        // #dragBox{
        //     width: 100%;
        //     height: 100%;
        //     // background: limegreen;
        //     position: absolute;
        //     z-index: 99;
        //     overflow: hidden;
        //     #viewDivup{
        //         float: left;
        //         width: 80%;
        //         height: 100%;
        //         background: #eeeeee;
        //     }
        //     #empty{
        //         float: left;
        //         width: 20%;
        //         height: 100%;
        //         // background: pink;
        //         opacity: 0.9;
        //     }
        //     #line{
        //         position:absolute;
        //         z-index: 99999999999;
        //         top:0;
        //         left:80%;
        //         height:100%;
        //         width:4px;
        //         background:url("../../assets/images/barline.png") no-repeat;
        //         background-size: auto 100%;
        //         cursor:w-resize;
        //         span{
        //             margin-left: -10px;
        //             width: 30px;
        //             height: 30px;
        //             background: url("../../assets/images/scar_arrow.png") no-repeat;
        //             position: absolute;
        //             top: 49%;
        //             z-index: 99999999999999999999;
        //         }
        //     }

        // }
    }
}
</style>
