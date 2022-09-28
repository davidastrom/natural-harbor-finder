<template>
  <nav-bar></nav-bar>
  <div
    id="page-container"
    class="flex flex-row h-screen max-h-screen pt-16 -mt-16"
  >
    <div
      id="side-bar"
      class="w-96 bg-slate-50 drop-shadow z-40 flex flex-col flex-none h-full max-h-full p-4 overflow-y-auto"
    >
      <search-form
        :external-location="mapSelectedPosition"
        @current-position-chosen="clearMapClickMarker"
      ></search-form>
    </div>
    <div class="z-0 flex-auto h-full max-h-full">
      <map-component
        ref="map"
        :markers="harborStore.getHarborsAsMarkers"
        @map-click="setSelectedPosition"
        @marker-click="setSelectedHarbor"
      ></map-component>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import MapComponent from '../../components/Map.vue';
  import NavBar from '../../components/NavBar.vue';
  import SearchForm from '../../components/forms/SearchForm.vue';
  import type { LatLng, LeafletMouseEvent } from 'leaflet';
  import { useHarborStore } from '../../stores/harbors';
  import type { HarborMarker } from 'types/harborMarker';

  export default defineComponent({
    name: 'MapView',
    components: {
      MapComponent,
      NavBar,
      SearchForm,
    },
    setup() {
      const harborStore = useHarborStore();

      const map = ref<InstanceType<typeof MapComponent>>();

      return { harborStore, map };
    },
    data() {
      return {
        mapSelectedPosition: null as null | LatLng,
      };
    },
    methods: {
      setSelectedPosition(e: LeafletMouseEvent) {
        this.mapSelectedPosition = e.latlng;
      },
      setSelectedHarbor(marker: HarborMarker) {
        console.log(marker.harborId);
        this.harborStore.selectHarbor(marker.harborId);
      },
      clearMapClickMarker() {
        if (this.map) this.map.clearClickMarker();
      },
    },
  });
</script>

<style></style>
