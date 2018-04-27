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
        <el-row>
          <el-button icon="el-icon-circle-plus-outline" type="primary">New Condition</el-button>
        </el-row>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Condition 1" name="1">
            <condition-container></condition-container>
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
</style>

<script>
  import {
    mapState
  } from 'vuex';
  import TagGenerator from '../components/tag-generator';
  import ConditionContainer from '../components/condition-container';
  import condition from '../components/testdata';

  export default {
    name: 'Demo',
    data() {
      return {
        isFixed: true,
        tags: [],
        activeName: '1',
        tree: condition
        // tree: {
        //   label: 'root',
        //   nodes: [
        //     {
        //       label: 'item1',
        //       nodes: [
        //         {
        //           label: 'item1.1'
        //         },
        //         {
        //           label: 'item1.2',
        //           nodes: [
        //             {
        //               label: 'item1.2.1'
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       label: 'item2'
        //     }
        //   ]
        // }
      };
    },
    components: {
      TagGenerator,
      ConditionContainer
    },
    computed: {
      ...mapState('tag', {
        tag: 'tagList'
      })
    }
  };
</script>
