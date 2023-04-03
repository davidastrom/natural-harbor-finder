<template>
  <div
    class="bg-fullscreen justify-items-center grid items-center w-full min-h-screen grid-cols-1 grid-rows-1 bg-cover"
  >
    <div class="md:w-96 bg-neutral-50 rounded-xl drop-shadow-xl w-full max-w-full p-8">
      <h1 id="g_id_onload" class="text-slate-800 mb-4 text-3xl text-center">
        {{ t('auth.signIn') }}
      </h1>
      <div>
        <google-login class="w-full" :callback="googleSignIn">
          <button
            class="text-slate-800 shadow-soft-xl hover:shadow-soft-2xl flex items-center w-full px-4 py-2 bg-white rounded-full"
          >
            <i class="fa-brands fa-google mr-2"></i>
            <span class="flex-1 text-lg font-medium text-center">
              {{ t('auth.google.signIn') }}
            </span>
          </button>
        </google-login>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { GoogleLogin, type CallbackTypes } from 'vue3-google-login';

  const { t, locale } = useI18n();

  const googleClientID = ref(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const googleSignIn: CallbackTypes.CredentialCallback = (res) => {
    console.log(res);
  };
</script>

<style lang="scss"></style>
