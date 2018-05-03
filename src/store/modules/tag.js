/**
 * Created by Frances on 2018/04/23.
 * **/

// initial state
const state = {
  /**
   * tagList:[{dimName:'',values:['','',...]},{...}]
   * */
  tagList: [],
  tagList_handle: []
};

const actions = {

  getImportTagList({commit}) {
    //todo import taglist
  },

};

const mutations = {

  /**
   * 获取原始格式的tagList
   * */
  getOriginTagList(state) {
    //return state.tagList;
  },

  /**
   * 处理成的格式为tagList:[{dimName:'',value:''},{...}]
   * */
  getTaglist(state) {
    let _tagList = [];
    state.tagList.forEach(item, index => {
      if(item.values.length) {
        item.values.forEach(i,id => {
          let _obj = {
            dimName: item.dimName,
            value: i
          };
          _tagList.push(_obj);
        })
      }
    });
    state.tagList_handle  = [..._tagList];
  },

  /**
   * 新增一个tag
   * @payload:{dimName:name,values:[value1,value2,...]}
   * */
  addTag(state, payload) {
    let _tagList = state.tagList;
    let _same = _tagList.filter(t => {
      return t.dimName == payload.dimName;
    });
    if(!_same.length) _tagList.push(payload);
  },

  /**
   * 移除一个tag
   * @payload:{dimName:name}
   * */
  removeTag(state, payload) {
    let _tagList = state.tagList.filter(function (item) {
      return item.dimName != payload.dimName;
    });
    state.tagList = [..._tagList];
    console.log(state.tagList);
  },

  /**
   * 根据dimId新增value
   * @payload:{dimName:name,index:index,value:value}
   * */
  addValueByDimId(state, payload) {
    let _values = state.tagList[payload.index].values;
    let _same = _values.filter(v => {
      return v == payload.value;
    });
    if(!_same.length) _values.push(payload.value);
  },

  /**
   * 根据dimId移除value
   * @payload:{dimName:name,index:index,valueId:valueId}
   * */
  removeValueByDimId(state, payload) {
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