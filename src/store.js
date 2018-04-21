import Vue from "vue";
import Vuex from "vuex";
import product_data from "./api/index";
import filerArray from "./util/filter";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 商品列表数据
    productList: [],
    // 购物车数据
    cartList: []
  },
  getters: {
    brands: state => {
      const brands = state.productList.map(item => item.brand);
      return filerArray(brands);
    },
    colors: state => {
      const colors = state.productList.map(item => item.color);
      return filerArray(colors);
    }
  },
  mutations: {
    // 添加商品列表
    setProductList(state, data) {
      state.productList = data;
    },
    // 添加到购物车
    addCart(state, id) {
      // 判断当前购物车是否有，如果有，数量+1
      const isAdded = state.cartList.find(item => item.id === id);
      if (isAdded) {
        isAdded.count++;
      } else {
        state.cartList.push({
          id: id,
          count: 1
        });
      }
    },
    // 修改购物车商品数量
    editCartCount(state, payload) {
      const product = state.cartList.find(item => item.id === payload.id);
      product.count += payload.count;
    },
    deleteCart(state, id) {
      const index = state.cartList.findIndex(item => item.id === id);
      state.cartList.splice(index, 1);
    },
    emptyCart(state) {
      state.cartList = [];
    }
  },
  actions: {
    // 请求商品列表
    getProductList(ctx) {
      // 模拟Ajax获取
      setTimeout(() => {
        ctx.commit("setProductList", product_data);
      }, 500);
    },
    // 购买 异步请求
    buy(ctx) {
      return new Promise(resolve => {
        setTimeout(() => {
          ctx.commit("emptyCart");
          resolve();
        }, 500);
      });
    }
  }
});
