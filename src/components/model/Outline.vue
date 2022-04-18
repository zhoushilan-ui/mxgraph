<template>
  <div class="app-container">
    <vue-drag-resize
      :w="300"
      :h="300"
      :isActive="true"
      :isResizable="true"
      v-show="isdrags"
    >
      <div class="drag-title">
        <div class="drag-title-left">Outline</div>
        <div class="drag-title-right">
          <span class="el-icon-minus"></span
          ><span class="el-icon-close" @click="handleClose"></span>
        </div>
      </div>
      <div class="drag">
        <div id="container-drage"></div>
      </div>
    </vue-drag-resize>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
export default {
  name: "VueDragResize",
  props: ["isdrags"],
  components: {
    VueDragResize,
  },
  methods: {
    handleClose() {
      this.isdrags = false;
    },
  },
};
</script>

<style></style>
