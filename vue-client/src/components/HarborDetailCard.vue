<template>
  <div class="px-4 py-2">
    <h4>{{ detail.name }}</h4>
    <div class="gap-x-2 flex flex-wrap">
      <div
        v-if="detail.location"
        class="flex-nowrap flex items-center"
      >
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
    <div class="flex flex-wrap gap-1 text-xs">
      <div
        v-if="detail.SXKBuoy"
        class="px-2 py-1 text-white bg-blue-500 rounded-full"
      >
        SXK-buoy
      </div>
      <div
        v-if="detail.anchor"
        class="px-2 py-1 text-white bg-green-500 rounded-full"
      >
        Anchor
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { HarborDetail } from 'types/harborModels';
  import { DdToDms } from '@/helpers/locationHelpers';
  import { DirectionShort } from 'types/direction';

  export default defineComponent({
    name: 'HarborDetailCard',
    props: {
      detail: {
        type: Object as PropType<HarborDetail>,
        default: () => {
          return {};
        },
      },
    },
    computed: {
      latitudeComputed() {
        if (this.detail.location) {
          return DdToDms(this.detail.location.lat, true);
        }
        return '';
      },
      longitudeComputed() {
        if (this.detail.location) {
          return DdToDms(this.detail.location.lng, false);
        }
        return '';
      },
      shieldedDirectionsComputed() {
        return [...this.detail.shieldedDirections]
          .sort()
          .map((d) => DirectionShort[d])
          .join(' | ');
      },
    },
  });
</script>

<style lang="scss"></style>
