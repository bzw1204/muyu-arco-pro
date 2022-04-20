<template>
  <router-view>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <component
            :is="Component"
            v-if="route.meta.ignoreCache"
            :key="route.fullPath"
          />
          <keep-alive v-else :include="cacheList">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </template>
  </router-view>
</template>

<script lang="ts" setup name="PageLayout">
  import { computed } from 'vue';
  import { useTabBarStore, useAppStore } from '@/store';

  const appStore = useAppStore();
  const navbar = computed(() => appStore.navbar);
  const tabBarStore = useTabBarStore();

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less">
  // .container {
  //   padding: 16px 20px;
  //   display: flex;
  //   // overflow-x: hidden;
  //   // overflow-y: auto;
  //   // max-height: calc(100vh - 100px);
  // }
</style>
