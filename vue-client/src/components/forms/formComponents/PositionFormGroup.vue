<template>
  <div class="flex pb-2 gap-2">
    <div class="flex flex-col gap-1 mb-2 flex-1 min-w-0">
      <label :for="`${id}-lat`">{{ t('location.latitude') }}</label>
      <InputText
        v-model="location.lat"
        :input-id="`${id}-lat`"
      />
    </div>
    <div class="flex flex-col gap-1 mb-2 flex-1 min-w-0">
      <label :for="`${id}-lng`">{{ t('location.longitude') }}</label>
      <InputText
        v-model="location.lng"
        :input-id="`${id}-lng`"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { StringLocation } from 'types/stringLocation';
  import { useI18n } from 'vue-i18n';
  import InputText from 'primevue/inputtext';

  export default defineComponent({
    name: 'PositionFormGroup',
    components: {
      InputText,
    },
    props: {
      name: {
        type: String,
        default: 'location',
      },
      modelValue: {
        type: Object as PropType<StringLocation>,
        default: () => {
          return new StringLocation();
        },
      },
      id: {
        type: String,
        default: 'location',
      },
    },
    emits: ['update:modelValue'],
    setup() {
      const { t } = useI18n();
      return { t };
    },
    computed: {
      location: {
        get() {
          return this.modelValue;
        },
        set(location: StringLocation) {
          this.$emit('update:modelValue', location);
        },
      },
    },
  });
</script>

<style lang="scss"></style>
