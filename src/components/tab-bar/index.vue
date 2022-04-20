<template>
  <div class="tab-bar-container">
    <div class="tab-bar-box">
      <!-- 标签组 -->
      <a-space fill>
        <a-tag
          v-for="(tag, index) in tagList"
          :key="tag.fullPath"
          closable
          @click="goto(tag)"
          @close="tagClose(tag, index)"
        >
          <template #icon>
            <icon-check-circle-fill />
          </template>
          {{ tag.title }}
        </a-tag>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore, useTabBarStore } from '@/store';
  import type { TagProps } from '@/store/modules/tab-bar/types';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { computed, ref, watch } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { useRouter } from 'vue-router';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();

  const router = useRouter();
  const affixRef = ref();
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition();
    }
  );
  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
    }
  }, true);
  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (idx === tagList.value.length) {
      const latest = tagList.value[tagList.value.length - 1];
      router.push({ path: latest.fullPath });
    }
  };
  const goto = (tag: TagProps) => {
    // 解构fullPath
    const { fullPath } = tag;
    router.push(fullPath);
  };
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
      display: flex;
      padding: 5px;
      width: calc(100vw - 220px);
      max-width: max-content;
      background-color: var(--color-bg-2);

      :deep(.arco-space) {
        .arco-space-item {
          .arco-tag {
            cursor: pointer;
          }
          &:first-child {
            .arco-tag-close-btn {
              background-color: aquamarine;
              display: none;
            }
          }
        }
      }
    }
  }
</style>
