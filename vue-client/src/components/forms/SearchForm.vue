<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-medium">Find nearest harbor</h2>
    <form-kit type="form" :actions="false" @submit="submitForm">
      <div class="flex flex-wrap pb-2">
        <form-kit
          v-model="location.lat"
          type="text"
          label="Latitude"
          outer-class="w-1/2 pr-1"
          input-class="w-full rounded-full"
          name="latitude"
        ></form-kit>
        <form-kit
          v-model="location.lng"
          type="text"
          label="Longitude"
          outer-class="w-1/2 pl-1"
          input-class="w-full rounded-full"
          name="longitude"
        ></form-kit>
      </div>
      <form-kit
        type="button"
        input-class="relative w-full py-2 font-medium capitalize rounded-full px-auto bg-stone-200"
        @click="setLocation"
      >
        Use my location
        <template #suffix>
          <div class="absolute -translate-y-1/2 right-3 top-1/2">
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
      <form-kit
        v-model="directions"
        label="Shielded directions"
        type="checkbox"
        :options="directionValuesComputed"
        outer-class="mt-4 w-100"
        inner-class="flex items-center"
        wrapper-class="flex flex-row items-center justify-start"
        label-class="ml-2"
        name="directions"
      ></form-kit>
      <form-kit
        type="submit"
        input-class="w-full py-2 mt-4 font-medium capitalize bg-blue-500 rounded-full px-auto text-stone-100"
      ></form-kit>
    </form-kit>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { FormKit } from '@formkit/vue';
  import { latLng, type LatLng } from 'leaflet';
  import { Direction } from '../../../types/direction';
  import { usePositionStore } from '../../stores/position';
  import { useHarborStore } from '../../stores/harbors';

  export default defineComponent({
    name: 'SearchForm',
    components: {
      FormKit,
    },
    setup() {
      const positionStore = usePositionStore();
      const harborStore = useHarborStore();

      let location: LatLng = reactive(latLng(0, 0));
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
    computed: {
      directionValuesComputed() {
        const values = Object.entries(Direction)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([text, value]) => isNaN(Number(value)) === false)
          .map(([text, val]) => {
            return {
              value: val,
              label: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
            };
          });
        return values;
      },
    },
    methods: {
      async setLocation() {
        this.locationLoading = true;
        await this.positionStore.fetchPositionOnce().then(() => {
          let location = this.positionStore.getUserPosition;

          this.location.lat = location.lat;
          this.location.lng = location.lng;
          this.locationLoading = false;
          console.log(this.location);
        });
      },
      async submitForm(data: unknown) {
        let formData = data as FormResults;
        await this.harborStore.fetchHarbors(formData);
      },
    },
  });

  interface FormResults {
    latitude: number;
    longitude: number;
    directions: Direction[];
  }
</script>

<style scoped></style>
