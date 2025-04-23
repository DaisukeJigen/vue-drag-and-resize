<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { ref } from 'vue'
const p = ref('absolute')
</script>

<template>
  <Story auto-props-disabled title="Multiple Components">
    <DragAndResize id="one" :width="300" :height="150"><span>I am div #1</span>
    </DragAndResize>
      <DragAndResize id="two" :width="200" :height="200" :position="p" :left="50" :top="100">
        <span>I am div #2</span>
      </DragAndResize>
      <DragAndResize id="three" :width="300" :height="100" :position="p" :left="150" :top="100">
        <span>I am div #3</span>
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
## Multipe Components
When dragging/resizing, selected component moves to top
</docs>

<style lang="scss">
#one {
  border: 4px solid darken(red,25%);
  background: red;
}
#two {
  border: 4px solid darken(blue,25%);
  background: blue;
}
#three {
  border: 4px solid darken(yellow,25%);
  background: yellow;
}
</style>