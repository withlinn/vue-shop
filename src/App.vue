<style lang="less">
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

body {
  background: #f8f8f9;
}

.header {
  height: 48px;
  line-height: 48px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.header-title {
  padding: 0 32px;
  float: left;
  color: #fff;
}
.header-menu {
  float: right;
  margin-right: 32px;
}

.header-menu-cart {
  color: #fff;
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background: #ff5500;
    color: #fff;
    font-size: 12px;
  }
}
</style>

<template>
  <div id="app">
    <div class="header">
      <router-link
        to="/list"
        class="header-title"
        >电商网站示例
      </router-link>
      <div class="header-menu">
        <router-link to="/cart" class="header-menu-cart">
        购物车<span v-if="cardList.length">{{ cardList.length }}</span></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  computed: {
    cardList() {
      return this.$store.state.cartList;
    }
  }
};
</script>
