<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img alt="logo" :src="logo" />
        <a-typography-title
          v-if="!hideMenu"
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          Arco Pro
        </a-typography-title>
        <icon-menu-fold
          v-if="appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="side-right" :style="sideRightWidth">
      <Breadcrumb v-if="!hideMenu" />
      <a-space size="[0, 20]" class="right-side">
        <a-tooltip content="搜索">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-search />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="themeContent">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
        <div>
          <a-tooltip content="消息通知">
            <div class="message-box-trigger">
              <a-badge :count="9" dot>
                <a-button
                  class="nav-btn"
                  type="outline"
                  :shape="'circle'"
                  @click="setPopoverVisible"
                >
                  <icon-notification />
                </a-button>
              </a-badge>
            </div>
          </a-tooltip>
          <a-popover
            trigger="click"
            :arrow-style="{ display: 'none' }"
            :content-style="{ padding: 0, minWidth: '400px' }"
            content-class="message-popover"
          >
            <div ref="refBtn" class="ref-btn"></div>
            <template #content>
              <message-box />
            </template>
          </a-popover>
        </div>

        <a-tooltip content="页面配置">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" position="br">
          <a-avatar id="avatar" :size="32" :style="{ cursor: 'pointer' }">
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: 'info' })">
                <icon-user />
                <span>用户中心</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'setting' })">
                <icon-settings />
                <span>用户设置</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>登出登录</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup name="Navbar">
  import useUser from '@/hooks/user';
  import { useAppStore, useUserStore } from '@/store';
  import { useDark, useToggle } from '@vueuse/core';
  import { computed, inject, ref } from 'vue';
  import MessageBox from '../message-box/index.vue';

  const logo =
    '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image';

  const { logout } = useUser();
  const { avatar } = useUserStore();
  const appStore = useAppStore();
  const hideMenu = computed(() => appStore.hideMenu);
  const theme = computed(() => {
    return appStore.theme;
  });
  // 主题按钮提示
  const themeContent = computed(() => {
    return theme.value === 'dark' ? '点击切换为白天模式' : '点击切换为暗黑模式';
  });

  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);

  // 设置按钮切换
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true });
  };
  // 消息通知按钮切换
  const refBtn = ref();
  const setPopoverVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    refBtn.value.dispatchEvent(event);
  };
  // 退出登录
  const handleLogout = () => {
    logout();
  };

  // 计算右侧头部宽度
  const sideRightWidth = computed(() => {
    return hideMenu.value
      ? {}
      : { width: `calc(100% - ${appStore.menuWidth}px)` };
  });
  // 切换显示菜单
  const toggleDrawerMenu = inject('toggleDrawerMenu');
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    .side-right {
      display: flex;
      justify-content: space-between;
    }
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
    width: 220px;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    .nav-btn {
      border: none;
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
</style>
