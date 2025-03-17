<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const endProduct = ref(),
  resizeStarted = ref(0),
  resizeStopped = ref(0),
  resizing = ref(0)

</script>

<template>
  <Story auto-props-disabled title="Resizing">
    <DragAndResize id="main" :width="200" :height="200"
     @resizing="() => { resizing += 1 }"
     @resizeStart="() => resizeStarted += 1"
     @resizeEnd="(ret) => {resizeStopped += 1, endProduct = ret}">
      <span>Resize Started: {{ resizeStarted }}</span>
      <br/>
      <span>Resizing: {{  resizing }}</span>
      <br/>
      <span>Resize Stopped: {{ resizeStopped }}</span>
      <br/>
      <span>Response: {{ endProduct }}</span>
    </DragAndResize>
  </Story>
</template>

<docs lang="md">
## Basic component
</docs>

<style lang="scss">
#main {
  border: 2px solid red;
}
</style>
