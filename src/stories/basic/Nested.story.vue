<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const p = ref('absolute')
</script>

<template>
  <Story auto-props-disabled title="Nested components">
    <DragAndResize id="parent" :width="500" :height="600"><span>I can move and resize</span>
      <DragAndResize id="child" :width="200" :height="200" :position="p" :left="50" :top="100">
        <span>I can move and resize inside my parent</span>
      </DragAndResize>
    </DragAndResize>
    <template #controls>
      <HstButtonGroup
        v-model="p"
        title="position"
        :options="[
          {
            label: 'absolute',
            value: 'absolute',
          },
          {
            label: 'relative',
            value: 'relative',
          },
        ]"
      />
    </template>
  </Story>
</template>

<docs lang="md">
## Basic component
</docs>

<style lang="scss">
#parent {
  border: 2px solid red;
}
#child {
  border: 2px solid blue;
}
</style>


<!-- TODO: Make absolute positioning stay within parent if parent also resizable draggable -->