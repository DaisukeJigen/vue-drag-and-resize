<script setup lang="ts">
import { ref } from 'vue'

import DragAndResize from './components/DragAndResize.vue'
const dragDirections = ref(['x', 'y']),
  draggable = ref(true),
  dragOn = ref('#hello'),
  grabWidth = ref(5),
  height = ref(250),
  left = ref(250),
  // maxX = ref(700),
  // maxY = ref(700),
  // minX = ref(200),
  // minY = ref(150),
  position = ref('relative'),
  resizeable = ref(true),
  top = ref(250),
  width = ref(250)
</script>

<template>
  <div id="parentDiv">
    <DragAndResize
      id="testDiv"
      :dragOn="dragOn"
      :left="left"
      :top="top"
      :width="width"
      :height="height"
      :dragDirections="dragDirections"
      :resizeable="resizeable"
      :draggable="draggable"
      :grabWidth="grabWidth"
      :position="position"
    >
      <span id="hello">Hello</span><br />
    </DragAndResize>
    <div id="options">
      <span>resizable</span><input type="text" v-model="resizeable" /> <br />
      <span>draggable</span><input type="text" v-model="draggable" /> <br />
      <span>grabWidth</span><input type="text" v-model="grabWidth" /> <br />
      <span>dragDirections</span><input type="text" v-model="dragDirections" /> <br />
      <span>dragOn</span><input type="text" v-model="dragOn" /> <br />
      <span>width</span><input type="text" v-model="width" /><br />
      <span>height</span><input type="text" v-model="height" /><br />
      <span>left</span><input type="text" v-model="left" /> <br />
      <span>top</span><input type="text" v-model="top" /><br />
      <!-- <span>minX</span><input type="text" v-model="minX" /> <br />
      <span>maxX</span><input type="text" v-model="maxX" /> <br />
      <span>minY</span><input type="text" v-model="minY" /><br />
      <span>maxY</span><input type="text" v-model="maxY" /><br /> -->
      <span>position</span><input type="text" v-model="position" /><br />
    </div>
  </div>
</template>

<style scoped>
#options {
  position: absolute;
  right: 50px;
}
#parentDiv {
  border: 2px solid green;
  width: 1000px;
  height: 800px;
}
#testDiv {
  width: 200px;
  height: 200px;
  border: 2px solid red;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
