<template>
  <div
    class="bg-fullscreen justify-items-center grid items-center w-full min-h-screen grid-cols-1 grid-rows-1 p-8 bg-cover"
  >
    <div class="bg-neutral-50 rounded-2xl drop-shadow-5 w-full max-w-sm p-8">
      <h1 id="g_id_onload" class="text-slate-800 mb-4 text-3xl text-center">
        {{ t('auth.pleaseLogIn') }}
      </h1>
      <div>
        <button
          @click="login"
          class="text-blue-50 hover:bg-blue-600 flex justify-center w-full px-3 py-2 bg-blue-500 rounded-lg"
        >
          {{ t('auth.logIn') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useAuth0 } from '@auth0/auth0-vue';

  const { t } = useI18n();

  const { loginWithRedirect } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };
</script>

<style lang="scss"></style>
