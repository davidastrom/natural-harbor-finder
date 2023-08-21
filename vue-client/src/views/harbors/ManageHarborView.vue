<template>
  <div class="flex justify-center w-full">
    <div class="w-full max-w-lg">
      <h1 class="text-2xl font-medium">{{ t('harbor.manageHarbors') }}</h1>
      <Dropdown
        v-model="selectedHarbor"
        :options="harborOptions"
        :placeholder="t('harbor.select')"
        option-label="label"
        option-value="value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import Dropdown from 'primevue/dropdown';
  import { useHarborStore } from '@/stores/harbors';

  const { t } = useI18n();
  const harborStore = useHarborStore();

  const selectedHarbor = ref<string | null>(null);
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
