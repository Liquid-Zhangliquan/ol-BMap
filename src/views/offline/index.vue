<template>
  <div id="olmap" ref="map"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import TileImage from 'ol/source/TileImage';
import { Projection, addProjection, addCoordinateTransforms, transform, transformExtent } from 'ol/proj';
import { applyTransform } from 'ol/extent';
import projzh from 'projzh';

export default {
  name: 'bd-online',
  components: {},
  mounted() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      var _bd09Extent = [-20037726.37, -12474104.17, 20037726.37, 12474104.17];
      var bd09Extent = [72.004, 0.8293, 137.8347, 55.8271];
      var baiduMercator = new Projection({
        code: 'baidu',
        extent: applyTransform(bd09Extent, projzh.ll2bmerc),
        // extent: transformExtent(bd09Extent, 'EPSG:4326', 'baidu'),
        units: 'm'
      });
      addProjection(baiduMercator);
      addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
      addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);

      var bmercResolutions = new Array(19);
      for (var i = 0; i < 19; ++i) {
        bmercResolutions[i] = Math.pow(2, 18 - i);
      }
      // openlayers 6.x/5.x 解决加载百度地图模糊：
      // 【1】openlayers 6.x ：①首先调节百度瓦片参数 scaler，把参数调为 scaler=2；②我是使用 TileImage 加载的，然后设置父类参数 tilePixelRatio: 2；③调整地图 view 的属性，属性设置为constrainResolution: true；④关于百度地图偏移问题，直接使用 prozh 里的算法重新定义坐标系即可；
      // 【2】openlayers 5.x : 不要设置【1】中③即可，其他步骤调一遍就可以；
      var urls = [0, 1, 2, 3].map(function(sub) {
        return 'http://maponline' + sub + '.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt=20191119';
      });
      var baidu = new Tile({
        source: new TileImage({
          projection: 'baidu',
          maxZoom: 18,
          tileUrlFunction: function(tileCoord) {
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var z = tileCoord[0];
            var hash = (x << z) + y;
            var index = hash % urls.length;
            index = index < 0 ? index + urls.length : index;
            if (x < 0) {
              x = -x;
            }
            if (y < 0) {
              y = -y;
            }
            return './baiduTile/' + z + '/' + x + '/' + y + '.png';
          },
          tileGrid: new TileGrid({
            resolutions: bmercResolutions,
            origin: [0, 0],
            extent: transformExtent(bd09Extent, 'EPSG:4326', 'baidu'),
            tileSize: [256, 256]
          }),
          tilePixelRatio: 2
        })
      });
      var map = new Map({
        target: this.$refs.map,
        layers: [baidu],
        view: new View({
          center: transform([114.37438702652597, 30.60194738599555], 'EPSG:4326', 'baidu'),
          zoom: 14,
          projection: 'baidu',
          constrainResolution: true
        })
      });
      map.on('click', evt => {
        const coord = transform(evt.coordinate, 'baidu', 'EPSG:4326');
      });
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}
#olmap {
  width: 100%;
  height: 100%;
}
</style>
