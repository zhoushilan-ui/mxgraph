import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    editor: null,
    graph: null,
    // layer这个变量中存储了图层的相关信息，其值以对象的形式存储，每条记录都有lab和val两个属性，
    // 其中的lab表示图层名，val表示当前图层的实际parent，也就是在创建cell等操作时实际使用的parent
    layer: [],
    workid: null,
    isPanel: false,
    isTemplate: false,
    parent: null,
    modelName: [],
  },
  getters: {
    parent(state) {
      return (
        state.layer.find((item) => item.id == state.workid) &&
        state.layer.find((item) => item.id == state.workid).val
      );
    },
  },
  mutations: {
    setColor(state, isPanel) {
      state.isPanel = isPanel;
    },
    setTemplate(state, isTemplate) {
      state.isTemplate = isTemplate;
    },
    setPushName(state, value) {
      state.modelName.push(value);
    },
  },
  actions: {},
  modules: {},
});
