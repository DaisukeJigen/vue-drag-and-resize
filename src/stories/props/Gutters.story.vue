<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const b = ref(200),
  l = ref(50),
  r = ref(100),
  t = ref(150)
</script>

<template>
  <Story auto-props-disabled title="Gutters">
    <DragAndResize
      id="main"
      :width="200"
      :height="200"
      :left-gutter="l"
      :right-gutter="r"
      :top-gutter="t"
      :bottom-gutter="b"
    >
      I can move and resize
    </DragAndResize>
    <template #controls>
      <HstNumber v-model="l" :step="1" title="Left Gutter" />
      <HstNumber v-model="r" :step="1" title="Right Gutter" />
      <HstNumber v-model="t" :step="1" title="Top Gutter" />
      <HstNumber v-model="b" :step="1" title="Bottom Gutter" />
    </template>
  </Story>
</template>

<docs lang="md">
## Gutters
</docs>

<style lang="scss">
#main {
  border: 2px solid red;
}
</style>
