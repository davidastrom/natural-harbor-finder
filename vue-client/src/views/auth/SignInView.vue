<template>
  <div
    class="bg-fullscreen justify-items-center grid items-center w-full min-h-screen grid-cols-1 grid-rows-1 p-8 bg-cover"
  >
    <div class="bg-neutral-50 rounded-2xl drop-shadow-xl w-full max-w-sm p-8">
      <h1 id="g_id_onload" class="text-slate-800 mb-4 text-3xl text-center">
        {{ t('auth.signIn') }}
      </h1>
      <div><sign-></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import LoginButton from '@/components/auth/LoginButton.vue';
  import SignupButton from '@/components/auth/SignupButton.vue';

  const { t } = useI18n();

</script>

<style lang="scss"></style>
