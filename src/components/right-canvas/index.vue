<template>
  <div class="app-container">
    <div class="top">
      <span
        class="item"
        @click="handleSelect(1)"
        :class="{ color: activeIndex == 1 }"
        >Style样式</span
      >
      <span
        class="item"
        @click="handleSelect(2)"
        :class="{ color: activeIndex == 2 }"
        >选择</span
      >
    </div>
    <div class="contaierstyle">
      <Style v-show="activeIndex == 1"></Style>
      <Arrows v-show="activeIndex == 2"></Arrows>
    </div>
  </div>
</template>

<script>
import Style from "./style.vue";
import Arrows from "./arrow.vue";
export default {
  components: {
    Style,
    Arrows,
  },
  data() {
    return {
      index: 1,
      activeIndex: 1,
    };
  },
  mounted() {},
  methods: {
    handleSelect(i) {
      console.log(i);
      this.activeIndex = i;
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 5%;
.app-container {
  //   position: fiaxed;
  //   top: 8%;
  //   right: 0.2%;
  width: 20%;
  height: 100%;
  bottom: 0;
  background-color: #fff;
  height: 100%;
  .top {
    width: 100%;
    height: $height;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;

    .item {
      line-height: 3;
      height: 100%;
      font-size: 14px;
      width: 50%;

      &:hover {
        cursor: pointer;
      }
    }

    .color {
      color: royalblue;
      border-bottom: 1px solid royalblue;
    }
  }

  .contaierstyle {
    width: 100%;
    height: 100% - $height;
    background-color: blanchedalmond;
  }
}
</style>
