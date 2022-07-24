<template>
  <form-kit
    v-model="directions"
    label="Shielded directions"
    type="checkbox"
    :options="directionValuesComputed"
    outer-class="mt-4"
    inner-class="flex items-center"
    wrapper-class="flex flex-row items-center justify-start"
    label-class="ml-2"
    :name="name"
  ></form-kit>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { Direction } from 'types/direction';
  import { directionValues } from '@/helpers/enumHelpers';

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
