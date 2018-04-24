<template>
  <gs-layout class="app-container">
    <!-- 头部区域 -->
    <gs-header slot="header" :is-fixed="isFixed">
      <span slot="logo">
        <span style="font-size: 21px; color: #0073e8">Data</span>
        <span style="font-size: 20px; color: #fff">Extension Demo</span>
      </span>
    </gs-header>

    <!-- 左侧菜单区域 -->
    <side-nav slot="sidebar"
      :data="navsData"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
    </side-nav>

    <!-- 内容左侧菜单区域 -->
    <div slot="content" style="height: 100%;">
      <router-view></router-view>
    </div>
  </gs-layout>
</template>

<script>
import SideNav from '../components/side-nav';

export default {
  data() {
    return {
      navsData: [ // 导航数据
        {
          name: 'Create',
          icon: 'user',
          path: '/home'
        },
        {
          name: 'Demo',
          icon: 'user',
          children: [
            {
              name: 'Demo2',
              path: '/demo2'
            }
          ]
        }
      ],
      isFixed: true
    };
  },
  components: {
    SideNav
  },
  methods: {
    handleSelect(index) { // 导航选中事件
      console.log(index);
    },
    handleOpen(index) { // 导航展开事件
      console.log(index);
    },
    handleClose(index) { // 导航收起事件
      console.log(index);
    }
  }
};
</script>
