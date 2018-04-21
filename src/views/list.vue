<style lang="less" scoped>
.product-not-found {
  text-align: center;
  padding: 32px;
}
.list-control {
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.control-filter {
  margin-bottom: 16px;
}
.control-filter-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
  &.on {
    background: #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
}
</style>

<template>
  <div class="list">
    <div v-show="list.length">
      <div class="list-control">
        <div class="control-filter">
          <span>品牌：</span>
           <span 
          class="control-filter-item" 
          :class="{on: item === filterBrand}" 
          v-for="(item, index) in brands"
          @click="handleFilterBrand(item)"
          :key="index">{{ item }}</span>
      </div>
      <div class="control-filter">
        <span>颜色：</span>
        <span 
          class="control-filter-item" 
           @click="handleFilterColor(item)"
          :class="{on: item === filterColor}" 
          v-for="(item, index) in colors"
          :key="index">{{ item }}</span>
      </div>
      <div class="control-filter">
        <span>排序：</span>
        <span class="control-filter-item" :class="{on: order === ''}"
          @click="order = ''"
          >默认</span>
        <span 
          class="control-filter-item" 
          :class="{on: order === 'sales'}"
          @click="order = 'sales'">
          销量<template v-if="order === 'sales'">↓</template>
        </span>
        <span class="control-filter-item"
          :class="{on: order.indexOf('cost') >-1}"
          @click="order = order === 'cost-desc'? 'cost-asc' : 'cost-desc'"
          >
          价格<template v-if="order === 'cost-asc'">↑</template><template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>
 
        <Product v-for="item in filterAndOrderedList"
          :info="item"
          :key="item.id"></Product>
        <div 
          class="product-not-found"
          v-show="!filterAndOrderedList.length"
          >暂无相关商品</div>
    </div>
  </div>
</template>

<script>
import Product from "../components/product.vue";
export default {
  data() {
    return {
      order: "",
      filterBrand: "",
      filterColor: ""
    };
  },
  components: { Product },
  computed: {
    list() {
      return this.$store.state.productList;
    },
    brands() {
      return this.$store.getters.brands;
    },
    colors() {
      return this.$store.getters.colors;
    },
    filterAndOrderedList() {
      // 复制原始数组
      let list = [...this.list];
      // 按照品牌过滤
      if (this.filterBrand) {
        list = list.filter(item => item.brand === this.filterBrand);
      }
      // 按照颜色过滤
      if (this.filterColor) {
        list = list.filter(item => item.color === this.filterColor);
      }
      // 排序
      if (this.order !== "") {
        if (this.order === "sales") {
          list = list.sort((a, b) => b.sales - a.sales);
        } else if (this.order === "cost-desc") {
          list = list.sort((a, b) => a.cost - b.cost);
        } else if (this.order === "cost-asc") {
          list = list.sort((a, b) => b.cost - a.cost);
        }
      }
      return list;
    }
  },
  methods: {
    handleFilterColor(color) {
      this.filterColor = this.filterColor === color ? "" : color;
    },
    handleFilterBrand(brand) {
      this.filterBrand = this.filterBrand === brand ? "" : brand;
    },
    handleOrderCost() {}
  },

  mounted() {
    // 初始化时候，通过Vuex的action请求数据
    this.$store.dispatch("getProductList");
  }
};
</script>
