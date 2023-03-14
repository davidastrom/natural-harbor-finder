<template>
  <form-kit
    v-model="detail"
    type="group"
  >
    <form-kit
      type="text"
      :label="$t('harbor.name')"
      input-class="w-full rounded-full"
      name="name"
    ></form-kit>

    <direction-form-input name="shieldedDirections"></direction-form-input>

    <div class="flex flex-wrap w-full pb-2">
      <form-kit
        type="checkbox"
        :label="$t('harbor.anchor')"
        outer-class="grow mt-4"
        inner-class="flex items-center"
        wrapper-class="flex flex-row items-center justify-start"
        label-class="ml-2"
        name="anchor"
      ></form-kit>
      <form-kit
        type="checkbox"
        :label="$t('harbor.sxk')"
        outer-class="grow mt-4"
        inner-class="flex items-center"
        wrapper-class="flex flex-row items-center justify-start"
        label-class="ml-2"
        name="SXKBuoy"
      ></form-kit>
    </div>

    <form-kit
      v-model="detail.hasSpecificLocation"
      type="checkbox"
      :label="$t('harbor.detail.specificLocation')"
      label-class="ml-2"
      outer-class="mt-4"
      inner-class="flex items-center"
      wrapper-class="align-center flex flex-row justify-start"
      name="hasSpecificLocation"
    ></form-kit>

    <position-form-group
      v-if="detail.hasSpecificLocation"
      v-model="detail.location"
    ></position-form-group>

    <form-kit
      v-model="detail.hasSpecificHarborType"
      type="checkbox"
      :label="$t('harbor.detail.specificLocation')"
      label-class="ml-2"
      outer-class="mt-4"
      inner-class="flex items-center"
      wrapper-class="align-center flex flex-row justify-start"
      name="hasSpecificHarborType"
    ></form-kit>

    <form-kit
      v-if="detail.hasSpecificHarborType"
      v-model="detail.harborType"
      type="select"
      :options="harborTypeValuesComputed"
      :label="$t('harbor.harborType')"
      input-class="w-full rounded-full"
      name="harborType"
    ></form-kit>
  </form-kit>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { latLng } from 'leaflet';
  import type { CreateHarborDetailFormModel } from 'types/harborInputModels';
  import { harborTypeValues } from '@/helpers/enumHelpers';
  import PositionFormGroup from './PositionFormGroup.vue';
  import DirectionFormInput from './DirectionFormInput.vue';

  export default defineComponent({
    name: 'HarborDetailFormGroup',
    components: { PositionFormGroup, DirectionFormInput },
    props: {
      name: {
        type: String,
        default: '',
      },
      modelValue: {
        type: Object as PropType<CreateHarborDetailFormModel>,
        default: latLng(0, 0),
      },
    },
    emits: ['update:modelValue'],
    computed: {
      detail: {
        get() {
          return this.modelValue;
        },
        set(detail: CreateHarborDetailFormModel) {
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
