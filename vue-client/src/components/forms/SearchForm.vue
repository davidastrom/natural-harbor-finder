<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-medium">
      {{ t('ui.findNearestHarbor') }}
    </h2>
    
    <position-form-group v-model="location" />

    <Button
      rounded
      severity="secondary"
      class="w-full mb-4"
      @click="setCurrentLocation"
    >
      {{ t('location.useMyLocation') }}
      <div class="right-3 top-1/2 absolute -translate-y-1/2">
        <i
          class="text-xl"
          :class="
            locationLoading
              ? 'fa-solid fa-circle-notch fa-spin'
              : 'fa-solid fa-location-crosshairs'
          "
        />
      </div>
    </Button>
    <transition>
      <div
        v-show="!hideForm"
        class="flex flex-col gap-4"
      >
        <direction-form-input
          v-model="directions"
          name="directions"
        />
        <Button
          rounded
          class="w-full"
          @click="submitForm"
        >
          {{ t('ui.findNearestHarbor') }}
        </Button>
      </div>
    </transition>
    <transition>
      <Button
        v-show="hideForm"
        rounded
        class="w-full"
        @click="hideForm = false"
      >
        {{ t('ui.expand') }}
        <i class="ml-2 fa-solid fa-caret-down" />
      </Button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, type PropType, watch, toRef } from 'vue';
import { usePositionStore } from '../../stores/position';
import { useHarborStore } from '../../stores/harbors';
import type { Direction } from 'types/direction';
import PositionFormGroup from './formComponents/PositionFormGroup.vue';
import DirectionFormInput from './formComponents/DirectionFormInput.vue';
import type { StringLocation } from 'types/stringLocation';
import type { FetchHarborIM } from 'types/harborInputModels';
import type { LatLng } from 'leaflet';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import {
  DdToDms,
  StringLocationToDdLocation,
} from '../../helpers/locationHelpers';

const props = defineProps({
  externalLocation: {
    type: Object as PropType<LatLng | null>,
    default: null,
  },
});

const externalLocation = toRef(props, 'externalLocation')
const emit = defineEmits(['currentPositionChosen']);
const { t } = useI18n();

const positionStore = usePositionStore();
const harborStore = useHarborStore();

const location: StringLocation = reactive({ lat: '', lng: '' });
const directions = ref<Direction[]>([]);

const locationLoading = ref(false);
const hideForm = ref(false);

      
watch(
  externalLocation, (newLocation: LatLng | null, oldLocation: LatLng | null) => {
    if (newLocation && newLocation !== oldLocation) {
      setSelectedLocation(newLocation);
    }
  },
);

const setCurrentLocation = async () => {
  locationLoading.value = true;
  emit('currentPositionChosen');
  hideForm.value = false;
  return positionStore.fetchPositionOnce(
    (position) => {
      location.lat = DdToDms(position.coords.latitude, true);
      location.lng = DdToDms(position.coords.longitude, false);
      locationLoading.value = false;
    },
    () => {
      const userLocation = positionStore.getUserPosition;
      location.lat = DdToDms(userLocation.lat, true);
      location.lng = DdToDms(userLocation.lng, false);
      locationLoading.value = false;
    }
  );
};

const submitForm = async () => {
  const ddLocation = StringLocationToDdLocation(
    location.lat,
    location.lng
  );
  const fetchData: FetchHarborIM = {
    lat: ddLocation.lat,
    lng: ddLocation.lng,
    directions: directions.value,
  };
  await harborStore.fetchHarbors(fetchData);
  hideForm.value = true;
}

const setSelectedLocation = (newLocation: LatLng) => {
  location.lat = DdToDms(newLocation.lat, true);
  location.lng = DdToDms(newLocation.lng, false);
}
</script>

<style scoped></style>
