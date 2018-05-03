/**
 * Created by Frances on 2018/04/24.
 * **/

// initial state
const state = {
  conditionList: []
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
      condition:{}
    };
    state.conditionList.push(_condition);
  },

  /**
   * 根据条件id更新一个条件
   * @payload:{conditionId:index,condition:{dims:[{dim:'',value:''},{...}],condition:{}}}
   * */
  updateConditionById(state, payload) {
    debugger
    state.conditionList[payload.conditionId] = payload.condition;
  },

  removeCondition(state, payload) {
    /**
     * @payload:{dimName:name}
     * */
  },

  addFather(state, payload) {

  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};