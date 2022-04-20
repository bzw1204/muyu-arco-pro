<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :show-collapse-button="appStore.device !== 'mobile'"
    accordion
    :auto-open-selected="true"
    :level-indent="34"
    style="height: 100%"
    @collapse="collapsed"
  >
    <a-sub-menu v-for="route in appRoute.children" :key="route.name">
      <template #title>
        <component :is="route?.meta?.icon" />
        {{ route?.meta?.locale || '' }}
      </template>
      <a-menu-item
        v-for="_route in route.children || []"
        :key="_route.name"
        @click="goto(_route)"
      >
        {{ _route?.meta?.locale || '' }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/store';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { computed, ref } from 'vue';
  import { RouteRecordNormalized, RouteRecordRaw, useRouter } from 'vue-router';

  const appStore = useAppStore();
  const router = useRouter();
  const collapsed = computed({
    get() {
      if (appStore.device === 'desktop') return appStore.menuCollapse;
      return false;
    },
    set(value: boolean) {
      appStore.updateSettings({ menuCollapse: value });
    },
  });
  const appRoute = computed(() => {
    return router
      .getRoutes()
      .find((el) => el.name === 'root') as RouteRecordNormalized;
  });

  const selectedKeys = ref<string[]>([]);
  const openKeys = ref<string[]>([]);
  const goto = (item: RouteRecordRaw) => {
    router.push({
      name: item.name,
    });
  };
  listenerRouteChange((newRoute) => {
    if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
      const key = newRoute.matched[2]?.name as string;
      selectedKeys.value = [key];
      openKeys.value = newRoute.fullPath.split('/').slice(1, 3);
    }
  }, true);
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }
</style>
