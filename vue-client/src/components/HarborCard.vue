<template>
  <div class="drop-shadow flex flex-col p-4 bg-white rounded-md">
    <div class="flex items-start justify-between">
      <h3 class="text-xl font-normal">{{ harbor.name }}</h3>
      <div class="text-stone-800 flex gap-2 text-base">
        <harbor-type-icon :harbor-type="harbor.harborType"></harbor-type-icon>
        <i class="fa-solid fa-star text-stone-200"></i>
      </div>
    </div>
    <div class="gap-x-2 flex flex-wrap">
      <div class="flex-nowrap flex items-center">
        <i
          class="fa-solid fa-map-location-dot fa-fw text-stone-800 mr-1 text-sm"
        ></i>
        <span class="text-stone-600 text-sm">
          {{ latitudeComputed }} |
          {{ longitudeComputed }}
        </span>
      </div>
      <div class="flex-nowrap flex items-center">
        <i class="fa-solid fa-compass fa-fw text-stone-800 mr-1 text-sm"></i>
        <span class="text-stone-600 text-sm">
          {{ shieldedDirectionsComputed }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { DdToDms } from '@/helpers/locationHelpers';
  import type { Harbor } from 'types/harborModels';
  import { defineComponent, type PropType } from 'vue';
  import HarborTypeIcon from './HarborTypeIcon.vue';
  import { DirectionShort } from '../../types/direction';

  export default defineComponent({
    name: 'HarborCard',
    props: {
      harbor: {
        type: Object as PropType<Harbor>,
        default: () => {
          return {};
        },
      },
    },
    computed: {
      latitudeComputed() {
        return DdToDms(this.harbor.location.lat, true);
      },
      longitudeComputed() {
        return DdToDms(this.harbor.location.lng, false);
      },
      shieldedDirectionsComputed() {
        const set = [
          ...new Set(this.harbor.details.flatMap((d) => d.shieldedDirections)),
        ];
        console.log(set);
        return set
          .sort()
          .map((d) => DirectionShort[d])
          .join(' | ');
      },
    },
    components: { HarborTypeIcon },
  });
</script>

<style lang="scss"></style>
