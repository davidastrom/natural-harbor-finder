<template>
  <div class="flex flex-col" v-if="currentHarbor">
    <h2 class="text-2xl font-medium">{{ originalName ?? t('harbor.newHarbor') }}</h2>
    <form-kit type="form" :actions="false" @submit="onSubmit">
      <form-kit
        v-model="currentHarbor.name"
        type="text"
        :label="t('harbor.name')"
        input-class="w-full rounded-full"
        name="name"
      ></form-kit>

      <position-form-group v-model="currentHarbor.location"></position-form-group>

      <form-kit
        v-model="currentHarbor.chartNumber"
        type="number"
        :label="t('harbor.chartNum')"
        input-class="w-full rounded-full"
        name="chartNumber"
      ></form-kit>

      <form-kit
        v-model="currentHarbor.harborType"
        type="select"
        :options="harborTypeValuesComputed"
        :label="t('harbor.harborType')"
        input-class="w-full rounded-full"
        name="harborType"
      ></form-kit>

      <form-kit
        v-model="currentHarbor.hasBookRef"
        type="checkbox"
        :label="t('harbor.book.hasBookRef')"
        label-class="ml-2"
        outer-class="mt-4"
        inner-class="flex items-center"
        wrapper-class="align-center flex flex-row justify-start"
        name="hasBookRef"
      ></form-kit>

      <form-kit
        v-if="currentHarbor.hasBookRef"
        v-model="currentHarbor.book"
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

      <form-kit v-model="currentHarbor.details" type="list" name="details">
        <div
          v-for="(detail, index) in currentHarbor.details"
          :key="`detail-${index}`"
          class="bg-slate-50 w-full p-4 mb-8 rounded-lg"
        >
          <harbor-detail-form-group
            v-model="currentHarbor.details[index]"
            @remove="adminStore.removeHarborDetail(index)"
          ></harbor-detail-form-group>
        </div>
      </form-kit>
      <div class="flex flex-col">
        <Button
          rounded
          severity="secondary"
          class="justify-center w-full"
          @click="adminStore.addHarborDetail"
        >
          <i class="fas fa-plus" />
          Add detail
        </Button>

        <Button
          rounded
          severity="secondary"
          class="justify-center w-full"
          @click="adminStore.clearHarborData(currentHarbor._id)"
        >
          Cancel
        </Button>
        <form-kit
          type="submit"
          input-class="px-auto text-stone-100 w-full py-2 mt-4 font-medium capitalize bg-blue-500 rounded-full"
        ></form-kit>
      </div>
    </form-kit>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineComponent, onMounted, reactive } from 'vue';
  import { FormKit } from '@formkit/vue';
  import { directionValues, harborTypeValues } from '@/helpers/enumHelpers';
  import PositionFormGroup from './formComponents/PositionFormGroup.vue';
  import HarborDetailFormGroup from './formComponents/HarborDetailFormGroup.vue';
  import { useI18n } from 'vue-i18n';
  import { useHarborAdminStore } from '@/stores/harborAdmin';
  import { storeToRefs } from 'pinia';
  import Button from 'primevue/button';

  const { t } = useI18n();
  const adminStore = useHarborAdminStore();

  const { currentHarbor } = storeToRefs(adminStore);

  const directionValuesComputed = computed(() => {
    return directionValues();
  });

  const harborTypeValuesComputed = computed(() => {
    return harborTypeValues();
  });
  const originalName =
    currentHarbor.value?.name && currentHarbor.value.name != '' ? currentHarbor.value?.name : null;

  const onSubmit = (e: Event) => {
    adminStore.submitHarbor();
  };
</script>

<style lang="scss"></style>
