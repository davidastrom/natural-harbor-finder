<template>
  <div
    ref="map"
    class="z-0 w-full h-full min-h-full"
  ></div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
    type PropType,
  } from 'vue';
  import { usePositionStore } from '../stores/position';
  import L, { LatLng, latLng, type LeafletMouseEvent } from 'leaflet';
  import 'leaflet.locatecontrol';
  import type { HarborMarker } from 'types/harborMarker';

  export default defineComponent({
    name: 'MapComponent',
    props: {
      markers: {
        type: Array as PropType<HarborMarker[]>,
        default: () => [],
      },
    },
    emits: {
      mapClick(payload: LeafletMouseEvent) {
        return payload;
      },
      markerClick(payload: HarborMarker) {
        return payload;
      },
    },
    setup(props, { emit }) {
      const positionStore = usePositionStore();
      let lMap = ref<L.Map>();
      const watchPositionId = ref(0);
      const center = ref(latLng(0, 0));
      const zoom = ref(12);

      const map = ref<HTMLElement>();

      let clickMarker = null as L.Marker | null;
      let markerLayer = new L.FeatureGroup();
      let _dblClickTimer = null as number | null;

      function onMapClick(e: LeafletMouseEvent) {
        if (_dblClickTimer !== null) {
          return;
        }
        _dblClickTimer = setTimeout(() => {
          if (lMap.value) {
            emit('mapClick', e);
            if (!clickMarker) {
              clickMarker = new L.Marker(e.latlng, {
                icon: new L.DivIcon({
                  className: 'fa-solid fa-sailboat fa-2x',
                  iconSize: [27, 24],
                }),
              })
                .on('click', clearClickMarker)
                .addTo(lMap.value);
            } else {
              clickMarker.setLatLng(e.latlng);
            }
          }

          _dblClickTimer = null;
        }, 300);
      }

      function onMapDblClick() {
        if (_dblClickTimer) {
          clearTimeout(_dblClickTimer);
        }
        _dblClickTimer = null;
      }

      function clearClickMarker() {
        if (clickMarker && lMap.value) {
          clickMarker.removeFrom(lMap.value);
          clickMarker = null;
        }
      }

      onMounted(() => {
        watchPositionId.value = positionStore.watchPosition();

        if (map.value) {
          lMap.value = L.map(map.value, {
            zoomControl: false,
            maxZoom: 17,
          });

          lMap.value.addLayer(
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            })
          );

          lMap.value.addLayer(
            L.tileLayer('http://t1.openseamap.org/seamark/{z}/{x}/{y}.png', {
              attribution:
                'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors',
            })
          );

          lMap.value.addControl(L.control.zoom({ position: 'bottomright' }));
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
          lMap.value.addControl(locationControl);

          positionStore.fetchPositionOnce((position) => {
            center.value = new LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            lMap.value?.setView(center.value, zoom.value);
            locationControl.start();
          });

          lMap.value.on('click', onMapClick).on('dblclick', onMapDblClick);

          markerLayer.addTo(lMap.value);
        }
      });

      onBeforeUnmount(() => {
        positionStore.stopWatchingPosition(watchPositionId.value);
        if (markerLayer) {
          markerLayer.remove();
        }
        if (map.value) {
          map.value.remove();
        }
      });

      return {
        positionStore,
        lMap,
        map,
        watchPositionId,
        center,
        zoom,
        clickMarker,
        markerLayer,
        clearClickMarker,
      };
    },
    watch: {
      markers(newMarkers: HarborMarker[]) {
        this.markerLayer.clearLayers();
        newMarkers.forEach((marker) => {
          marker.on('click', (event: LeafletMouseEvent) => {
            let target = event.target as HarborMarker;
            this.$emit('markerClick', target);
          });
          this.markerLayer.addLayer(marker);
        });
        if (newMarkers.length > 0 && this.lMap) {
          this.lMap.flyTo(newMarkers[0].getLatLng());
        }
      },
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
