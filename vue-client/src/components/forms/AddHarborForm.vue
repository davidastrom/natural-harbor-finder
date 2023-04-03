<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-medium">Add Harbor</h2>
    <form-kit
      type="form"
      :actions="false"
      @submit="submitForm"
    >
      <form-kit
        v-model="harbor.name"
        type="text"
        :label="t('harbor.name')"
        input-class="w-full rounded-full"
        name="name"
      ></form-kit>

      <position-form-group v-model="harbor.location"></position-form-group>

      <form-kit
        v-model="harbor.chartNumber"
        type="number"
        :label="t('harbor.chartNum')"
        input-class="w-full rounded-full"
        name="chartNumber"
      ></form-kit>

      <form-kit
        v-model="harbor.harborType"
        type="select"
        :options="harborTypeValuesComputed"
        :label="t('harbor.harborType')"
        input-class="w-full rounded-full"
        name="harborType"
      ></form-kit>

      <form-kit
        v-model="harbor.hasBookRef"
        type="checkbox"
        :label="t('harbor.book.hasBookRef')"
        label-class="ml-2"
        outer-class="mt-4"
        inner-class="flex items-center"
        wrapper-class="align-center flex flex-row justify-start"
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
          :label="t('harbor.book.title')"
          outer-class="mt-2"
          input-class="w-full rounded-full"
          name="title"
        ></form-kit>

        <div class="flex flex-wrap pb-2">
          <form-kit
            type="number"
            :label="t('harbor.book.page')"
            outer-class="w-1/2 pr-1"
            input-class="w-full rounded-full"
            name="page"
          ></form-kit>
          <form-kit
            type="text"
            :label="t('harbor.book.ref')"
            outer-class="w-1/2 pl-1"
            input-class="w-full rounded-full"
            name="ref"
          ></form-kit>
        </div>
      </form-kit>

      <form-kit
        v-model="harbor.details"
        type="list"
        name="details"
      >
        <div
          v-for="(detail, index) in harbor.details"
          :key="`detail-${index}`"
          class="bg-slate-50 w-full p-4 mb-8 rounded-lg"
        >
          <h3>New detail</h3>
          <harbor-detail-form-group
            v-model="harbor.details[index]"
          ></harbor-detail-form-group>
        </div>
      </form-kit>

      <form-kit
        type="button"
        input-class="px-auto bg-stone-200 relative w-full py-2 font-medium capitalize rounded-full"
        @click="addDetail"
      >
        <i class="fas fa-plus" />
        Add detail
      </form-kit>

      <form-kit
        type="submit"
        input-class="px-auto text-stone-100 w-full py-2 mt-4 font-medium capitalize bg-blue-500 rounded-full"
      ></form-kit>
    </form-kit>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { FormKit } from '@formkit/vue';
  import {
    CreateHarborFormModel,
    CreateHarborDetailFormModel,
    CreateBookRefInputModel,
    type ICreateHarborFormModel,
  } from 'types/harborInputModels';
  import { directionValues, harborTypeValues } from '@/helpers/enumHelpers';
  import PositionFormGroup from './formComponents/PositionFormGroup.vue';
  import HarborDetailFormGroup from './formComponents/HarborDetailFormGroup.vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'AddHarborForm',
    components: { FormKit, PositionFormGroup, HarborDetailFormGroup },
    setup() {
      const { t } = useI18n();
      const harbor: CreateHarborFormModel = reactive(
        new CreateHarborFormModel()
      );
      harbor.book = new CreateBookRefInputModel();
      return { t, harbor };
    },
    computed: {
      directionValuesComputed() {
        return directionValues();
      },
      harborTypeValuesComputed() {
        return harborTypeValues();
      },
    },
    methods: {
      async submitForm(data: unknown) {
        const interfaceData = data as ICreateHarborFormModel;
        const formData = CreateHarborFormModel.fromInterface(interfaceData);

        const inputData = formData.toInputModel();

        const url = import.meta.env.VITE_API_URL + '/harbors/create';

        await axios
          .post(url, inputData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      addDetail() {
        const detail = new CreateHarborDetailFormModel();

        detail.harborType = this.harbor.harborType;
        detail.location = this.harbor.location;

        this.harbor.details.push(detail);
      },
    },
  });
</script>

<style lang="scss"></style>
