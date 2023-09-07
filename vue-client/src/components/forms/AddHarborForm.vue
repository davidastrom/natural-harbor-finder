<template>
  <div
    v-if="currentHarbor"
    class="flex flex-col"
  >
    <h2 class="text-2xl font-medium">
      {{ originalName ?? t('harbor.newHarbor') }}
    </h2>
    
    <div class="flex flex-col gap-1 mb-2 flex-1">
      <label for="name">{{ t('harbor.name') }}</label>
      <InputText
        v-model="currentHarbor.name"
        input-id="name"
      />
    </div>
    

    <position-form-group v-model="currentHarbor.location" />

    <div class="flex flex-col gap-1 mb-2 flex-1">
      <label for="chartNumber">{{ t('harbor.chartNum') }}</label>
      <InputNumber
        v-model="currentHarbor.chartNumber"
        input-id="chartNumber"
      />
    </div>

    <div class="flex flex-col gap-1 mb-4 flex-1">
      <label for="harborType">{{ t('harbor.harborType') }}</label>
      <Dropdown
        v-model="currentHarbor.harborType"
        input-id="harborType"
        :options="harborTypeValuesComputed"
        option-label="label"
        option-value="value"
      />
    </div>

    <div class="flex gap-2 flex-1 mb-2">
      <Checkbox
        v-model="currentHarbor.hasBookRef"
        input-id="hasBookRef"
        binary
        class="mr-2"
      />
      <label for="hasBookRef">{{ t('harbor.book.hasBookRef') }}</label>
    </div>

    <div
      v-show="currentHarbor.hasBookRef"
      class="mb-4"
    >
      <div class="flex flex-col gap-1 mb-2">
        <label for="title">{{ t('harbor.book.title') }}</label>
        <InputText
          v-model="currentHarbor.book.title"
          input-id="title"
        />
      </div>
      

      <div class="flex flex-wrap gap-2 mb-2">
        <div class="flex flex-col gap-1 flex-1">
          <label for="page">{{ t('harbor.book.page') }}</label>
          <InputNumber
            v-model="currentHarbor.book.page"
            input-id="page"
          />
        </div>
        
        <div class="flex flex-col gap-1 flex-1">
          <label for="ref">{{ t('harbor.book.ref') }}</label>
          <InputText
            v-model="currentHarbor.book.ref"
            input-id="ref"
          />
        </div>
      </div>
    </div>

    <div
      v-for="(detail, index) in currentHarbor.details"
      :key="`detail-${index}`"
      class="bg-slate-50 w-full p-4 mb-4 rounded-lg"
    >
      <harbor-detail-form-group
        v-model="currentHarbor.details[index]"
        @remove="adminStore.removeHarborDetail(index)"
      />
    </div>

    <div class="flex flex-col">
      <Button
        rounded
        severity="secondary"
        class="justify-center w-full mb-8"
        @click="adminStore.addHarborDetail"
      >
        <i class="fas fa-plus mr-2" />
        Add detail
      </Button>

      <Button
        rounded
        severity="secondary"
        class="justify-center w-full mb-2"
        @click="adminStore.clearHarborData(currentHarbor._id)"
      >
        Cancel
      </Button>
      <Button
        rounded
        class="justify-center w-full mb-2"
        @click="onSubmit"
      >
        <i class="fas fa-save mr-2" />
        Submit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { harborTypeValues } from '@/helpers/enumHelpers';
  import PositionFormGroup from './formComponents/PositionFormGroup.vue';
  import HarborDetailFormGroup from './formComponents/HarborDetailFormGroup.vue';
  import { useI18n } from 'vue-i18n';
  import { useHarborAdminStore } from '@/stores/harborAdmin';
  import { storeToRefs } from 'pinia';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import Dropdown from 'primevue/dropdown';
  import Checkbox from 'primevue/checkbox';
  

  const { t } = useI18n();
  const adminStore = useHarborAdminStore();

  const { currentHarbor } = storeToRefs(adminStore);

  const harborTypeValuesComputed = computed(() => {
    return harborTypeValues();
  });
  const originalName =
    currentHarbor.value?.name && currentHarbor.value.name != '' ? currentHarbor.value?.name : null;

  const onSubmit = () => {
    adminStore.submitHarbor();
  };
</script>

<style lang="scss"></style>
