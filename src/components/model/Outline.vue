<template>
  <div>
    <vue-drag-resize :w="300" :h="300" :isActive="true" :isResizable="true">
      <div class="drag-title">
        <div class="drag-title-left">Outline</div>
        <div class="drag-title-right">
          <span class="el-icon-minus"></span><span class="el-icon-close"></span>
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
  components: {
    VueDragResize,
  },
};
</script>

<style></style>
