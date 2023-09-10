<template>
  <fieldset class="flex flex-col gap-2">
    <legend class="">
      {{ t('harbor.shieldedDirections') }}
    </legend>
    <div class="flex gap-2">
      <div class="flex flex-col flex-1 gap-2">
        <div
          v-for="direction in directionValuesComputed.slice(0, 4)"
          :key="direction.value"
          class="flex flex-1 items-center gap-2"
        >
          <Checkbox
            v-model="directions"
            :input-id="`${id}-${direction.value.toString()}`"
            :value="direction.value"
            :name="name"
          />
          <label :for="`${id}-${direction.value.toString()}`">{{ direction.label }}</label>
        </div>
      </div>
      <div class="flex flex-col flex-1 gap-2">
        <div
          v-for="direction in directionValuesComputed.slice(4, 8)"
          :key="direction.value"
          class="flex flex-1 items-center gap-2"
        >
          <Checkbox
            v-model="directions"
            :input-id="`${id}-${direction.value.toString()}`"
            :value="direction.value"
            :name="name"
          />
          <label :for="`${id}-${direction.value.toString()}`">{{ direction.label }}</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { Direction } from 'types/direction';
  import { useI18n } from 'vue-i18n';
  import Checkbox from 'primevue/checkbox';

  export default defineComponent({
    name: 'DirectionFormInput',
    components: {
      Checkbox,
    },
    props: {
      name: {
        type: String,
        default: 'shieldedDirections',
      },
      modelValue: {
        type: Array as PropType<Direction[]>,
        default: () => [],
      },
      id: {
        type: String,
        default: 'shieldedDirections',
      }
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
        return Object.values(Direction).map((value) => ({
          label: this.t(`directions.long.${value}`),
          value,
        }));
      },
    },
  });
</script>

<style lang="scss"></style>
