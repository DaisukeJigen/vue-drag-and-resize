<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { computed, ref } from 'vue'
const c = computed(() => main.value?.corners
),
main = ref()
</script>

<template>
  <Story auto-props-disabled title="Corners">
    <DragAndResize ref="main" id="main" :width="200" :height="200"> Corners {{ c }} </DragAndResize>
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
