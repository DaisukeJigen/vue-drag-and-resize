<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const d = ref(true)
</script>

<template>
  <Story auto-props-disabled title="Draggable">
    <DragAndResize id="main" :width="200" :height="200" :draggable="d">
      I can move and resize
    </DragAndResize>
    <template #controls>
      <HstCheckbox v-model="d" title="Draggable" />
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
</style>
