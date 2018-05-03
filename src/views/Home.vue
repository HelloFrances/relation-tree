<template>
  <div style="height: 100%;">
    <div>
      <div class="header-block">Let's start with creating a dimension.</div>
      <div class="content-block">
        <tag-generator></tag-generator>
      </div>
    </div>
    <div v-if="tag.length&&tag[0].values.length">
      <div class="header-block">Excellent! We can add conditions now.</div>
      <div class="content-block">
        <el-row class="new-condition-button">
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addCondition">New Condition</el-button>
        </el-row>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item  v-for="item,index in condition" :key="index" :title="`Condition${index + 1}`" :name="`${index + 1}`">
            <condition-container :condition="item" :conditionId="index"></condition-container>
          </el-collapse-item>
        </el-collapse>
      </div>
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
  //import condition from '../components/testdata';

  export default {
    name: 'Demo',
    data() {
      return {
        isFixed: true,
        tags: [],
        activeName: '1'
      };
    },
    components: {
      TagGenerator,
      ConditionContainer
    },
    computed: {
      ...mapState('tag', {
        tag: 'tagList'
      }),

      ...mapState('condition', {
        condition: 'conditionList'
      })
    },
    methods: {
      ...mapMutations('condition', [
        'addCondition','removeCondition'
      ])
    }
  };
</script>
