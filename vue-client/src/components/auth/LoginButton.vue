<template>
  <Button
    class="rounded-lg"
    label="Log In"
    @click="handleLogin"
  >
  </Button>
</template>

<script setup>
  import { useAuth0 } from '@auth0/auth0-vue';
import Button from 'primevue/button';

  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  };
</script>
