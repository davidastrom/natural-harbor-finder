<template>
  <!-- <nav-bar></nav-bar> -->
  <div
    id="page-container"
    class="flex flex-row h-screen max-h-screen"
  >
    <div
      id="side-bar"
      class="w-96 bg-stone-50 drop-shadow z-40 flex flex-col flex-none h-full max-h-full p-4 overflow-y-auto"
    >
      <search-form
        :external-location="mapSelectedPosition"
        class="mb-4"
        @current-position-chosen="clearMapClickMarker"
      />
      <harbor-card-list
        :harbors="Array.from(harborStore.$state.harbors.values())"
      />
    </div>
    <div class="relative z-0 flex-auto h-full max-h-full">
      <div class="top-4 right-4 absolute z-10">
        <avatar-menu />
      </div>
      <map-component
        ref="map"
        :markers="harborStore.getHarborsAsMarkers"
        @map-click="setSelectedPosition"
        @marker-click="setSelectedHarbor"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import MapComponent from '../../components/Map.vue';
  import SearchForm from '../../components/forms/SearchForm.vue';
  import type { LatLng, LeafletMouseEvent } from 'leaflet';
  import { useHarborStore } from '../../stores/harbors';
  import type { HarborMarker } from 'types/harborMarker';
  import HarborCardList from '../../components/HarborCardList.vue';
  import { useI18n } from 'vue-i18n';
  import AvatarMenu from '@/components/AvatarMenu.vue';

  export default defineComponent({
    name: 'MapView',
    components: {
      MapComponent,
      SearchForm,
      HarborCardList,
      AvatarMenu,
    },
    setup() {
      const { t } = useI18n();
      const harborStore = useHarborStore();

      const map = ref<InstanceType<typeof MapComponent>>();

      return { harborStore, map, t };
    },
    data() {
      return {
        mapSelectedPosition: null as null | LatLng,
      };
    },
    computed: {
      selectedHarborComputed() {
        return this.harborStore.selectedHarbor;
      },
    },
    watch: {
      selectedHarborComputed(newHarborId: string, oldHarborId: string) {
        if (newHarborId !== oldHarborId) {
          this.map?.panToHarbor(newHarborId);
        }
      },
    },
    methods: {
      setSelectedPosition(e: LeafletMouseEvent) {
        this.mapSelectedPosition = e.latlng;
      },
      setSelectedHarbor(marker: HarborMarker) {
        this.harborStore.selectHarbor(marker.harborId);
        this.map?.panToHarbor(marker.harborId);
      },
      clearMapClickMarker() {
        if (this.map) this.map.clearClickMarker();
      },
    },
  });
</script>

<style></style>
