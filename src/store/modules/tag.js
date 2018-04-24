/**
 * Created by Frances on 2018/04/23.
 * **/

// initial state
const state = {
  tagList: []
};

const actions = {

  getTagList({commit}) {
    //todo import taglist
  },

};

const mutations = {

  addTag(state, payload) {
    /**
     * payload:{dimName:name,values:[value1,value2,...]}
     * */
    let _tagList = state.tagList;
    let _same = _tagList.filter(t => {
      return t.dimName == payload.dimName;
    });
    if(!_same.length) _tagList.push(payload);
  },

  removeTag(state, payload) {
    /**
     * payload:{dimName:name}
     * */
    let _tagList = state.tagList.filter(function (item) {
      return item.dimName != payload.dimName;
    });
    state.tagList = [..._tagList];
    console.log(state.tagList);
  },

  addValueByDimId(state, payload) {
    /**
     * payload:{dimName:name,index:index,value:value}
     * */
    let _values = state.tagList[payload.index].values;
    let _same = _values.filter(v => {
      return v == payload.value;
    });
    if(!_same.length) _values.push(payload.value);
  },


  removeValueByDimId(state, payload) {
    /**
     * payload:{dimName:name,index:index,valueId:valueId}
     * */
    let values = state.tagList[payload.index].values;
    values.splice(payload.valueId,1);
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};