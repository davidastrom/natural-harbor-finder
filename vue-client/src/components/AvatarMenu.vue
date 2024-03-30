<template>
  <button
    type="button"
    class="rounded-full"
    aria-haspopup="true"
    aria-controls="profile-menu"
    @click="toggle"
  >
    <Avatar
      class="overflow-hidden"
      :image="showImage ? userStore.user?.profilePicture : undefined"
      :label="showLabel ? userStore.user?.userName ?? userStore.user?.name : undefined"
      :icon="showIcon ? 'fa-light fa-user' : undefined"
      size="large"
      shape="circle"
    />
  </button>
  <Menu
    id="profile-menu"
    ref="menu"
    :popup="true"
    :model="menuItems"
  />
</template>

<script setup lang="ts">
  import Avatar from 'primevue/avatar';
  import Menu from 'primevue/menu';
  import { useUserStore } from '@/stores/user';
  import { computed, ref } from 'vue';
  import { useAuth0 } from '@auth0/auth0-vue';
import { useI18n } from 'vue-i18n';

  const {t} = useI18n();

  const userStore = useUserStore();

  const showImage = computed(() => {
    return userStore.user?.profilePicture ? true : false;
  });

  const showLabel = computed(() => {
    return showImage.value ? false : userStore.user?.userName || userStore.user?.name;
  });

  const showIcon = computed(() => {
    return showImage.value || showLabel ? false : true;
  });

  const menuItems = computed(() => {
    const items = [];

    if (userStore.user?.isAdmin) {
      items.push({
        label: t('harbor.manageHarbors'),
        icon: 'fa-solid fa-anchor mr-2',
        url: '/harbors/manage',
      });
    }

    const { logout } = useAuth0();

    items.push({
      label: 'Profile',
      items: [
        {
          label: t('auth.logOut'),
          icon: 'fa-solid fa-sign-out-alt mr-2',
          command: () => {
            logout();
          },
        },
      ],
    });
    return items;
  });

  const menu = ref();

  const toggle = (event: Event) => {
    menu.value.toggle(event);
  };
</script>

<style lang="scss"></style>
