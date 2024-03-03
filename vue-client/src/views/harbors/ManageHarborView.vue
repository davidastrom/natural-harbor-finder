<template>
  <div class="flex justify-center w-full">
    <Card class="w-full max-w-lg gap-2 my-8">
      <template #title>
        <div class="flex justify-between">
          <h1 class="text-2xl font-medium">
            {{ t('harbor.manageHarbors') }}
          </h1>
          <RouterLink
            to="/"
          >
            <Button
              icon="fa-solid fa-arrow-left"
              :label="t('ui.backToMap')"
              size="small"
              severity="secondary"
              >
            </Button>
          </RouterLink>        
        </div>
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
              class="whitespace-nowrap"
              icon="fa-solid fa-plus"
              :label="t('harbor.createNew')"
              @click="adminStore.prepareNewHarbor"
            >
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
import { RouterLink } from 'vue-router';

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
