<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const r = ref(true)
</script>

<template>
  <Story auto-props-disabled title="Resizable">
    <DragAndResize id="main" :width="200" :height="200" :resizeable="r">
      I can move and resize
    </DragAndResize>
    <template #controls>
      <HstCheckbox v-model="r" title="Resizable" />
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
