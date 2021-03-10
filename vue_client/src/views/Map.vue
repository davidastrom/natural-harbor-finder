<template>
  <div class="home">
    <MapView />
  </div>
</template>

<script>
// @ is an alias to /src
import MapView from "@/components/MapView.vue";

export default {
  name: "Map",
  components: {
    MapView
  }
};
</script>
