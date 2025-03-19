<h1 align="center">VueDragAndResize</h1>

> Vue component which can be moved around and resized

## Table of Contents

* [Live Playground](#live-playground)
* [Install and basic usage](#install-and-basic-usage)
  * [Props](#props)
  * [Events](#events)
  * [Expose](#expose)
* [Contributing](#contributing)
* [License](#license)


---

## Install and basic usage

### Install
```bash
$ npm install vue-drag-and-resize
```

#### Register the component globally

```js
// main.js
import { createApp } from 'vue'
import 'vue-drag-and-resize/vue-drag-and-resize.css'
import VueDragAndResize from 'vue-drag-and-resize'
import App from './App.vue'

const app = createApp(App)
app.component('VueDragAndResize', VueDragAndResize)
app.mount('#app')
```

#### Register the component locally

```js
<script setup lang="ts">
import VueDragAndResize from 'vue-drag-and-resize'
</script>

<template>
  <VueDragAndResize :width="200" :height="200">
</template>

<style scoped>
@import 'vue-drag-and-resize/vue-drag-and-resize.css';
</style>

```

### Live Playground

For examples of the component go to the [live playground](https://daisukejigen.github.io/vue-drag-and-resize/#/)

### Props

#### buttomGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the bottom of the parent that the component can go.

```html
<VueDragAndResize :buttom-gutter="20"></VueDragAndResize>
<VueDragAndResize :buttom-gutter="20"></VueDragAndResize>
```

#### dragDirections

Type: `Array<String>`<br>
Required: `false`<br>
Default: `['x', 'y']`<br>
Options: `x, y`

The directions in which the component and be moved.

```html
<VueDragAndResize :drag-directions="['x','y']"></VueDragAndResize>
```

#### draggable

Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

If the component is draggable

```html
<VueDragAndResize :draggable="true"></VueDragAndResize>
<VueDragAndResize :draggable="true"></VueDragAndResize>
```

#### dragOn

Type: `string`<br>
Required: `false`<br>
Default: ``

CSS selector for the element within the component to drag on.  Defaults to '', or the component itself.

```html
<VueDragAndResize :dragOn="#ElemDiv"></VueDragAndResize>
<VueDragAndResize :dragOn="#ElemDiv"></VueDragAndResize>
```

#### grabWidth

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The buffer from the edge where a grab resize grab can happen (in px)

```html
<VueDragAndResize :grab-width="5"></VueDragAndResize>
<VueDragAndResize :grab-width="5"></VueDragAndResize>
```

#### height

Type: `Number`<br>
Required: `false`<br>
Default: `-1`

The starting height of the component (in px).<br>
A value of -1 will cause a calculation based on 'auto'

```html
<VueDragAndResize :height="250"></VueDragAndResize>
<VueDragAndResize :height="250"></VueDragAndResize>
```

#### left

Type: `Number`<br>
Required: `false`<br>
Default: '0'

The starting left position of the component (in px).

```html
<VueDragAndResize :left="250"></VueDragAndResize>
<VueDragAndResize :left="250"></VueDragAndResize>
```

#### leftGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the left of the parent that the component can go.

```html
<VueDragAndResize :left-gutter="20"></VueDragAndResize>
<VueDragAndResize :left-gutter="20"></VueDragAndResize>
```

#### position

Type: `String`<br>
Required: `false`<br>
Default: `absolute`<br>
Options: `absolute, relative`

The CSS position mode for the component.<br/>
If absolute, and nested in another VueDragAndResize, it will still be bound by the parents borders

```html
<VueDragAndResize :position="absolute"></VueDragAndResize>
<VueDragAndResize :position="absolute"></VueDragAndResize>
```

#### resizeable

Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

If the component is resizeable.

```html
<VueDragAndResize :resizable="true"></VueDragAndResize>
<VueDragAndResize :resizable="true"></VueDragAndResize>
```

#### resizeDirections

Type: `Array<String>`<br>
Required: `false`<br>
Default: `['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr']`<br>
Options: `'l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr'`

The directions in which the component and be resized.

```html
<VueDragAndResize :resize-directions="['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr']"></VueDragAndResize>
<VueDragAndResize :resize-directions="['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr']"></VueDragAndResize>
```

#### rightGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the right of the parent that the component can go.

```html
<VueDragAndResize :right-gutter="20"></VueDragAndResize>
<VueDragAndResize :right-gutter="20"></VueDragAndResize>
```

#### top

Type: `Number`<br>
Required: `false`<br>
Default: '0'

The starting top position of the component (in px).

```html
<VueDragAndResize :top="250"></VueDragAndResize>
<VueDragAndResize :top="250"></VueDragAndResize>
```

#### topGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the top of the parent that the component can go.

```html
<VueDragAndResize :top-gutter="20"></VueDragAndResize>
<VueDragAndResize :top-gutter="20"></VueDragAndResize>
```

#### width

Type: `Number`<br>
Required: `false`<br>
Default: `-1`

The starting width of the component (in px).<br>
A value of -1 will cause a calculation based on 'auto'

```html
<VueDragAndResize :width="250"></VueDragAndResize>
<VueDragAndResize :width="250"></VueDragAndResize>
```

### Events

#### dragging

Response
```html
{
    start: {
        x: Number,
        y: number
    },
    end: {
        x: Number,
        y: number
    }
}
```

Called whenever the component starts being dragged.

```html
<VueDragAndResize @dragging="onDragging">
```
#### drag-start

Called whenever the component gets dragged.

```html
<VueDragAndResize @drag-start="onDragStart">
```
#### drag-end

Called whenever the component finishes being dragged.

```html
<VueDragAndResize @drag-end="onDragEnd">
```

#### resizing

Response
```html
{
    start: {
        x: Number,
        y: number
    },
    end: {
        x: Number,
        y: number
    }
}
```

Called whenever the component starts being dragged.

```html
<VueDragAndResize @resizing="onResizing">
```
#### resize-start

Called whenever the component gets dragged.

```html
<VueDragAndResize @resize-start="onResizeStart">
```
#### resize-end

Called whenever the component finishes being dragged.

```html
<VueDragAndResize @resize-end="onResizeEnd">
```


## License

The ISC License (ISC). Please see [License File](LICENSE) for more information.