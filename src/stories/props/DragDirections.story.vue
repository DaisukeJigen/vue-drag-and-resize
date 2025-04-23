<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const d = ref(['x'])
</script>

<template>
  <Story auto-props-disabled title="Drag Directions">
    <DragAndResize id="main" :width="200" :height="200" :drag-directions="d">
      I can move and resize
    </DragAndResize>
    <template #controls>
      <HstCheckboxList
        v-model="d"
        title="Directions"
        :options="['x', 'y'].map((d) => ({ label: d, value: d }))"
      />
    </template>
  </Story>
</template>

<docs lang="md">
## Drag Directions
</docs>

<style lang="scss">
#main {
  border: 2px solid red;
}
</style>
