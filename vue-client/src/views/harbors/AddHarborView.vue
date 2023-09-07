<template>
  <div class="flex justify-center w-full">
    <add-harbor-form class="w-full max-w-lg" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import AddHarborForm from '@/components/forms/AddHarborForm.vue';

  export default defineComponent({
    name: 'AddHarborView',
    components: {
      AddHarborForm,
    },
    setup() {
      return {
        defineComponent,
      };
    },
  });
</script>

<style lang="scss"></style>
