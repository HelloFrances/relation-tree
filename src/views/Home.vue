<template>
  <div style="height: 100%;">
    <el-container>
      <el-main>
        <div class="top">
          <div class="header-block">Let's start with creating a dimension.</div>
          <div class="content-block">
            <tag-generator></tag-generator>
          </div>
        </div>
        <div class="bottom" v-if="tag.length&&tag[0].values.length">
          <div class="header-block">Excellent! We can add condition now.</div>
          <div class="content-block">
            <el-row class="new-condition-button">
              <el-button icon="el-icon-plus" type="primary" @click="addCondition">New Condition</el-button>
              <el-button icon="el-icon-caret-right" class="generate" type="primary" @click="generate"></el-button>
            </el-row>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item  v-for="item,index in condition" :key="index" :title="`Condition${index + 1}`" :name="`${index + 1}`">
                <condition-container :condition="item" :conditionId="index"></condition-container>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </el-main>
      <el-aside class="aside-block" v-if="showResultList">
        <div v-for="item,index in result" :key="index">{{item}}</div>
      </el-aside>
    </el-container>
  </div>
</template>

<style lang="scss">
  .el-main {
    padding: 0 15px 0 0;
  }
  .aside-block {
    width: 200px;
    background: #fff;
    height: -webkit-fill-available;
  }
  .generate {
    float: right;
  }
  .app-container {
    height: 100%;
  }

  .header-block {
    font-weight: bold;
    padding: 12px 0;
    line-height: 16px;
  }
  .content-block {
    //height: calc(100% - 50%);
    //display: flex;
    //justify-content: center;
    //align-items: center;
    padding: 20px;
    font-size: 28px;
    background-color: #fff;
    //width: 100%;
  }
  .new-condition-button {
    margin: 0 0 20px 0;
  }
</style>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import TagGenerator from '../components/tag-generator';
  import ConditionContainer from '../components/condition-container';
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
  import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";
  import ElAside from "../../node_modules/element-ui/packages/aside/src/main.vue";
  //import condition from '../components/testdata';

  export default {
    name: 'Demo',
    data() {
      return {
        isFixed: true,
        tags: [],
        activeName: '1',
        showResultList: false
      };
    },
    components: {
      ElAside,
      ElMain,
      ElContainer,
      TagGenerator,
      ConditionContainer
    },
    computed: {
      ...mapState('tag', {
        tag: 'tagList'
      }),

      ...mapState('condition', {
        condition: 'conditionList',
        result: 'resultList'
      })
    },
    methods: {
      ...mapMutations('condition', [
        'addCondition','removeCondition','generateResultList'
      ]),

      generate: function () {
        this.showResultList = !this.showResultList;
        if(this.showResultList) this.generateResultList();
      }
    }
  };
</script>
