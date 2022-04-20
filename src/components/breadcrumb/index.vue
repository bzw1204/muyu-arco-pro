<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-home />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in routes" :key="item">{{
      item
    }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup name="Breadcrumb">
  import { defineProps, PropType, ref, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  defineProps({
    items: {
      type: Array as PropType<string[]>,
      default() {
        return [];
      },
    },
  });
  const route = useRoute();
  const routes = ref<string[]>([]);
  watchEffect(async () => {
    const metcheds = route.matched.filter((item) => item.meta?.locale);
    routes.value = metcheds.map((item) => item.meta.locale) as string[];
  });
</script>

<style scoped lang="less">
  .container-breadcrumb {
    margin: 16px 0;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>
