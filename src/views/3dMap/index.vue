<template>
<div class="threeMap">
    <div class="toggleLayer" @click="toggleLayer">

        <i class="el-icon-menu"></i>

    </div>
    <div id="satellite">
        <div class="title">卫星列表</div>
        <ul class="list-opt">
            <li v-for="(item,index) in  list" :key="index">
                <el-checkbox @change="sel(item.id,item)" :checked="item.checked"><i :class="index==4?'':classicon">
                    </i> {{item.name}}</el-checkbox>
            </li>

        </ul>
    </div>

    
    <div id="main" style="width: 100%; height:89vh;">

    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    mounted() {
        var timer = null
        let that = this;
        clearTimeout(timer)
        // 异步加载模仿  避免页面卡顿
        timer = setTimeout(function () {
            that.init()
        }, 100)

    },
    beforeDestroy() {
        // 组件卸载及时释放资源避免占用内存
        if(this.viewer!=null) {
            this.viewer.shouldAnimate =false
             this.viewer = null;
        }
    },
    data() {
        return {
            classicon: "el-icon-video-camera",
            czmlData: null, //全局czml 轨道数据
            list: [{
                    id: 'Satellite/Geoeye1',
                    name: 'NPP卫星',
                    checked: true
                }, {

                    id: 'Satellite/ISS',
                    name: '高分二号',
                    checked: true
                },
                {

                    id: 'Satellite/Molniya_1-92',
                    name: '葵花8卫星',
                    checked: true
                },
                {

                    id: 'Satellite/Molniya',
                    name: 'MODIS传感器',
                    checked: false
                },
                {

                    id: 'Satellite/Moiya',
                    name: '卫星波束',
                    checked: false
                },

            ],
            viewer:null ,// 3D地球实例化初始值
        }
    },
    methods: {
        init() {

            let that = this

            var czmlobj;

            this.czmlData = new Map();

            var guge = new Cesium.UrlTemplateImageryProvider({
                url: 'http://mt0.google.cn/vt/lyrs=y@112&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Gali',
                tilingScheme: new Cesium.WebMercatorTilingScheme(),
                minimumLevel: 1,
                maximumLevel: 20
            });
            var viewer = this.viewer=new Cesium.Viewer("main", {
                baseLayerPicker: false,
                imageryProvider: guge,
                timeline: true,

                fullscreenButton: true,
                infoBox: true,
                homeButton: true,
                selectionIndicator: false,
                geocoder: false,
                sceneModePicker: false,
                navigationInstructionsInitiallyVisible: false,
                navigationHelpButton: false,
                animation: true,
                shouldAnimate: true
            });
            var terrain = new Cesium.createWorldTerrain({
                requestWaterMask: true,
                requestVertexNormals: true,

            });
            viewer.terrainProvider = terrain; //加入世界地形图
            viewer.camera.setView({
                // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
                // fromDegrees()方法，将经纬度和高程转换为世界坐标
                destination: Cesium.Cartesian3.fromDegrees(97.48, 30.67, 20000000.0),
                orientation: {
                   
                    roll: 0.0
                }
            });

            viewer.animation.viewModel.dateFormatter = localeDateTimeFormatter
            viewer.animation.viewModel.timeFormatter = localeTimeFormatter
            viewer.timeline.makeLabel = function (time) {
                return localeDateTimeFormatter(time)
            }

            // Date formatting to a global form
            function localeDateTimeFormatter(datetime, viewModel, ignoredate) {
                var julianDT = new Cesium.JulianDate();
                Cesium.JulianDate.addHours(datetime, 8, julianDT)
                var gregorianDT = Cesium.JulianDate.toGregorianDate(julianDT)
                var objDT;
                if (ignoredate)
                    objDT = '';
                else {
                    objDT = new Date(gregorianDT.year, gregorianDT.month - 1, gregorianDT.day);
                    objDT = gregorianDT.year + '年' + objDT.toLocaleString("zh-cn", {
                        month: "short"
                    }) + gregorianDT.day + '日';
                    if (viewModel || gregorianDT.hour + gregorianDT.minute === 0)
                        return objDT;
                    objDT += ' ';
                }
                return objDT + Cesium.sprintf("%02d:%02d:%02d", gregorianDT.hour, gregorianDT.minute, gregorianDT.second);
            }

            function localeTimeFormatter(time, viewModel) {
                return localeDateTimeFormatter(time, viewModel, true);
            }
            viewer._cesiumWidget._creditContainer.style.display = "none";
            viewer.camera.setView({
                // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
                // fromDegrees()方法，将经纬度和高程转换为世界坐标
                destination: Cesium.Cartesian3.fromDegrees(97.48, 30.67, 20000000.0),
                orientation: {
                    // 指向
                    //   heading:Cesium.Math.toRadians(90,0),
                    // 视角
                    //   pitch:Cesium.Math.toRadians(-90),
                    roll: 0.0
                }
            });
            var property = new Cesium.SampledPositionProperty();

            var cylinderEntity = viewer.entities.add({
                // availability:new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                //     start:start,
                // })]);
                position: property,
                orientation: new Cesium.VelocityOrientationProperty(property),

                cylinder: {
                    HeightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    length: 700000,
                    topRadius: 0,
                    bottomRadius: 700000 / 2,
                    material: Cesium.Color.RED.withAlpha(.4),
                    outline: !0,
                    numberOfVerticalLines: 0,
                    outlineColor: Cesium.Color.RED.withAlpha(.8)
                }
            });
            viewer.dataSources.add(Cesium.CzmlDataSource.load('./simple.czml')).then(function (ds) {

                czmlobj = ds;
                console.log(ds);
                var satellite = ds.entities.getById("Satellite/ISS");

                var ellipsoid = viewer.scene.globe.ellipsoid;
                var times = satellite._position._property._times;

                var values = satellite._position._property._values;
                for (var ind = 0; ind < times.length; ind++) {
                    var time = times[ind]; //Cesium.JulianDate.addSeconds( viewer.clock.currentTime,300*ind,new Cesium.JulianDate());
                    var position = satellite.position._property.getValue(time);

                    property.addSample(time, position);
                }

                cylinderEntity.position = property;
                cylinderEntity.position.setInterpolationOptions({
                    interpolationDegree: 5,
                    interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
                })

                for (var i = 0; i < czmlobj.entities._entities._array.length; i++) {
                    var key = czmlobj.entities._entities._array[i]._id;
                    var value = czmlobj.entities._entities._array[i];
                    that.czmlData.set(key, value);
                }
                
            })

        },
        toggleLayer() {
            var isShow = $("#satellite").css("display")
            console.log(isShow)
            if (isShow == 'block') {
                $("#satellite").hide()
            } else {
                $("#satellite").show()
            }
        },
        sel(id, item) {
            item.checked = !item.checked

            var obj = this.czmlData.get(id)
            obj._show = item.checked

            // console.log( this.czmlData)
        }
    }
}
</script>

<style lang="scss">

.threeMap {
    
    #intro {
        position: absolute;
        width: 300px;
        height: 350px;
        z-index: 3000;
        top: 70px;
        right: 20px;
        background: rgba(43, 53, 71, 0.5);
        border: 1px solid rgba(76, 76, 76, 0.5);
        color: #fff;
        padding: 10px 20px;
        border-radius: 10px;

        h5 {
            border-left: 2px solid rgb(19, 111, 205);
            padding-left: 10px;
        }

        .introlist {
            font-size: 13px;
            color: #ccc;
            line-height: 20px;
        }
    }

    background:#000;
    height:100vh;
    width:100%;
    position: relative;

    #satellite {
        width: 180px;
        z-index: 3000;
        position: absolute;
        top: 20px;
        left: 70px;
        min-height: 190px;
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
            margin: 0;

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

    .toggleLayer {
        width: 35px;
        height: 35px;
        background: rgb(31, 38, 51);
        z-index: 3000;
        position: absolute;
        top: 20px;
        left: 30px;
        border-radius: 5px;
        text-align: center;

        i {
            color: #fff;
            line-height: 35px;
            cursor: pointer;
        }
    }

}
</style>
