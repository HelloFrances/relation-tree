<template>
  <div :class="{'gs-layout': true, 'is-fixed': fixed}">
    <div class="gs-layout-header">
      <slot name="header"></slot>
    </div>
    <div class="gs-layout-inner">
      <div
        :class="{
          'gs-layout-sidebar': true,
          'is-collapsed': isCollapsed
        }"
        :style="style"
      >
        <slot name="sidebar" @open="onOpenMenu"></slot>
      </div>
      <div class="gs-layout-content">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="gs-layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  import 'components/base';
  import './style';

  export default {
    name: 'GsLayout',
    props: {
      fixed: {
        type: Boolean,
        default: true
      },
      collapsed: {
        type: Boolean,
        default: false
      },
      sidebarWidth: {
        type: [Number, String],
        default: 200
      }
    },
    data: function () {
      return {
        isCollapsed: this.collapsed
      };
    },
    computed: {
      style() {
        let width = typeof this.sidebarWidth === 'string' ? this.sidebarWidth : `${this.sidebarWidth}px`;

        if (this.isCollapsed) {
          width = 0;
        }
        return {
          width
        };
      }
    },
    methods: {
      getHeader() {
        let header = null;

        function get(component) {
          const len = component.$children.length;

          for (let i = 0; i < len; i++) {
            const item = component.$children[i];
            if (item.$options.name === 'GsHeader') {
              header = item;
              return header;
            } else if (!header) {
              header = get(item);
            }
          }

          return header;
        }

        return get(this);
      },
      listenHeaderEvent() {
        const header = this.getHeader();

        if (header) {
          header.isOpen = !this.isCollapsed;
          header.$on('toggle-menu', (isOpen) => {
            this.onToggleMenu(isOpen);
          });
        }
      },
      onToggleMenu(isOpen) {
        this.isCollapsed = !isOpen;
      }
    },
    mounted() {
      this.listenHeaderEvent();
    }
  };
</script>
