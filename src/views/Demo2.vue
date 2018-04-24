<template>
  <div style="height: 100%">
    <div class="header-block">Demo2</div>
    <div class="content-block"></div>
  </div>
</template>

<style>
  .app-container {
    height: 100%;
  }

  .header-block {
    font-weight: bold;
    padding-bottom: 16px;
    line-height: 16px;
  }
  .content-block {
    height: calc(100% - 32px);
    background-color: #fff;
  }
</style>

<script>
  export default {
    name: 'Demo',
    data() {
      return {};
    }
  };
</script>
