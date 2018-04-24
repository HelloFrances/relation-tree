import types from '../mutation-types';
import * as greetService from '../../service/greet';

const {
  GREET,
  GREET_SUCCESS,
  GREET_FAILURE
} = types;

// initial state
const state = {
  list: []
};

const actions = {
  async getGreetList({ commit }) {
    try {
      const res = await greetService.getGreetList();
      commit(GREET_SUCCESS, res);
    } catch (err) {
      commit(GREET_FAILURE, err);
    }
  }
};

const mutations = {
  [GREET](state, payload) {},

  [GREET_SUCCESS](state, { data }) {
    state.list = data;
  },

  [GREET_FAILURE]() {}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
