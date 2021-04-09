<template>
  <div id="mapContainer" ref="map"></div>
</template>

<script>
import * as maptalks from '../../assets/lib/maptalks/maptalks';
// import '../../assets/lib/maptalks/maptalks.css';
export default {
  name: 'bd-online',
  components: {},
  mounted() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      var map = new maptalks.Map('mapContainer', {
        center: [105.08052356963802, 36.04231948670001],
        zoom: 5,
        minZoom: 1,
        maxZoom: 19,
        spatialReference: {
          projection: 'baidu'
        },
        baseLayer: new maptalks.TileLayer('base', {
          // urlTemplate: 'http://maponline{s}.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt=20191119',
          urlTemplate: (x, y, z, domain) => {
            if (x < 0) {
              x = 'M' + -x;
            }
            if (y < 0) {
              y = 'M' + -y;
            }
            return `http://maponline${domain}.bdimg.com/tile/?qt=vtile&x=${x}&y=${y}&z=${z}&styles=pl&scaler=2&udt=20191119`;
          },
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          attribution: '© <a target="_blank" href="http://map.baidu.com">Baidu</a> '
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
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
