<template>
  <button
    type="button"
    class="rounded-full"
    aria-haspopup="true"
    @click="toggle"
    aria-controls="profile-menu"
  >
    <Avatar
      class="overflow-hidden"
      :image="showImage ? userStore.user?.profilePicture : undefined"
      :label="showLabel ? userStore.user?.userName ?? userStore.user?.name : undefined"
      :icon="showIcon ? 'fa-light fa-user' : undefined"
      size="large"
      shape="circle"
    ></Avatar>
  </button>
  <Menu ref="menu" id="profile-menu" :popup="true" :model="menuItems" />
</template>

<script setup lang="ts">
  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button';
  import Menu from 'primevue/menu';
  import { useUserStore } from '@/stores/user';
  import { computed, ref } from 'vue';
  import { useAuth0 } from '@auth0/auth0-vue';

  const userStore = useUserStore();

  const showImage = computed(() => {
    return userStore.user?.profilePicture ? true : false;
  });

  const showLabel = computed(() => {
    return showImage ? false : userStore.user?.userName || userStore.user?.name;
  });

  const showIcon = computed(() => {
    return showImage || showLabel ? false : true;
  });

  const menuItems = computed(() => {
    const items = [];

    if (userStore.user?.isAdmin) {
      items.push({
        items: [
          {
            label: 'Manage harbors',
            icon: 'fa-light fa-anchor',
            url: '/harbors/manage',
          },
        ],
      });
    }

    const { logout } = useAuth0();

    items.push({
      label: 'Profile',
      items: [
        {
          label: 'Log out',
          icon: 'fa-light fa-sign-out-alt',
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
