<template>
  <div>
    <div class="tag-selector">
      <el-cascader placeholder="Try Typing" :options="tagList_handle" v-model="selectedTags" filterable></el-cascader>
      <span class="demonstration">{{selectedTags}}</span>
    </div>
    <condition-generator :condition="condition" :conditionId="conditionId" :depth="0" v-on:updateCondition="handleUpdateCondition"></condition-generator>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import ConditionGenerator from '../components/condition-generator';
  import conditionTest from '../components/testdata';
  export default {
    name: "condition-container",
    props: ['condition','conditionId'],
    data() {
      return {
        selectedTags: []
      };
    },
    components: {
      ConditionGenerator
    },
    computed: {
      ...mapState('tag', {
        tag: 'tagList'
      }),

      /**
       * 将tag处理成级联菜单的数据格式
       * **/
      tagList_handle() {
        let _originTagList = this.tag;
        let _tagList = [];
        if(_originTagList.length) {
          _originTagList.forEach(item => {
            let _obj = {
              value: item.dimName,
              label: item.dimName,
              children: item.values.length?(item.values.map(i => {
                return i = {value: i,label: i};
              })):[{value:'',label:''}]
            };
            _tagList.push(_obj);
          });
        }
        return _tagList;
      }

    },
    methods: {
      ...mapMutations('condition', [
        'updateConditionById'
      ]),

      handleUpdateCondition(_obj) {
        let dims = [{dim:this.selectedLabel[0],value:this.selectedLabel[1]}];
        debugger
        this.updateConditionById({
          conditionId: this.conditionId,
          condition: {
            dims: dims,
            condition: _obj
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>