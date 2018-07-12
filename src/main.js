import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import storeOptions from './stores/store';
import routerOptions from './router/routerOptions';

import App from './App.vue'

Vue.use(VueRouter);
Vue.use(Vuex);

const { state, getters, mutations, actions } = storeOptions;
const router = new VueRouter(routerOptions);
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
