<template>
  <div
    ref="map"
    class="w-full h-full min-h-full z-0"
  ></div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
  import { usePositionStore } from '../stores/position';
  import L, { LatLng, latLng } from 'leaflet';
  import 'leaflet.locatecontrol';

  export default defineComponent({
    name: 'MapComponent',
    setup() {
      const positionStore = usePositionStore();
      let lMap: L.Map | null = null;
      const watchPositionId = ref(0);
      const center = ref(latLng(0, 0));
      const zoom = ref(12);

      const map = ref<HTMLElement>();

      onMounted(() => {
        watchPositionId.value = positionStore.watchPosition();

        if (map.value) {
          lMap = L.map(map.value, {
            zoomControl: false,
          });

          positionStore.fetchPositionOnce((position) => {
            center.value = new LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            lMap?.setView(center.value, zoom.value);
          });

          lMap.addLayer(
            L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
              maxZoom: 17,
              attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            })
          );

          lMap.addLayer(
            L.tileLayer(
              'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
              {
                attribution:
                  'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors',
              }
            )
          );

          lMap.addControl(L.control.zoom({ position: 'bottomright' }));
          lMap.addControl(
            L.control.locate({
              position: 'bottomright',
              clickBehavior: {
                inView: 'stop',
                outOfView: 'setView',
                inViewNotFollowing: 'setView',
              },
              setView: 'untilPan',
              flyTo: true,
              icon: 'fa-solid fa-location-crosshairs fa-fw text-xl',
              cacheLocation: true,
              locateOptions: {
                enableHighAccuracy: true,
                watch: true,
                maximumAge: 2000,
              },
            })
          );
        }
      });

      onBeforeUnmount(() => {
        positionStore.stopWatchingPosition(watchPositionId.value);
      });

      return { positionStore, lMap, map, watchPositionId, center, zoom };
    },
  });
</script>

<style>
  .map-fullscreen {
    width: 100%;
    height: 100vh;
  }
</style>
