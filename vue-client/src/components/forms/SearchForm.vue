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
      :label="t('location.useMyLocation')"
      icon="fa-solid fa-location-crosshairs"
      icon-pos="right"
      :loading="locationLoading"
      loading-icon="fa-solid fa-circle-notch fa-spin"
      @click="setCurrentLocation"
    >
  
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
          :label="t('ui.findNearestHarbor')"
          @click="submitForm"
        >
        </Button>
      </div>
    </transition>
    <transition>
      <Button
        v-show="hideForm"
        rounded
        class="w-full"
        :label="t('ui.expand')"
        icon="fa-solid fa-caret-down"
        icon-pos="right"
        @click="hideForm = false"
      >
        {{ t('ui.expand') }}
        <i class="fa-solid fa-caret-down ml-2" />
      </Button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, watch, toRef } from 'vue';
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
import { set, useGeolocation } from '@vueuse/core';

const props = defineProps({
  externalLocation: {
    type: Object as PropType<LatLng | null>,
    default: null,
  },
});

const externalLocation = toRef(props, 'externalLocation')
const emit = defineEmits(['currentPositionChosen']);
const { t } = useI18n();

const { coords } = useGeolocation();
const harborStore = useHarborStore();

const location = ref<StringLocation>({ lat: '', lng: '' });
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
  if (coords.value.latitude !== Infinity && coords.value.longitude !== Infinity) {
      setLocation(coords.value.latitude, coords.value.longitude);
  };
};

watch(
  coords, (newCoords) => {
    if (locationLoading.value && newCoords.latitude !== Infinity && newCoords.longitude !== Infinity) {
      setLocation(newCoords.latitude, newCoords.longitude);
    }
  },
);

function setLocation(latitude: number, longitude: number) {
  location.value.lat = DdToDms(latitude, true);
  location.value.lng = DdToDms(longitude, false);
  locationLoading.value = false;
}

const submitForm = async () => {
  const ddLocation = StringLocationToDdLocation(
    location.value.lat,
    location.value.lng
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
  location.value.lat = DdToDms(newLocation.lat, true);
  location.value.lng = DdToDms(newLocation.lng, false);
}
</script>

<style scoped></style>
