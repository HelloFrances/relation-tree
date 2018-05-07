/**
 * Created by Frances on 2018/04/24.
 * **/

import Config from '../../config';

// initial state
const state = {
  conditionList: [],
  resultList: []
};

const actions = {

  getConditionList({commit}) {
    //todo import conditionList
  },

};

const mutations = {

  /**
   * 新增一个空的condition
   * **/
  addCondition(state) {
    let _condition = {
      dims:[],//dim:{dim:'',value:''}
      condition:{
        id:Config.randomId(),
        type: '',
        options: {}
      }
    };
    state.conditionList.push(_condition);
  },

  removeCondition(state, payload) {
    /**
     * @payload:{dimName:name}
     * */
  },

  /**
   * 根据节点id增加一个父亲节点
   * @payload:{selfId:selfId,logic:'and/or/not',conditionId:''}
   * */
  addFatherById(state, payload) {

    addFather(state.conditionList[payload.conditionId].condition,payload);

    function addFather(target,payload){
      if(target.id === payload.selfId) {
        let _target = {},_selfId = Config.randomId();
        Object.assign(_target,target);
        _target.parentId = _selfId;
        target.nodes = [];
        target.nodes.push(_target);
        target.id = _selfId;
        target.label = payload.logic;
        delete target.type;
        delete target.options;
      }
      else if(target.nodes) {
        target.nodes.forEach(item => {
          addFather(item,payload);
        });
      }
    }
  },

  /**
   * 根据节点id增加一个子节点
   * @payload:{selfId:selfId,conditionId:''}
   * */
  addBrotherById(state,payload) {
    addBrother(state.conditionList[payload.conditionId].condition,payload);

    function addBrother(target,payload) {
      debugger
      if(target.id === payload.selfId) {
        let _target = {
          id:Config.randomId(),
          parentId: payload.selfId,
          type: '',
          options: {}
        };
        if(target.nodes) target.nodes.push(_target);
        else {
          target.nodes = [];
          target.nodes.push(_target);
        }

      }
      else if(target.nodes) {
        target.nodes.forEach(item => {
          addBrother(item,payload);
        });
      }
    }
  },

  /**
   * 根据节点id编辑
   * @payload:{selfId:selfId,type:'',options:{},conditionId:''}
   * */
  updateById(state,payload) {
    update(state.conditionList[payload.conditionId].condition,payload);
    function update(target,payload) {
      if(target.id === payload.selfId) {
        target.type = payload.type;
        target.options = payload.options;
      }
      else if(target.nodes) {
        target.nodes.forEach(item => {
          update(item,payload);
        });
      }
    }
  },

  /**
   * 编辑标签信息
   * @payload:{dims:[],conditionId:''}
   * */
  updateDims(state,payload) {
    state.conditionList[payload.conditionId].dims = [...payload.dims];
  },

  /**
   * 根据节点id删除
   * @payload:{selfId:selfId,parentId:'',conditionId:''}
   * */
  removeById(state,payload) {
    remove(state.conditionList[payload.conditionId].condition,payload);
    function remove(target,payload) {
      if(payload.parentId) {
        if(target.id === payload.parentId) {
          let _length = target.nodes.length;
          if(_length == 1) {
            target.nodes.splice(0,1);
            delete target.nodes;
            delete target.label;
            target.options = {};
            target.type = '';
          }
          else if(_length > 1) {
            let _index = 0;
            target.nodes.forEach((item,index) => {
              if(item.id === payload.selfId) {
                _index = index;
                return;
              }
            });
            target.nodes.splice(_index,1);
          }
        }
        else if(target.nodes) {
          target.nodes.forEach(item => {
            remove(item,payload);
          });
        }
      }
      else {
        target.options = {};
        target.type = '';
      }
    }
  },

  /**
   * 生成结果树
   * */
  generateResultList(state) {
    state.resultList = [];
    state.conditionList.forEach(item => {
      let _condition = {
        dims:[...item.dims],
        condition:{}
      },_source = {},_target = {};
      Object.assign(_source,item.condition);

      rebuild(_target,_source);
      _condition.condition = _target;
      state.resultList.push(_condition);

      function rebuild(target,source) {
        if(!source.nodes&&!source.label) {
          target.type = source.type;
          target.options = source.options;
        }
        else if(source.nodes) {
          if(source.label == 'not') {
            target[source.label] = {};
            // 规则有点忘了
          }
          else {
            target[source.label] = [];
            source.nodes.forEach((item,index) => {
              target[source.label][index] = {};
              rebuild(target[source.label][index],item);
            })
          }
        }
      }
    })
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
