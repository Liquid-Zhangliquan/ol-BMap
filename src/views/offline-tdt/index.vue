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
      var tdtLayer = new Tile({
        source: new XYZ({
          url: '/tdtTile/{z}/{y}/{x}.png'
        })
      });
      var map = new Map({
        target: this.$refs.map,
        layers: [tdtLayer],
        view: new View({
          center: [113.92, 31.5],
          zoom: 5,
          projection: 'EPSG:4326'
        })
      });
      map.on('click', evt => {
        console.log(evt.coordinate);
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
