<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-medium">Find nearest harbor</h2>
    <form-kit
      type="form"
      :actions="false"
      @submit="submitForm"
    >
      <position-form-group v-model="location"></position-form-group>

      <form-kit
        type="button"
        input-class="px-auto bg-stone-200 relative w-full py-2 font-medium capitalize rounded-full"
        @click="setCurrentLocation"
      >
        Use my location
        <template #suffix>
          <div class="right-3 top-1/2 absolute -translate-y-1/2">
            <i
              class="text-xl"
              :class="
                locationLoading
                  ? 'fa-solid fa-circle-notch fa-spin'
                  : 'fa-solid fa-location-crosshairs'
              "
            ></i>
          </div>
        </template>
      </form-kit>

      <direction-form-input
        v-model="directions"
        name="directions"
      ></direction-form-input>

      <form-kit
        type="submit"
        input-class="px-auto text-stone-100 w-full py-2 mt-4 font-medium capitalize bg-blue-500 rounded-full"
      ></form-kit>
    </form-kit>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, type PropType } from 'vue';
  import { FormKit } from '@formkit/vue';
  import { usePositionStore } from '../../stores/position';
  import { useHarborStore } from '../../stores/harbors';
  import type { Direction } from 'types/direction';
  import PositionFormGroup from './formComponents/PositionFormGroup.vue';
  import DirectionFormInput from './formComponents/DirectionFormInput.vue';
  import type { StringLocation } from 'types/stringLocation';
  import type { FetchHarborIM } from 'types/harborInputModels';
  import type { LatLng } from 'leaflet';
  import {
    DdToDms,
    StringLocationToDdLocation,
  } from '../../helpers/locationHelpers';

  export default defineComponent({
    name: 'SearchForm',
    components: {
      FormKit,
      PositionFormGroup,
      DirectionFormInput,
    },
    props: {
      externalLocation: {
        type: Object as PropType<LatLng | null>,
        default: null,
      },
    },
    setup() {
      const positionStore = usePositionStore();
      const harborStore = useHarborStore();

      let location: StringLocation = reactive({ lat: '', lng: '' });
      let directions: Direction[] = reactive([]);

      let locationLoading = ref(false);

      return {
        positionStore,
        harborStore,
        location,
        directions,
        locationLoading,
      };
    },
    computed: {},
    watch: {
      externalLocation(newLocation: LatLng | null, oldLocation: LatLng | null) {
        if (newLocation && newLocation !== oldLocation) {
          this.setSelectedLocation(newLocation);
        }
      },
    },
    methods: {
      async setCurrentLocation() {
        this.locationLoading = true;
        return this.positionStore.fetchPositionOnce(
          (position) => {
            this.location.lat = DdToDms(position.coords.latitude, true);
            this.location.lng = DdToDms(position.coords.longitude, false);
            this.locationLoading = false;
          },
          () => {
            const location = this.positionStore.getUserPosition;
            this.location.lat = DdToDms(location.lat, true);
            this.location.lng = DdToDms(location.lng, false);
            this.locationLoading = false;
          }
        );
      },
      async submitForm(data: unknown) {
        let formData = data as FormResults;
        let ddLocation = StringLocationToDdLocation(
          formData.location.lat,
          formData.location.lng
        );
        let fetchData: FetchHarborIM = {
          lat: ddLocation.lat,
          lng: ddLocation.lng,
          directions: formData.directions,
        };
        await this.harborStore.fetchHarbors(fetchData);
      },
      setSelectedLocation(location: LatLng) {
        this.location.lat = DdToDms(location.lat, true);
        this.location.lng = DdToDms(location.lng, false);
      },
    },
  });

  interface FormResults {
    location: StringLocation;
    directions: Direction[];
  }
</script>

<style scoped></style>
