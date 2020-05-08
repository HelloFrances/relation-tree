<template>
  <div>
    <el-row>
      <el-card shadow="hover">
        <div :class="background" class="wrap">
          <el-row><span class="logic">{{ condition_handle.label }}</span></el-row>
          <el-row>
            <el-button  v-if="condition_handle.nodes" size="small" @click="addBrother" type="primary" icon="el-icon-plus" plain></el-button>
            <el-button size="small" v-for="item,index in logic" :key="index" @click="addFather(item.value)" type="primary" plain>{{item.value}}</el-button>
            <el-button size="small" @click="removeNode" class="remove" type="primary" icon="el-icon-delete"></el-button>
          </el-row>
          <el-row>
            <div v-if="!condition_handle.nodes" style="margin-top: 15px;">
              <el-input clearable placeholder="输入关键词，多个词用逗号隔开" v-model="words_handle" class="input-with-select">
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
                <el-button slot="append" icon="el-icon-check" @click="confirm"></el-button>
              </el-input>
            </div>
          </el-row>
          <el-row>
            <condition-generator v-for="node,index in condition_handle.nodes" :condition="node" :conditionId="conditionId" :depth="depth + 1" :key="index"></condition-generator>
          </el-row>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<style>
  .el-row {
    padding: 3px;
  }
  .el-card__body {
    padding: 12px;
  }
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
    margin: 5px 0;
    display: block;
  }
  .remove {
    float: right;
  }
  .wrap {
    font-size: 0.8em;

    border-radius: 4px;
    /*margin: 20px 0;*/
  }
  .green {
    /*border: 1px solid #eaeff4;*/
  }
  .yellow {
    /*border: 1px solid #eaeff4;*/
  }
  .pink {
    /*border: 1px solid #eaeff4;*/
  }
  .white {
    /*padding: 20px;*/
    /*background-color: #eaeff4;*/
    padding: 12px;
    border: 1px dashed #eaeff4;
  }
</style>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import Config from '../config'
import ElRow from 'element-ui/packages/row/src/row'
import ElCard from '../../node_modules/element-ui/packages/card/src/main.vue'

export default {
  components: {
    ElCard,
    ElRow
  },
  name: 'condition-generator',
  props: ['condition', 'depth', 'conditionId'],
  data () {
    return {
      // selfId: '',
      // parentId: '',
      typeList: Config.condition.type,
      logic: Config.logic,
      words_handle: '',
      condition_handle: {}
    }
  },
  computed: {
    selfId () {
      return this.condition.id
    },
    parentId () {
      return this.condition.parentId ? this.condition.parentId : ''
    },
    indent () {
      return { transform: `translate(${this.depth * 50}px)` }
    },
    background () {
      let background = { white: true }
      switch (this.condition_handle.label) {
        case 'and':
          background = { pink: true }
          break
        case 'or':
          background = { green: true }
          break
        case 'not':
          background = { yellow: true }
          break
      }
      return background
    }
  },
  methods: {
    ...mapMutations('condition', [
      'addFatherById', 'addBrotherById', 'updateById', 'removeById'
    ]),
    arrayToString (arr) {
      //        if(toString.call(arr) != '[object array]') return '';
      return arr.join(',')
    },

    randomId (n) {
      let res = ''
      for (let i = 0; i < n; i++) {
        const id = Math.ceil(Math.random() * 35)
        res += Config.randomChars[id]
      }
      return res
    },
    confirm () {
      const _obj = {
        selfId: this.selfId,
        type: this.condition_handle.type,
        options: {
          words: this.words_handle.replace(/，/g, ',').split(',')
        },
        conditionId: this.conditionId
      }
      this.updateById(_obj)
      // this.$emit('updateCondition', _obj);
    },
    addFather (logic) {
      const _obj = {
        conditionId: this.conditionId,
        logic: logic,
        selfId: this.selfId
      }
      this.addFatherById(_obj)
    },
    addBrother () {
      const _obj = {
        conditionId: this.conditionId,
        selfId: this.selfId
      }
      this.addBrotherById(_obj)
    },
    removeNode () {
      const _obj = {
        selfId: this.selfId,
        parentId: this.parentId,
        conditionId: this.conditionId
      }
      this.removeById(_obj)
    }
  },
  mounted: function () {

  },
  watch: {
    //      'condition_handle': {
    //        handler: function(newC, oldC) {
    //          debugger
    //          this.words_handle = newC.options? this.arrayToString(newC.options.words): '';
    //        },
    //        deep: true
    //      },
    condition: {
      handler: function (newC, oldC) {
        for (const i in this.condition_handle) {
          delete this.condition_handle[i]
        }
        for (const ii in newC) {
          this.$set(this.condition_handle, ii, newC[ii])
        }
        // this.$set(this,'words_handle',newC.options? this.arrayToString(newC.options.words): '');
        this.words_handle = this.condition_handle.options ? this.arrayToString(this.condition_handle.options.words) : ''
        // this.$forceUpdate();
        debugger
      },
      deep: true
    }
    //      'condition.options': {
    //        handler: function(newC, oldC) {
    //          debugger
    //          console.log(newC);
    //        },
    //        deep: true
    //      },
    //      'condition.id': {
    //        handler: function(newC, oldC) {
    //          debugger
    //          console.log(newC);
    //        },
    //        deep: true
    //      },
    //      'condition.parentId': {
    //        handler: function(newC, oldC) {
    //          debugger
    //          console.log(newC);
    //        },
    //        deep: true
    //      }
  }
}
</script>
