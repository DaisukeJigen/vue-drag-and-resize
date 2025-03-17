<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const dragging = ref(0),
  dragStarted = ref(0),
  dragStopped = ref(0),
  endProduct = ref()

</script>

<template>
  <Story auto-props-disabled title="Dragging">
    <DragAndResize id="main" :width="200" :height="200"
     @dragging="() => { dragging += 1 }"
     @dragStart="() => dragStarted += 1"
     @dragEnd="(ret) => {dragStopped += 1;endProduct = ret}">
      <span>Drag Started: {{ dragStarted }}</span>
      <br/>
      <span>Dragging: {{  dragging }}</span>
      <br/>
      <span>Drag Stopped: {{ dragStopped }}</span>
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
