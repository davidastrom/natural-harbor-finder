<template>
  <nav-bar></nav-bar>
  <div
    id="page-container"
    class="h-screen max-h-screen pt-16 -mt-16 flex flex-row"
  >
    <div
      id="side-bar"
      class="h-full max-h-full flex flex-col flex-none w-96 bg-slate-50 drop-shadow p-4 z-40"
    >
      <search-form></search-form>
    </div>
    <div class="h-full max-h-full flex-auto z-0">
      <map-component></map-component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapComponent from '../../components/Map.vue';
import NavBar from '../../components/NavBar.vue';
import SearchForm from '../../components/forms/SearchForm.vue';

export default defineComponent({
  name: 'MapView',
  components: {
    MapComponent,
    NavBar,
    SearchForm,
  },
});
</script>

<style></style>
