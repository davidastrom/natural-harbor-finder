<template><map-component></map-component></template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapComponent from '../../components/Map.vue';

export default defineComponent({
  name: 'MapView',
  components: {
    MapComponent,
  },
});
</script>

<style></style>
