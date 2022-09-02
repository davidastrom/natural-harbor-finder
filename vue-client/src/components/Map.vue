<template>
  <div
    ref="map"
    class="w-full h-full min-h-full z-0"
  ></div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
  import { usePositionStore } from '../stores/position';
  import L, { LatLng, latLng, type LeafletMouseEvent } from 'leaflet';
  import 'leaflet.locatecontrol';

  export default defineComponent({
    name: 'MapComponent',
    props: {},
    emits: {
      mapClick(payload: LeafletMouseEvent) {
        return payload;
      },
    },
    setup(props, { emit }) {
      const positionStore = usePositionStore();
      let lMap: L.Map | null = null;
      const watchPositionId = ref(0);
      const center = ref(latLng(0, 0));
      const zoom = ref(12);

      const map = ref<HTMLElement>();

      let clickMarker = null as L.Marker | null;

      function onMapClick(e: LeafletMouseEvent) {
        emit('mapClick', e);
        if (lMap) {
          if (!clickMarker) {
            clickMarker = new L.Marker(e.latlng, {
              icon: new L.DivIcon({
                className: 'fa-solid fa-sailboat fa-2x',
                iconSize: [27, 24],
              }),
            }).addTo(lMap);
          } else {
            clickMarker.setLatLng(e.latlng);
          }
        }
      }

      onMounted(() => {
        watchPositionId.value = positionStore.watchPosition();

        if (map.value) {
          lMap = L.map(map.value, {
            zoomControl: false,
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
          var locationControl = L.control.locate({
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
          });
          lMap.addControl(locationControl);

          positionStore.fetchPositionOnce((position) => {
            center.value = new LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            lMap?.setView(center.value, zoom.value);
          });

          locationControl.start();

          lMap.on('click', onMapClick);
        }
      });

      onBeforeUnmount(() => {
        positionStore.stopWatchingPosition(watchPositionId.value);
      });

      return {
        positionStore,
        lMap,
        map,
        watchPositionId,
        center,
        zoom,
        clickMarker,
      };
    },
    methods: {},
  });
</script>

<style>
  .map-fullscreen {
    width: 100%;
    height: 100vh;
  }
</style>
