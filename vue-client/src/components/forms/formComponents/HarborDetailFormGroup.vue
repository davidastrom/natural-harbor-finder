<template>
  <div class="flex gap-2">
    <h3 class="text-lg font-medium flex-1">
      {{ originalName ?? t('harbor.newDetail') }}
    </h3>
    <PButton
      rounded
      text
      severity="secondary"
      icon="fas fa-times"
      @click="$emit('remove')"
    >
      <!-- <template #icon>
      <i class="" />
    </template> -->
    </PButton>
  </div>
  <form-kit
    v-model="detail"
    type="group"
  >
    <form-kit
      type="text"
      :label="t('harbor.name')"
      input-class="w-full rounded-full"
      name="name"
    />

    <direction-form-input name="shieldedDirections" />

    <div class="flex flex-wrap w-full pb-2">
      <form-kit
        type="checkbox"
        :label="t('harbor.anchor')"
        outer-class="grow mt-4"
        inner-class="flex items-center"
        wrapper-class="flex flex-row items-center justify-start"
        label-class="ml-2"
        name="anchor"
      />
      <form-kit
        type="checkbox"
        :label="t('harbor.sxk')"
        outer-class="grow mt-4"
        inner-class="flex items-center"
        wrapper-class="flex flex-row items-center justify-start"
        label-class="ml-2"
        name="SXKBuoy"
      />
    </div>

    <form-kit
      v-model="detail.hasSpecificLocation"
      type="checkbox"
      :label="t('harbor.detail.specificLocation')"
      label-class="ml-2"
      outer-class="mt-4"
      inner-class="flex items-center"
      wrapper-class="align-center flex flex-row justify-start"
      name="hasSpecificLocation"
    />

    <position-form-group
      v-if="detail.hasSpecificLocation"
      v-model="detail.location"
    />

    <form-kit
      v-model="detail.hasSpecificHarborType"
      type="checkbox"
      :label="t('harbor.detail.specificLocation')"
      label-class="ml-2"
      outer-class="mt-4"
      inner-class="flex items-center"
      wrapper-class="align-center flex flex-row justify-start"
      name="hasSpecificHarborType"
    />

    <form-kit
      v-if="detail.hasSpecificHarborType"
      v-model="detail.harborType"
      type="select"
      :options="harborTypeValuesComputed"
      :label="t('harbor.harborType')"
      input-class="w-full rounded-full"
      name="harborType"
    />
  </form-kit>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { ManageHarborDetailFormModel } from 'types/harborInputModels';
  import { harborTypeValues } from '@/helpers/enumHelpers';
  import PositionFormGroup from './PositionFormGroup.vue';
  import DirectionFormInput from './DirectionFormInput.vue';
  import { useI18n } from 'vue-i18n';
  import Button from 'primevue/button';

  export default defineComponent({
    name: 'HarborDetailFormGroup',
    components: { PositionFormGroup, DirectionFormInput, PButton: Button },
    props: {
      name: {
        type: String,
        default: '',
      },
      modelValue: {
        type: Object as PropType<ManageHarborDetailFormModel>,
        default: null,
      },
    },
    emits: ['update:modelValue', 'remove'],
    setup(props) {
      const originalName = props.modelValue?.name != '' ? props.modelValue?.name : null;
      const { t } = useI18n();
      return { t, originalName };
    },
    computed: {
      detail: {
        get() {
          return this.modelValue;
        },
        set(detail: ManageHarborDetailFormModel) {
          this.$emit('update:modelValue', detail);
        },
      },
      harborTypeValuesComputed() {
        return harborTypeValues();
      },
    },
  });
</script>

<style lang="scss"></style>
