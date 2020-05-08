<template>
  <gs-menu
    slot="sidebar"
    unique-opened
    :default-active="active"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="item in data">
      <gs-menu-item
        :title="item.name"
        :icon="item.icon"
        :index="item.href"
        :href="item.href"
        v-if="item.href"
        :key="item.href"
      ></gs-menu-item>

      <gs-menu-item
        :index="`${item.path}`"
        :href="`#${item.path}`"
        v-if="item.path"
        :key="item.path"
      >
        <gs-icon :name="item.icon" v-if="item.icon"></gs-icon>
        <span>{{item.name}}</span>
      </gs-menu-item>

      <gs-submenu
        :title="item.name"
        :icon="item.icon"
        :index="item.name"
        v-if="item.children"
        :key="item.name"
      >
        <template v-for="item1 in item.children">
          <gs-menu-item
            :title="item1.name"
            :icon="item1.icon"
            :index="item1.href"
            :href="item1.href"
            v-if="item1.href"
            :key="item1.href"
          ></gs-menu-item>

          <gs-menu-item
            :index="`${item1.path}`"
            :href="`#${item1.path}`"
            v-if="item1.path"
            :key="item1.path"
          >
            <gs-icon :name="item1.icon" v-if="item1.icon"></gs-icon>
            <span>{{item1.name}}</span>
          </gs-menu-item>

          <gs-submenu
            :title="item1.name"
            :icon="item1.icon"
            :index="item1.name"
            v-if="item1.children"
            :key="item1.name"
          >
            <template v-for="item2 in item1.children">
              <gs-menu-item
                :title="item2.name"
                :icon="item2.icon"
                :index="item2.href"
                :href="item2.href"
                v-if="item2.href"
                :key="item2.href"
              ></gs-menu-item>

              <gs-menu-item
                :index="`${item2.path}`"
                :href="`#${item2.path}`"
                v-if="item2.path"
                :key="item2.path"
              >
                <gs-icon :name="item2.icon" v-if="item2.icon"></gs-icon>
                <span>{{item2.name}}</span>
              </gs-menu-item>
            </template>
          </gs-submenu>
        </template>
      </gs-submenu>
    </template>
  </gs-menu>
</template>
<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {}
  },
  computed: {
    active () {
      return this.$route.path
    }
  },
  methods: {
    handleSelect (index) { // 导航选中事件
      this.$emit('select', index)
    },
    handleOpen (index) { // 导航展开事件
      this.$emit('open', index)
    },
    handleClose (index) { // 导航收起事件
      this.$emit('close', index)
    }
  }
}
</script>
