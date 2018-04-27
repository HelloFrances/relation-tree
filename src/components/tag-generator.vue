<template>
  <div class="tab-box">
    <div style="margin-bottom: 20px;">
      <el-input v-model="dimInputValue" clearable placeholder="Enter Dimention Name" @keyup.enter.native="addDim(dimInputValue)">
        <el-button
          size="small"
          @click="addDim(dimInputValue)"
          slot="append" icon="el-icon-circle-plus-outline"
        >
          New Dimention
        </el-button>
      </el-input>
    </div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeDim">
      <el-tab-pane
        :key="index"
        v-for="(dim, index) in tag"
        :label="dim.dimName"
        :name="dim.dimName"
      >
        <div>
          <el-tag
            :key="i"
            v-for="(v,i) in dim.values"
            closable
            :disable-transitions="false"
            @close="removeValue(dim.dimName,index,i)">
            {{v}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-show="tagInputVisible"
            v-model="tagInputValue"
            size="small"
            @keyup.enter.native="addValue(dim.dimName,index)"
            @blur="addValue(dim.dimName,index)"
            ref="saveTagInput"
          >
          </el-input>
          <el-button v-show="!tagInputVisible" class="button-new-tag" size="small" @click="showTagInput(index)" icon="el-icon-circle-plus-outline">New Tag</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
  .tab-box {
    width: 100%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tabs__item {
    height: 45px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: #eaeff4;
    border-bottom: 1px solid #e4e7ed;
    margin: 0;
}
</style>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';

  export default {
    name: "tag-generator",
    data() {
      return {
        dimInputValue:'',
        editableTabsValue: '',
        tagInputVisible: false,
        tagInputValue: ''
      }
    },
    methods: {
      addDim(dimName) {
        if (!dimName) return;
        this.addTag({
          dimName: dimName,
          values: []
        });
        this.editableTabsValue = dimName;
        this.dimInputValue = '';
      },

      removeDim(targetName) {
        let activeName = this.editableTabsValue;
        this.removeTag({dimName:targetName});
        if(activeName === targetName) this.editableTabsValue = this.tag[this.tag.length - 1].dimName;
      },

      removeValue(dimName,index,valueId) {
        this.removeValueByDimId({
          dimName: dimName,
          index: index,
          valueId: valueId
        });
      },

      showTagInput(index) {
        this.tagInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput[index].$refs.input.focus();
        });
      },

      addValue(dimName,index) {
        let tagInputValue = this.tagInputValue;
        if (tagInputValue) {
          this.addValueByDimId({
            dimName: dimName,
            index: index,
            value: tagInputValue
          });
        }
        this.tagInputVisible = false;
        this.tagInputValue = '';
      },

      ...mapMutations('tag', [
        'addTag','removeTag','addValueByDimId','removeValueByDimId'
      ])
    },
    computed: {
      ...mapState('tag', {
        tag: 'tagList'
      })
    }
  }
</script>