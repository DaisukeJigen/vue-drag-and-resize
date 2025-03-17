<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const p = ref('absolute')
</script>

<template>
  <Story auto-props-disabled title="Position">
    <div id="parentDiv">
      <DragAndResize id="main" :width="200" :height="200" :position="p">
        I can move and resize
      </DragAndResize>
    </div>
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
#main {
  border: 2px solid red;
}
#parentDiv {
  border: 2px solid blue;
  margin: 50px;
  height: 80vh;
}
</style>
