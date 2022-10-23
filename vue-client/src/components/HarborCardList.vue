<template>
  <div class="flex flex-col">
    <harbor-card
      v-for="harbor in harbors"
      :key="`h-${harbor._id}`"
      :harbor="harbor"
      class="last:mb-0 mb-4"
    ></harbor-card>
  </div>
</template>

<script lang="ts">
  import type { Harbor } from 'types/harborModels';
  import { defineComponent, type PropType } from 'vue';
  import HarborCard from './HarborCard.vue';

  export default defineComponent({
    name: 'HarborCardList',
    components: { HarborCard },
    props: {
      harbors: {
        type: Array as PropType<Harbor[]>,
        default: () => [],
      },
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss"></style>
