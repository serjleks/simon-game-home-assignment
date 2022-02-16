<template>
  <div class="app-layout">
    <div class="app-header">
      <slot name="header"></slot>
    </div>

    <div class="app-main">
      <slot></slot>
    </div>

    <div class="app-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
}

.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 48px;
}

.app-main {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 64px;
}
</style>
