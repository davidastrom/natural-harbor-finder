<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col w-full max-w-lg gap-2">
      <h1 class="text-2xl font-medium">{{ t('harbor.manageHarbors') }}</h1>
      <Dropdown
        :model-value="
          adminStore.currentHarbor?._id === undefined ||
          adminStore.currentHarbor?._id === NEW_HARBOR_ID
            ? null
            : adminStore.currentHarbor?._id
        "
        :options="harborOptions"
        :placeholder="t('harbor.select')"
        option-label="label"
        option-value="value"
        class="min-w-full rounded-full"
        @update:model-value="adminStore.selectHarbor"
      />
      <Button rounded class="justify-center w-full" @click="adminStore.prepareNewHarbor">
        <i class="fa-solid fa-plus mr-2"></i>
        {{ t('harbor.createNew') }}
      </Button>
      <AddHarborFormVue :key="adminStore.currentHarbor?._id" v-if="adminStore.currentHarbor" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  import { useHarborStore } from '@/stores/harbors';
  import { useHarborAdminStore, NEW_HARBOR_ID } from '@/stores/harborAdmin';
  import AddHarborFormVue from '@/components/forms/AddHarborForm.vue';

  const { t } = useI18n();
  const harborStore = useHarborStore();
  const adminStore = useHarborAdminStore();

  const harborOptions = computed(() => {
    return Array.from(harborStore.harbors).map(([_id, harbor]) => ({
      label: harbor.name,
      value: harbor._id,
    }));
  });

  onMounted(() => {
    harborStore.fetchHarbors({ directions: [] });
  });
</script>

<style lang="scss"></style>
