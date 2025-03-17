<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
</script>

<template>
  <Story auto-props-disabled title="Basic component">
    <DragAndResize id="main">
      <span>I can move and resize</span>
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
