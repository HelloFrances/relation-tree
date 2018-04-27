<template>
  <div>
    <div :class="background" class="wrap">
      <p class="logic">{{ label }}</p>
      <div>{{type ? `${type} : ` : ''}}{{word}}</div>
      <div  v-if="!nodes" style="margin-top: 15px;">
        <el-input clearable placeholder="输入关键词，多个词用顿号隔开" v-model="options.words" class="input-with-select">
          <el-select  v-model="type" slot="prepend" placeholder="选择匹配规则">
            <el-option
              v-for="item,index in typeList"
              :key="index"
              :label="item.desc"
              :value="item.value">
            </el-option>
          </el-select>
          <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
        </el-input>
      </div>
      <condition-generator v-for="node in nodes" :nodes="node.nodes" :label="node.label" :type="node.type" :options="node.options" :depth="depth + 1"></condition-generator>
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
    props: [ 'label', 'nodes','type','options', 'depth' ],
    data() {
      return {
        currentCondition: {
          type: '',
          options: {
            words: ''
          }
        },
        typeList: Config.condition.type,
        condition: {}
      }
    },
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 50}px)` }
      },
      word() {
        let words =  this.options ? this.options.words : [];
        return words.join('、');
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
    }
  }
</script>