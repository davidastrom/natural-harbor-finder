<template>
  <form-kit
    type="group"
    name="location"
  >
    <div class="flex flex-wrap pb-2">
      <form-kit
        v-model="location.lat"
        type="text"
        label="Latitude"
        outer-class="w-1/2 pr-1"
        input-class="w-full rounded-full"
        name="lat"
      ></form-kit>
      <form-kit
        v-model="location.lng"
        type="text"
        label="Longitude"
        outer-class="w-1/2 pl-1"
        input-class="w-full rounded-full"
        name="lng"
      ></form-kit>
    </div>
  </form-kit>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { StringLocation } from 'types/stringLocation';

  export default defineComponent({
    name: 'PositionFormGroup',
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
    },
    emits: ['update:modelValue'],
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
