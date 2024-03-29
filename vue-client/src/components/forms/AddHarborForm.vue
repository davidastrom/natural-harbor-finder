<template>
  <Card
    v-if="currentHarbor"
    class="dark:bg-gray-800 flex flex-col"
  >
    <template #title>
      {{ originalName ?? t('harbor.newHarbor') }}
    </template>

    <template #content>
      <div class="flex flex-col flex-1 gap-1 mb-2">
        <label for="name">{{ t('harbor.name') }}</label>
        <InputText
          v-model="currentHarbor.name"
          input-id="name"
        />
      </div>
    

      <position-form-group v-model="currentHarbor.location" />

      <div class="flex gap-2">
        <div class="flex flex-col flex-1 min-w-0 gap-1 mb-2">
          <label for="chartNumber">{{ t('harbor.chartNum') }}</label>
          <InputNumber
            v-model="currentHarbor.chartNumber"
            input-id="chartNumber"
            class="w-full"
            input-class="w-full"
          />
        </div>

        <div class="flex flex-col flex-1 min-w-0 gap-1 mb-4">
          <label for="harborType">{{ t('harbor.harborType') }}</label>
          <Dropdown
            v-model="currentHarbor.harborType"
            input-id="harborType"
            :options="harborTypeValuesComputed"
            option-label="label"
            option-value="value"
            class="max-w-full min-w-0"
          />
        </div>
      </div>

      <div class="flex flex-1 gap-2 mb-2">
        <Checkbox
          v-model="currentHarbor.hasBookRef"
          input-id="hasBookRef"
          binary
          class="mr-2"
        />
        <label for="hasBookRef">{{ t('harbor.book.hasBookRef') }}</label>
      </div>

      <Card
        v-show="currentHarbor.hasBookRef"
        class="mb-4"
      >
        <template #content>
          <div class="-my-5">
            <div class="flex flex-col gap-1 mb-2">
              <label for="title">{{ t('harbor.book.title') }}</label>
              <InputText
                v-model="currentHarbor.book.title"
                input-id="title"
              />
            </div>
      

            <div class="flex flex-wrap gap-2 mb-2">
              <div class="flex flex-col flex-1 gap-1">
                <label for="page">{{ t('harbor.book.page') }}</label>
                <InputNumber
                  v-model="currentHarbor.book.page"
                  input-id="page"
                />
              </div>
        
              <div class="flex flex-col flex-1 gap-1">
                <label for="ref">{{ t('harbor.book.ref') }}</label>
                <InputText
                  v-model="currentHarbor.book.ref"
                  input-id="ref"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <h3 class="mb-2 text-xl font-medium">
        {{ t('harbor.harborDetails') }}
      </h3>
  
      <harbor-detail-form-group
        v-for="(_detail, index) in currentHarbor.details"
        :key="`detail-${index}`"
        v-model="currentHarbor.details[index]"
        :detail-id="`detail-${index}`"
        @remove="adminStore.removeHarborDetail(index)"
      />
    

      <div class="flex flex-col mt-2">
        <Button
          rounded
          severity="secondary"
          size="small"
          class="justify-center w-full"
          icon="fas fa-plus"
          :label="t('harbor.addDetail')"
          @click="adminStore.addHarborDetail"
        >
        </Button>
      </div>
    </template>

    <template #footer>
      <div
        class="flex justify-end flex-1 gap-2"
      >
        <Button
          severity="secondary"
          class="justify-center"
          :label="t('shared.cancel')"
          @click="adminStore.clearHarborData(currentHarbor?.id)"
        >
        </Button>
        <Button
          class="justify-center"
          icon="fas fa-save"
          :label="t('shared.save')"
          @click="onSubmit"
        >
        </Button>
      </div>
    </template>
  </Card>
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
  import Card from 'primevue/card';

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
