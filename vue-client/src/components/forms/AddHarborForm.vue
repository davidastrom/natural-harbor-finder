<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-medium">Add Harbor</h2>
    <form-kit type="form" :actions="false" @submit="submitForm">
      <form-kit
        v-model="harbor.name"
        type="text"
        label="Name"
        input-class="w-full rounded-full"
        name="name"
      ></form-kit>

      <form-kit v-model="harbor.location" type="group" name="location">
        <div class="flex flex-wrap pb-2">
          <form-kit
            type="text"
            label="Latitude"
            outer-class="w-1/2 pr-1"
            input-class="w-full rounded-full"
            name="lat"
          ></form-kit>
          <form-kit
            type="text"
            label="Longitude"
            outer-class="w-1/2 pl-1"
            input-class="w-full rounded-full"
            name="lng"
          ></form-kit>
        </div>
      </form-kit>

      <form-kit
        v-model="harbor.chartNumber"
        type="number"
        label="Chart number"
        input-class="w-full rounded-full"
        name="chartNumber"
      ></form-kit>

      <form-kit
        v-model="harbor.harborType"
        type="select"
        :options="harborTypeValuesComputed"
        label="Harbor type"
        input-class="w-full rounded-full"
        name="harborType"
      ></form-kit>

      <form-kit
        v-model="harbor.hasBookRef"
        type="checkbox"
        label="Reference book"
        label-class="ml-2"
        outer-class="mt-4"
        inner-class="flex items-center"
        wrapper-class="flex flex-row justify-start align-center"
        name="hasBookRef"
      ></form-kit>

      <form-kit
        v-if="harbor.hasBookRef"
        v-model="harbor.book"
        type="group"
        name="book"
      >
        <form-kit
          type="text"
          label="Title"
          outer-class="mt-2"
          input-class="w-full rounded-full"
          name="title"
        ></form-kit>

        <div class="flex flex-wrap pb-2">
          <form-kit
            type="number"
            label="Page"
            outer-class="w-1/2 pr-1"
            input-class="w-full rounded-full"
            name="page"
          ></form-kit>
          <form-kit
            type="text"
            label="Ref"
            outer-class="w-1/2 pl-1"
            input-class="w-full rounded-full"
            name="ref"
          ></form-kit>
        </div>
      </form-kit>

      <form-kit v-model="harbor.details" type="list" name="details">
        <form-kit
          v-for="(detail, index) in harbor.details"
          :key="`detail-${index}`"
          type="group"
        >
          <form-kit
            type="text"
            label="Name"
            input-class="w-full rounded-full"
            name="name"
          ></form-kit>

          <form-kit
            label="Shielded directions"
            type="checkbox"
            :options="directionValuesComputed"
            outer-class="mt-4"
            inner-class="flex items-center"
            wrapper-class="flex flex-row items-center justify-start"
            label-class="ml-2"
            name="shieldedDirections"
          ></form-kit>

          <div class="flex flex-wrap w-full pb-2">
            <form-kit
              type="checkbox"
              label="Anchor"
              outer-class="mt-4 grow"
              inner-class="flex items-center"
              wrapper-class="flex flex-row items-center justify-start"
              label-class="ml-2"
              name="anchor"
            ></form-kit>
            <form-kit
              type="checkbox"
              label="SXK buoy"
              outer-class="mt-4 grow"
              inner-class="flex items-center"
              wrapper-class="flex flex-row items-center justify-start"
              label-class="ml-2"
              name="SXKBuoy"
            ></form-kit>
          </div>

          <form-kit
            v-model="detail.hasSpecificLocation"
            type="checkbox"
            label="Has specific location"
            label-class="ml-2"
            outer-class="mt-4"
            inner-class="flex items-center"
            wrapper-class="flex flex-row justify-start align-center"
            name="hasSpecificLocation"
          ></form-kit>

          <form-kit
            v-if="detail.hasSpecificLocation"
            v-model="detail.location"
            type="group"
            name="location"
          >
            <div class="flex flex-wrap pb-2">
              <form-kit
                type="text"
                label="Latitude"
                outer-class="w-1/2 pr-1"
                input-class="w-full rounded-full"
                name="lat"
              ></form-kit>
              <form-kit
                type="text"
                label="Longitude"
                outer-class="w-1/2 pl-1"
                input-class="w-full rounded-full"
                name="lng"
              ></form-kit>
            </div>
          </form-kit>

          <form-kit
            v-model="detail.hasSpecificHarborType"
            type="checkbox"
            label="Is specific harbor type"
            label-class="ml-2"
            outer-class="mt-4"
            inner-class="flex items-center"
            wrapper-class="flex flex-row justify-start align-center"
            name="hasSpecificHarborType"
          ></form-kit>

          <form-kit
            v-if="detail.hasSpecificHarborType"
            v-model="detail.harborType"
            type="select"
            :options="harborTypeValuesComputed"
            label="Harbor type"
            input-class="w-full rounded-full"
            name="harborType"
          ></form-kit>
        </form-kit>
      </form-kit>

      <form-kit
        type="button"
        input-class="relative w-full py-2 font-medium capitalize rounded-full px-auto bg-stone-200"
        @click="addDetail"
      >
        <i class="fas fa-plus" />
        Add detail
      </form-kit>

      <form-kit
        type="submit"
        input-class="w-full py-2 mt-4 font-medium capitalize bg-blue-500 rounded-full px-auto text-stone-100"
      ></form-kit>
    </form-kit>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { FormKit } from '@formkit/vue';
  import {
    createHarborInputModel,
    createHarborDetailInputModel,
    createBookRefInputModel,
  } from 'types/harborInputModels';
  import { HarborType } from 'types/harborType';
  import { Direction } from 'types/direction';

  export default defineComponent({
    name: 'AddHarborForm',
    components: { FormKit },
    setup() {
      let harbor: createHarborInputModel = reactive(
        new createHarborInputModel()
      );
      harbor.book = new createBookRefInputModel();
      return { harbor };
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
      harborTypeValuesComputed() {
        const values = Object.entries(HarborType)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([text, value]) => isNaN(Number(value)) === false)
          .map(([text, val]) => {
            return {
              value: val,
              label: (
                text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
              ).replace(/_/g, ' '),
            };
          });
        return values;
      },
    },
    methods: {
      async submitForm(data: unknown) {
        console.log(data);
      },
      addDetail() {
        this.harbor.details.push(new createHarborDetailInputModel());
      },
    },
  });
</script>

<style lang="scss"></style>
