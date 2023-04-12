<template>
  <div class="w-full" ref="wrapper">
    <google-login class="w-full" :button-config="buttonConfig" :callback="signIn" :key="width" />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { computed, onMounted, ref, defineExpose } from 'vue';
  import { GoogleLogin, type CallbackTypes } from 'vue3-google-login';

  let width = ref(0);
  const wrapper = ref<HTMLInputElement | null>(null);

  const authStore = useAuthStore();

  const signIn: CallbackTypes.CredentialCallback = (res) => {
    console.log(res);
    authStore.loginGoogle(res.credential);
  };

  const buttonConfig = computed(() => {
    return {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      logo_alignment: 'left',
      width: width.value,
    };
  });

  onMounted(() => {
    onResize();
  });

  const onResize = () => {
    if (wrapper.value) {
      width.value = Math.min(wrapper.value.clientWidth, 400);
    }
  };

  defineExpose({
    onResize,
  });
</script>

<style lang="scss"></style>
