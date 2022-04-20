<template>
  <div class="container">
    <!-- <UserInfoHeader />
    <div class="content">
      <div class="content-left">
        <a-space direction="vertical" :size="16" fill>
          <MyProject />
          <LatestActivity />
        </a-space>
      </div>
      <div class="content-right">
        <a-space :size="16" direction="vertical" fill>
          <Myteam />
          <LatestNotification />
        </a-space>
      </div>
    </div> -->
    <h1>用户信息</h1>
  </div>
</template>

<script lang="ts">
  
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .content {
    display: flex;
    margin-top: 12px;

    &-left {
      flex: 1;
      margin-right: 16px;
      overflow: hidden;
      // background-color: var(--color-bg-2);

      :deep(.arco-tabs-nav-tab) {
        margin-left: 16px;
      }
    }

    &-right {
      width: 332px;
    }

    .tab-pane-wrapper {
      padding: 0 16px 16px 16px;
    }
  }
</style>
