<template>
  <div>
    <div class="tag-selector">
      <span class="demonstration">选择标签 </span>
      <el-cascader placeholder="Try Typing" :options="tagList_handle" v-model="selectedTags" filterable size="small"></el-cascader>
    </div>
    <condition-generator :condition="condition.condition" :conditionId="conditionId" :depth="0"></condition-generator>
  </div>
</template>
<style>
  .tag-selector {
    margin-bottom: 10px;
  }
</style>

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
        'updateDims'
      ])
    },
    watch: {
//       'condition.condition': {
//         handler: function(newC, oldC) {
//
//         },
//         deep: true
//       },
      selectedTags: function (newS,oldS) {
        let dims = [{dim:newS[0],value:newS[1]}];
        this.updateDims({
          conditionId: this.conditionId,
          dims: dims
        });
      }
    }
  }
</script>

<style scoped>

</style>
