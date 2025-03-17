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
<vue-draggable-resizable :buttom-gutter="20"></vue-draggable-resizable>
```

#### dragDirections

Type: `Array<String>`<br>
Required: `false`<br>
Default: `['x', 'y']`<br>
Options: `x, y`

The directions in which the component and be moved.

```html
<vue-draggable-resizable :drag-directions="['x','y']"></vue-draggable-resizable>
```

#### draggable

Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

If the component is draggable

```html
<vue-draggable-resizable :draggable="true"></vue-draggable-resizable>
```

#### dragOn

Type: `string`<br>
Required: `false`<br>
Default: ``

CSS selector for the element within the component to drag on.  Defaults to '', or the component itself.

```html
<vue-draggable-resizable :dragOn="#ElemDiv"></vue-draggable-resizable>
```

#### grabWidth

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The buffer from the edge where a grab resize grab can happen (in px)

```html
<vue-draggable-resizable :grab-width="5"></vue-draggable-resizable>
```

#### height

Type: `Number`<br>
Required: `false`<br>
Default: `-1`

The starting height of the component (in px).<br>
A value of -1 will cause a calculation based on 'auto'

```html
<vue-draggable-resizable :height="250"></vue-draggable-resizable>
```

#### left

Type: `Number`<br>
Required: `false`<br>
Default: '0'

The starting left position of the component (in px).

```html
<vue-draggable-resizable :left="250"></vue-draggable-resizable>
```

#### leftGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the left of the parent that the component can go.

```html
<vue-draggable-resizable :left-gutter="20"></vue-draggable-resizable>
```

#### position

Type: `String`<br>
Required: `false`<br>
Default: `absolute`<br>
Options: `absolute, relative`

The CSS position mode for the component.<br/>
If absolute, and nested in another vue-draggable-resizable, it will still be bound by the parents borders

```html
<vue-draggable-resizable :position="absolute"></vue-draggable-resizable>
```

#### resizeable

Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

If the component is resizeable.

```html
<vue-draggable-resizable :resizable="true"></vue-draggable-resizable>
```

#### resizeDirections

Type: `Array<String>`<br>
Required: `false`<br>
Default: `['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr']`<br>
Options: `'l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr'`

The directions in which the component and be resized.

```html
<vue-draggable-resizable :resize-directions="['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr']"></vue-draggable-resizable>
```

#### rightGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the right of the parent that the component can go.

```html
<vue-draggable-resizable :right-gutter="20"></vue-draggable-resizable>
```

#### top

Type: `Number`<br>
Required: `false`<br>
Default: '0'

The starting top position of the component (in px).

```html
<vue-draggable-resizable :top="250"></vue-draggable-resizable>
```

#### topGutter

Type: `Number`<br>
Required: `false`<br>
Default: `0`

The distance (in px) from the top of the parent that the component can go.

```html
<vue-draggable-resizable :top-gutter="20"></vue-draggable-resizable>
```

#### width

Type: `Number`<br>
Required: `false`<br>
Default: `-1`

The starting width of the component (in px).<br>
A value of -1 will cause a calculation based on 'auto'

```html
<vue-draggable-resizable :width="250"></vue-draggable-resizable>
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
<vue-draggable-resizable @dragging="onDragging">
```
#### drag-start

Called whenever the component gets dragged.

```html
<vue-draggable-resizable @drag-start="onDragStart">
```
#### drag-end

Called whenever the component finishes being dragged.

```html
<vue-draggable-resizable @drag-end="onDragEnd">
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
<vue-draggable-resizable @resizing="onResizing">
```
#### resize-start

Called whenever the component gets dragged.

```html
<vue-draggable-resizable @resize-start="onResizeStart">
```
#### resize-end

Called whenever the component finishes being dragged.

```html
<vue-draggable-resizable @resize-end="onResizeEnd">
```


## License

The ISC License (ISC). Please see [License File](LICENSE) for more information.