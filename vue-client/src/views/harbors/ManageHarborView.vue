<template>
  <div class="flex justify-center w-full">
    <Card class="w-full max-w-lg gap-2 my-8">
      <template #title>
        <h1 class="text-2xl font-medium">
          {{ t('harbor.manageHarbors') }}
        </h1>
      </template>
      <template #content>
        <div class="-mb-5">
          <div class="flex gap-2">
            <Dropdown
              :model-value="
                adminStore.currentHarbor?.id === undefined ||
                  adminStore.currentHarbor?.id === NEW_HARBOR_ID
                  ? null
                  : adminStore.currentHarbor?.id
              "
              :options="harborOptions"
              :placeholder="t('harbor.select')"
              option-label="label"
              option-value="value"
              class="flex-1 min-w-0"
              @update:model-value="adminStore.selectHarbor"
            />
            <Button
              class="justify-center"
              @click="adminStore.prepareNewHarbor"
            >
              <i class="fa-solid fa-plus mr-2" />
              {{ t('harbor.createNew') }}
            </Button>
          </div>
        
          <AddHarborFormVue
            v-if="adminStore.currentHarbor"
            :key="adminStore.currentHarbor?.id"
            class="mt-4"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  import { useHarborStore } from '@/stores/harbors';
  import { useHarborAdminStore, NEW_HARBOR_ID } from '@/stores/harborAdmin';
  import AddHarborFormVue from '@/components/forms/AddHarborForm.vue';
  import Card from 'primevue/card';

  const { t } = useI18n();
  const harborStore = useHarborStore();
  const adminStore = useHarborAdminStore();

  const harborOptions = computed(() => {
    return Array.from(harborStore.harbors).map(([id, harbor]) => ({
      label: harbor.name,
      value: id,
    }));
  });

  onMounted(() => {
    harborStore.fetchHarbors({ directions: [] });
  });
</script>

<style lang="scss"></style>
