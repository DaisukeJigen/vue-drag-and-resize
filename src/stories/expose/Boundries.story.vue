<script setup lang="ts">
import DragAndResize from '@/components/DragAndResize.vue'
import { computed, ref } from 'vue'
const b = computed(() => main.value?.boundries
),
main = ref()
</script>

<template>
  <Story auto-props-disabled title="Boundries">
    <DragAndResize id="parent" :width="500" :height="700"><span>Resize me to change child's boundries</span>
      <DragAndResize ref="main" id="main" :width="200" :height="200" :left="100" :top=200> Boundries {{ b }} </DragAndResize>
    </DragAndResize>    
  </Story>
</template>

<docs lang="md">
## Boundries
</docs>

<style lang="scss">
#parent {
  border: 2px solid blue;
}
#main {
  border: 2px solid red;
}
</style>
