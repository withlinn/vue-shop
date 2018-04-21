<style lang="less" scoped>
.product {
  width: 25%;
  float: left;
  :hover {
    h4 {
      color: #0070c9;
    }
    .product-add-cart {
      display: inline-block;
    }
  }
  &-main {
    display: block;
    margin: 16px;
    padding: 16px;
    border: 1px solid #dddee1;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    text-align: center;
    position: relative;

    img {
      width: 100%;
    }

    h4 {
      color: #222;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .product-color {
      display: block;
      width: 16px;
      height: 16px;
      border: 1px solid #dddee1;
      border-radius: 50%;
      margin: 6px auto;
    }

    .product-cost {
      color: #de4037;
      margin-top: 6px;
    }
    .product-add-cart {
      display: none;
      padding: 4px 8px;
      background: #2d8cf0;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      position: absolute;
      cursor: pointer;
      top: 10px;
      right: 10px;
    }
  }
}
</style>


<template>
  <div class="product">
    <router-link
      :to="'/product/'+info.id"
      class="product-main"
      >
      <img :src="info.image">
      <h4>{{ info.name }}</h4>
      <div class="product-color"
          :style="{background: colors[info.colo]}"
        >
      </div>
      <div class="product-cost"></div>
      <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data() {
    return {
      colors: {
        白色: "#fffff",
        金色: "#dac272",
        蓝色: "#233472",
        红色: "#f2352e"
      }
    };
  },
  methods: {
    handleCart() {
      this.$store.commit("addCart", this.info.id);
    }
  }
};
</script>
