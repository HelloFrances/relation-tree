<template>
  <div>
    <div :class="background" class="wrap">
      <p class="logic">{{ condition_handle.label }}</p>
      <div>{{condition_handle.type ? `${condition_handle.type} : ${words_handle}` : ''}}</div>
      <div  v-if="!condition_handle.nodes" style="margin-top: 15px;">
        <el-input clearable placeholder="输入关键词，多个词用顿号隔开" v-model="words_handle" class="input-with-select">
          <el-select  v-model="condition_handle.type" slot="prepend" placeholder="选择匹配规则">
            <el-option
              v-for="item,index in typeList"
              :key="index"
              :label="item.desc"
              :value="item.value"
              :disabled="item.disable"
            >
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-check" v-on:@click="confirm"></el-button>
        </el-input>
      </div>
      <condition-generator v-for="node,index in condition_handle.nodes" :condition="node" :depth="depth + 1" :key="index"></condition-generator>
    </div>
  </div>
</template>

<style>
  .el-select-dropdown {
    min-width: 128px !important;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .logic {
    color: #409EFF;
  }
  .wrap {
    font-size: 0.8em;
    padding: 0 20px;
    border-radius: 4px;
    margin: 20px 0;
  }
  .green {
    border: 1px solid #eaeff4;
  }
  .yellow {
    border: 1px solid #eaeff4;
  }
  .pink {
    border: 1px solid #eaeff4;
  }
  .white {
    padding: 20px;
    background-color: #eaeff4;
  }
</style>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import Config from '../config';
  export default {
    name: "condition-generator",
    props: [ 'condition', 'depth','conditionId' ],
    data() {
      return {
        typeList: Config.condition.type,
        words_handle: '',
        condition_handle: {}
      }
    },
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 50}px)` }
      },
      background() {
        let background = {'white': true};
        switch (this.label) {
          case 'and':
            background = {'pink': true};
            break;
          case 'or':
            background = {'green': true};
            break;
          case 'not':
            background = {'yellow': true};
            break;
        }
        return background;
      }
    },
    methods: {
      ...mapMutations('condition', [
        'addCondition','removeCondition','updateConditionById'
      ]),
      arrayToString(arr) {
        return arr.join(',');
      },
      confirm() {
        let _obj = {
          type: this.condition_handle.type,
          options: {
            words:this.words_handle.replace(/，/g,',').split(',')
          }
        };
        debugger
        this.$emit('updateCondition', _obj);
      }
    },
    mounted: function () {
      /**
       * 替换成watch
       * **/
      if(!this.condition.dims.length) {
        console.log('进来啦'+this.condition.condition);
        this.condition_handle = { label: '', type: 'keyword', options: {words:[]}, id:'1222'};
        this.words_handle = '';
      }
      else {
        this.condition_handle = this.condition;
        this.words_handle = this.arrayToString(this.condition.options.words);
      }
    }
  }
</script>