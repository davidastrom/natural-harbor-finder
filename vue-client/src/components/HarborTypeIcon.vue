<template>
  <i
    class="fa-solid"
    :class="iconClassComputed"
    :title="harborTypeNameComputed"
  />
</template>

<script lang="ts">
  import { HarborType } from 'types/harborType';
  import { defineComponent, type PropType } from 'vue';

  export default defineComponent({
    name: 'HarborTypeIcon',
    props: {
      harborType: {
        type: Number as PropType<HarborType>,
        required: true,
      },
    },
    computed: {
      iconClassComputed() {
        switch (this.harborType) {
          case HarborType.NATURAL:
            return 'fa-anchor';
          case HarborType.SMALL_BOATS:
            return 'fa-sailboat';
          case HarborType.YACHTS:
            return 'fa-ship';
          default:
            return '';
        }
      },
      harborTypeNameComputed() {
        const name = Object.keys(HarborType).find((key: string) => HarborType[key as keyof typeof HarborType] === this.harborType)?.toLowerCase() ?? '';
        return name[0].toUpperCase() + name.slice(1);
      },
    },
  });
</script>

<style lang="scss"></style>
