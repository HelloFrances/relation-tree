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

  addCondition(state, payload) {
    /**
     * payload:{dimName:name,values:[value1,value2,...]}
     * */
    state.conditionList.push(payload);
  },

  removeCondition(state, payload) {
    /**
     * payload:{dimName:name}
     * */
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};