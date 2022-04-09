<template>
  <l-map
    ref="map"
    class="map map-fullscreen"
    style="width: 100%; height: 100vh"
    :zoom="zoom"
    v-model:center="center"
    :zoom-animation="true"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    ></l-tile-layer>
    <l-control class="leaflet-bar" :position="'bottomright'">
      <a href="#" role="button">A</a>
    </l-control>
  </l-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LMap, LTileLayer, LControl } from '@vue-leaflet/vue-leaflet';
import { usePositionStore } from '../stores/position';
import { latLng } from 'leaflet';

export default defineComponent({
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer,
    LControl,
  },
  setup() {
    const positionStore = usePositionStore();
    return { positionStore };
  },
  data() {
    return {
      zoom: 8,
      center: latLng(0, 0),
      watchPositionId: 0,
    };
  },
  mounted() {
    this.watchPositionId = this.positionStore.watchPosition();
    this.positionStore.fetchPositionOnce().then(() => {
      const center = this.positionStore.getUserPosition;
      console.log(center);
      this.center = center;
    });
  },
  beforeUnmount() {
    this.positionStore.stopWatchingPosition(this.watchPositionId);
  },
});
</script>

<style>
.map-fullscreen {
  width: 100%;
  height: 100vh;
}
</style>
