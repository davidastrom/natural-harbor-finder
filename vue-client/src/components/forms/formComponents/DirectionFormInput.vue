<template>
  <form-kit
    v-model="directions"
    :label="t('harbor.shieldedDirections')"
    type="checkbox"
    :options="directionValuesComputed"
    outer-class="mt-4"
    inner-class="flex items-center"
    wrapper-class="flex flex-row items-center justify-start"
    label-class="ml-2"
    input-class="hover:shadow-inner hover:shadow-stone-200 hover:checked:shadow-blue-700 rounded-sm cursor-pointer"
    :name="name"
  ></form-kit>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { Direction } from 'types/direction';
  import { directionValues } from '@/helpers/enumHelpers';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'DirectionFormInput',
    props: {
      name: {
        type: String,
        default: 'shieldedDirections',
      },
      modelValue: {
        type: Array as PropType<Direction[]>,
        default: () => [],
      },
    },
    emits: ['update:modelValue'],
    setup() {
      const { t } = useI18n();
      return { t };
    },
    computed: {
      directions: {
        get() {
          return this.modelValue;
        },
        set(directions: Direction[]) {
          this.$emit('update:modelValue', directions);
        },
      },
      directionValuesComputed() {
        return directionValues();
      },
    },
  });
</script>

<style lang="scss"></style>
