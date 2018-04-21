import Vue from "vue";
import Router from "vue-router";
import List from "./views/list.vue";

Vue.use(Router);

const router = new Router({
  mode: "history", // 使用HTML5的history路由模式
  routes: [
    {
      path: "/list",
      meta: {
        title: "商品列表"
      },
      // component: resolve => require(["./views/list.vue"], resolve)
      component: List
    },
    {
      path: "/product/:id",
      meta: {
        title: "商品详情"
      },
      component: resolve => require(["./views/product.vue"], resolve)
    },
    {
      path: "/cart",
      meta: {
        title: "购物车"
      },
      component: resolve => require(["./views/cart.vue"], resolve)
    },

    {
      path: "*",
      redirect: "/list"
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
