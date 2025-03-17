<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const d = ref('#header')
</script>

<template>
  <Story auto-props-disabled title="Drag On">
    <DragAndResize id="main" :width="200" :height="200" :drag-on="d">
      <div id="header">Header</div>
      <br />
      I can move and resize
    </DragAndResize>
    <template #controls>
      <HstText v-model="d" title="DragOn" />
    </template>
  </Story>
</template>

<docs lang="md">
## Basic component
</docs>

<style lang="scss">
#main {
  border: 2px solid red;
}
#header {
  width: 100%;
  background: blue;
}
</style>
