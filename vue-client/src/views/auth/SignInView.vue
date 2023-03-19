<template>
  <div
    class="bg-fullscreen justify-items-center grid items-center w-full min-h-screen grid-cols-1 grid-rows-1 bg-cover"
  >
    <div
      class="md:w-96 bg-slate-500 bg-opacity-20 backdrop-blur-md rounded-xl w-full max-w-full p-8"
    >
      <h1
        id="g_id_onload"
        class="mb-4 text-5xl text-center text-white"
      >
        {{ $t('auth.signIn') }}
      </h1>
      <div>
        <div
          data-client_id="1000790623648-lio03f6k7ha8ten7a34fqc689oh9r062.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="signIn"
          data-nonce=""
          data-auto_select="true"
          data-itp_support="true"
        ></div>

        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
          data-width="400px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss"></style>
