<template>
  <div class="flex flex-col">
    <harbor-card
      v-for="harbor in harbors"
      :key="`h-${harbor._id}`"
      :harbor="harbor"
      :selected="harbor._id === harborStore.selectedHarbor"
      class="last:mb-0 mb-4"
      @select-harbor="selectHarbor($event)"
    ></harbor-card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'HarborCardList',
  };
</script>

<script lang="ts" setup>
  import type { Harbor } from 'types/harborModels';
  import HarborCard from './HarborCard.vue';
  import { useHarborStore } from '../stores/harbors';
  import type { PropType } from 'vue';

  defineProps({
    harbors: {
      type: Array as PropType<Harbor[]>,
      default: () => [],
    },
  });

  const harborStore = useHarborStore();

  function selectHarbor(harborId: string) {
    if (harborStore.selectedHarbor != harborId) {
      harborStore.selectHarbor(harborId);
    }
  }
</script>

<style lang="scss"></style>
