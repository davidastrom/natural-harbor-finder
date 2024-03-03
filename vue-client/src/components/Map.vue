<template>
  <div
    ref="map"
    class="z-0 w-full h-full min-h-full"
  />
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted, ref, type PropType } from 'vue';
  import L, { LatLng, latLng, type LeafletMouseEvent } from 'leaflet';
  import 'leaflet.locatecontrol';
  import type { HarborMarker } from 'types/harborMarker';
import { useGeolocation } from '@vueuse/core';

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
      const lMap = ref<L.Map>();
      const { coords, error: locationError } = useGeolocation();
      const mapStartPosInitiated = ref(false);
      const center = ref(latLng(0, 0));
      const zoom = ref(12);

      const map = ref<HTMLElement>();

      let clickMarker = null as L.Marker | null;
      const markerLayer = new L.FeatureGroup();
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
                  iconAnchor: [13.5, 16],
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

      function initMap() {
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
            L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
              attribution:
                'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors',
            })
          );

          lMap.value.addControl(L.control.zoom({ position: 'bottomright' }));
          const locationControl = L.control.locate({
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


          if (coords.value && coords.value.latitude !== Infinity && coords.value.longitude !== Infinity) {
            console.log('coords', coords.value);
            center.value = new LatLng(coords.value.latitude, coords.value.longitude);
            lMap.value?.setView(center.value, zoom.value);
            mapStartPosInitiated.value = true;
          }
          
          locationControl.start();

          lMap.value.on('click', onMapClick).on('dblclick', onMapDblClick);

          markerLayer.addTo(lMap.value);
        }
      }

      onMounted(() => {
        initMap();
      });

      onBeforeUnmount(() => {
        if (markerLayer) {
          markerLayer.remove();
        }
        if (map.value) {
          map.value.remove();
        }
      });

      return {
        lMap,
        map,
        center,
        zoom,
        clickMarker,
        markerLayer,
        clearClickMarker,
        initMap,
        mapStartPosInitiated,
        coords,
        locationError,
      };
    },
    watch: {
      markers(newMarkers: HarborMarker[]) {
        this.markerLayer.clearLayers();
        newMarkers.forEach((marker) => {
          marker.on('click', (event: LeafletMouseEvent) => {
            const target = event.target as HarborMarker;
            this.$emit('markerClick', target);
          });
          this.markerLayer.addLayer(marker);
        });
        if (newMarkers.length > 0 && this.lMap) {
          this.lMap.flyTo(newMarkers[0].getLatLng());
        }
      },
      map(newMap: HTMLElement, oldMap: HTMLElement) {
        if (newMap !== oldMap) {
          if (this.lMap) {
            this.lMap.invalidateSize();
          } else {
            this.initMap();
          }
        }
      },
      coords(newCoords: GeolocationCoordinates) {
        if (newCoords && !this.mapStartPosInitiated && newCoords.latitude !== Infinity && newCoords.longitude !== Infinity) {
          this.center = new LatLng(newCoords.latitude, newCoords.longitude);
          this.lMap?.setView(this.center, this.zoom);
          this.mapStartPosInitiated = true;
        }
      },
    },
    methods: {
      panToHarbor(harborId: string) {
        const harborMarker = this.markers.find((marker) => marker.harborId === harborId);
        if (harborMarker && this.lMap) {
          this.lMap.panTo(harborMarker.getLatLng());
        }
      },
    },
  });
</script>

<style>
  .map-fullscreen {
    width: 100%;
    height: 100vh;
  }
</style>
