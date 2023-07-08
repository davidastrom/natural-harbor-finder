<script setup lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue';
  import { RouterView } from 'vue-router';

  const { isLoading } = useAuth0();
</script>

<template>
  <RouterView v-if="!isLoading" />
</template>

<style>
  #app {
    width: 100%;
  }
</style>
