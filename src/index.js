import Vue from 'vue';
import router from './router'
import store from './store';
import Gsui from 'gs-ui';
import 'gs-ui/lib/theme/themes.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import './style';

Vue.use(Gsui);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  components: {
    App
  },
  render() {
    return <App />;
  }
});
