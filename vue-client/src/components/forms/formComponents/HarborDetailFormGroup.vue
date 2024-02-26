<template>
  <Panel 
    :header="originalName ?? t('harbor.newDetail')"
    toggleable
    :collapsed="initialCollapse"
  >
    <template #icons>
      <Button
        rounded
        text
        severity="secondary"
        icon="fa-solid fa-trash"
        class="w-8 h-8 !p-0 !justify-center"
        @click="$emit('remove')"
      >
      </Button>
    </template>
    
  
    <div class="flex flex-col flex-1 gap-1 mb-4">
      <label :for="`${detailId}-name`">{{ t('harbor.name') }}</label>
      <InputText
        v-model="detail.name"
        :input-id="`${detailId}-name`"
      />
    </div>

    <direction-form-input
      :id="`${detailId}-directions`"
      v-model="detail.shieldedDirections"
      class="mb-8"
      name="shieldedDirections"
    />

    <div class="flex flex-1 gap-2 mb-2">
      <Checkbox
        v-model="detail.anchor"
        :input-id="`${detailId}-anchor`"
        binary
        class="mr-2"
      />
      <label :for="`${detailId}-anchor`">{{ t('harbor.anchor') }}</label>
    </div>

    <div class="flex flex-1 gap-2 mb-2">
      <Checkbox
        v-model="detail.SXKBuoy"
        :input-id="`${detailId}-SXKBuoy`"
        binary
        class="mr-2"
      />
      <label :for="`${detailId}-SXKBuoy`">{{ t('harbor.sxk') }}</label>
    </div>

    <div class="flex flex-1 gap-2 mb-2">
      <Checkbox
        v-model="detail.hasSpecificLocation"
        :input-id="`${detailId}-hasSpecificLocation`"
        binary
        class="mr-2"
      />
      <label :for="`${detailId}-hasSpecificLocation`">{{ t('harbor.detail.specificLocation') }}</label>
    </div>

    <position-form-group
      v-if="detail.hasSpecificLocation"
      :id="`${detailId}-location`"
      v-model="detail.location"
    />

    <div class="flex flex-1 gap-2 mb-2">
      <Checkbox
        v-model="detail.hasSpecificHarborType"
        :input-id="`${detailId}-hasSpecificHarborType`"
        binary
        class="mr-2"
      />
      <label :for="`${detailId}-hasSpecificHarborType`">{{ t('harbor.detail.specificHarborType') }}</label>
    </div>

    <div
      v-if="detail.hasSpecificHarborType" 
      class="flex flex-col flex-1 gap-2 mb-2"
    >
      <label :for="`${detailId}-harborType`">{{ t('harbor.harborType') }}</label>
      <Dropdown
        v-model="detail.harborType"
        :input-id="`${detailId}-harborType`"
        :options="harborTypeValuesComputed"
        option-label="label"
        option-value="value"
      />
    </div>
  </Panel> 
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { ManageHarborDetailFormModel } from 'types/harborInputModels';
import PositionFormGroup from './PositionFormGroup.vue';
import DirectionFormInput from './DirectionFormInput.vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useVModel } from '@vueuse/core';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import { HarborType } from 'types/harborType';
import Panel from 'primevue/panel';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as PropType<ManageHarborDetailFormModel>,
    default: null,
  },
  detailId: {
    type: String,
    default: null,
  },
  initialCollapse: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['update:modelValue', 'remove'])

const originalName = props.modelValue?.name != '' ? props.modelValue?.name : null;
const { t } = useI18n();
const detail = useVModel(props, 'modelValue', emits);
      
const harborTypeValuesComputed = computed(() => {
  return Object.entries(HarborType).map(([text, value]) => ({
    label: (
          text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        ).replace(/_/g, ' '),
    value,
  }));
})
</script>

<style lang="scss"></style>
