<template>
  <div
    class="drop-shadow flex flex-col p-4 bg-white rounded-md"
    @click="selectCard"
  >
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
    <template v-if="selected">
      <div
        v-if="harbor.book"
        class="flex"
      >
        <i class="fa-solid fa-book fa-fw text-stone-800 mr-1 text-sm"></i>
        <span class="text-stone-800 text-sm">
          {{ harbor.book.title }}
        </span>
        <span
          v-if="harbor.book.page"
          class="text-stone-600 text-sm"
        >
          &nbsp;- p.{{ harbor.book.page }}
        </span>
        <span
          v-if="harbor.book.ref"
          class="text-stone-600 text-sm"
        >
          &nbsp;| #{{ harbor.book.ref }}
        </span>
      </div>
      <ul>
        <li
          v-for="(detail, index) in harbor.details"
          :key="`d-${index}`"
          class="hover:bg-stone-50 ml-2 rounded-md"
        >
          <harbor-detail-card :detail="detail"></harbor-detail-card>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import { DdToDms } from '@/helpers/locationHelpers';
  import type { Harbor } from 'types/harborModels';
  import { defineComponent, type PropType } from 'vue';
  import HarborTypeIcon from './HarborTypeIcon.vue';
  import { DirectionShort } from '../../types/direction';
  import HarborDetailCard from './HarborDetailCard.vue';

  export default defineComponent({
    name: 'HarborCard',
    components: {
      HarborTypeIcon,
      HarborDetailCard,
    },
    props: {
      harbor: {
        type: Object as PropType<Harbor>,
        default: () => {
          return {};
        },
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },
    emits: {
      selectHarbor(payload: string) {
        return payload;
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
        return set
          .sort()
          .map((d) => DirectionShort[d])
          .join(' | ');
      },
    },
    methods: {
      selectCard() {
        this.$emit('selectHarbor', this.harbor._id);
      },
    },
  });
</script>

<style lang="scss"></style>
