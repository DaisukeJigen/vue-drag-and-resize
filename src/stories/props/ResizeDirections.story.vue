<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const rd = ref(['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr'])
</script>

<template>
  <Story auto-props-disabled title="Resize Direction">
    <DragAndResize id="main" :width="200" :height="200" :resize-directions="rd">
      I can move and resize
    </DragAndResize>
    <template #controls>
      <HstCheckboxList
        v-model="rd"
        title="Directions"
        :options="['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr'].map((d) => ({ label: d, value: d }))"
      />
    </template>
  </Story>
</template>

<docs lang="md">
## Resize Directions
</docs>

<style lang="scss">
#main {
  border: 2px solid red;
}
</style>
