<template>
  <div
    class="bg-fullscreen justify-items-center grid items-center w-full min-h-screen grid-cols-1 grid-rows-1 p-8 bg-cover"
  >
    <div class="bg-neutral-50 rounded-xl drop-shadow-xl w-full max-w-sm p-8">
      <h1 id="g_id_onload" class="text-slate-800 mb-4 text-3xl text-center">
        {{ t('auth.signIn') }}
      </h1>
      <div><google-login-button ref="googleButton"></google-login-button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import GoogleLoginButton from '@/components/auth/GoogleLoginButton.vue';

  const { t } = useI18n();

  const googleButton = ref<InstanceType<typeof GoogleLoginButton> | null>(null);

  const resizeHandler = () => {
    if (googleButton.value) {
      googleButton.value.onResize();
    }
  };

  onMounted(() => {
    window.addEventListener('resize', resizeHandler);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler);
  });
</script>

<style lang="scss"></style>
