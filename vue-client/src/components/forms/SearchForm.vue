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
        input-class="relative rounded-full w-full px-auto py-2 bg-stone-200 capitalize font-medium"
        @click="setLocation"
      >
        Use my location
        <template #suffix>
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
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
        type="checkbox"
        :options="directionValuesComputed"
        outer-class="w-100 mt-4"
        wrapper-class="flex flex-row justify-start align-center"
        label-class="ml-2"
        name="directions"
      >
      </form-kit>
      <form-kit
        type="submit"
        input-class="rounded-full w-full px-auto py-2 bg-blue-500 text-stone-100 capitalize font-medium"
      >
      </form-kit>
    </form-kit>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { FormKit } from '@formkit/vue';
import { latLng, type LatLng } from 'leaflet';
import { Direction } from '../../../types/direction';
import { usePositionStore } from '../../stores/position';

export default defineComponent({
  name: 'SearchForm',
  components: {
    FormKit,
  },
  setup() {
    const positionStore = usePositionStore();

    let location: LatLng = reactive(latLng(0, 0));
    let directions: Direction[] = reactive([]);

    let locationLoading = ref(false);

    return { positionStore, location, directions, locationLoading };
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
    submitForm(data: any) {
      let formData = data as FormResults;

      console.log(formData);
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
