<template>
  <div style="height: 100%;">
    <div class="header-block">Let's start with creating a dimension.</div>
    <div class="content-block">
      <tag-generator></tag-generator>
    </div>
    <div class="header-block">Excellent! We can add conditions now.</div>
    <div class="content-block">
      <condition-generator></condition-generator>
    </div>
  </div>
</template>

<style lang="scss">
.app-container {
  height: 100%;
}

.header-block {
  font-weight: bold;
  padding: 12px 0;
  line-height: 16px;
}
.content-block {
  height: calc(100% - 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 28px;
  background-color: #fff;
}
</style>

<script>
import {
  mapState,
  mapActions
} from 'vuex';
import TagGenerator from '../components/tag-generator';
import ConditionGenerator from '../components/condition-generator';

export default {
  name: 'Demo',
  data() {
    return {
      isFixed: true,
      tags: []
    };
  },
  components: {
    TagGenerator,
    ConditionGenerator
  },
  computed: {
    ...mapState('greet', {
      greetlist: 'list'
    })
  },
  methods: {
    ...mapActions('greet', [
      'getGreetList'
    ])
  },
  mounted() {
    this.getGreetList();
    console.log(this);
  }
};
</script>
