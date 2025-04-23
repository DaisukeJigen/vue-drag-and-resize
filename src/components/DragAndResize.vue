<script setup lang="ts">
import type { iBoundries, iCorners, iXY, iZindexInfo } from '@/interfaces'

import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
const borders = ref({ bottom: 0, left: 0, right: 0, top: 0 }),
  boundries = ref<iBoundries>(),
  clickedAtPosition = ref<iXY>({ x: 0, y: 0 }),
  collideBottom = computed(
    () =>
      divPos.value.y + size.value.y >
      parentSize.value.y -
        props.bottomGutter -
        borders.value.bottom -
        parentBorders.value.bottom -
        borders.value.top -
        parentBorders.value.top,
  ),
  collideLeft = computed(() => divPos.value.x < props.leftGutter),
  collideRight = computed(
    () =>
      divPos.value.x + size.value.x >
      parentSize.value.x -
        props.rightGutter -
        borders.value.left -
        parentBorders.value.left -
        borders.value.right -
        parentBorders.value.right,
  ),
  collideTop = computed(() => divPos.value.y < props.topGutter),
  collisionCheck = () => {
    if (collideLeft.value) {
      divPos.value.x = boundries.value?.x.min ?? 0
    }
    if (collideRight.value) {
      divPos.value.x = (boundries.value?.x.max ?? 0) - size.value.x
    }
    if (collideTop.value) {
      divPos.value.y = boundries.value?.y.min ?? 0
    }
    if (collideBottom.value) {
      divPos.value.y = (boundries.value?.y.max ?? 0) - size.value.y
    }
  },
  corners = computed<iCorners>(() => {
    return {
      bottomLeft: {
        x: divPos.value.x + parentPosition.value.x,
        y: divPos.value.y + size.value.y + parentPosition.value.y,
      },
      bottomRight: {
        x: divPos.value.x + size.value.x + parentPosition.value.x,
        y: divPos.value.y + size.value.y + parentPosition.value.y,
      },
      topLeft: {
        x: divPos.value.x + parentPosition.value.x,
        y: divPos.value.y + parentPosition.value.y,
      },
      topRight: {
        x: divPos.value.x + size.value.x + parentPosition.value.x,
        y: divPos.value.y + parentPosition.value.y,
      },
    }
  }),
  cssHeight = computed(() => size.value.y + 'px'),
  cssLeft = computed(() => divPos.value.x + 'px'),
  cssPosition = computed(() => props.position),
  cssTop = computed(() => divPos.value.y + 'px'),
  cssWidth = computed(() => size.value.x == -1 ? 'auto' : size.value.x + 'px'),
  divPos = ref<iXY>({ x: 0, y: 0 }),
  divPosAtDragStart = ref<iXY>({ x: 0, y: 0 }),
  divPosWhenClicked = ref<iXY>({ x: 0, y: 0 }),
    drag = () => {
    emit('dragging')
    divPos.value = {
      x: props.dragDirections.includes('x')
        ? divPosWhenClicked.value.x + movedX.value
        : divPosWhenClicked.value.x,
      y: props.dragDirections.includes('y')
        ? divPosWhenClicked.value.y + movedY.value
        : divPosWhenClicked.value.y,
    }
    collisionCheck()
  },
  emit =

  defineEmits(['dragStart', 'dragging', 'dragEnd', 'resizing', 'resizeStart', 'resizeEnd']),
  getParent = () => {
    if( thisDiv.value?.parentNode.classList.contains('vueDragAndResize')){
      return thisDiv.value?.parentNode
    }
    return props.position == 'relative' ? thisDiv.value?.parentNode : document.documentElement
  },
  inRange = (n: number, s: number, e: number) => {
    return n > s && n < e
  },
  mousePosition = ref<iXY>({ x: 0, y: 0 }),
  mousePositionInParent = ref<iXY>({ x: 0, y: 0 }),
  movedX = computed(() => mousePosition.value.x - clickedAtPosition.value.x),
  movedY = computed(() => mousePosition.value.y - clickedAtPosition.value.y),
  parentBorders = ref({ bottom: 0, left: 0, right: 0, top: 0 }),
  parentPosition = ref({ x: 0, y: 0 }),
  parentSize = ref<iXY>({ x: 0, y: 0 }),
  props = defineProps({
    bottomGutter: {
      default: 0,
      type: Number,
    },
    dragDirections: {
      default: ['x', 'y'],
    },
    draggable: {
      default: true,
      type: Boolean,
    },
    dragOn: {
      default: '',
      type: String,
    },
    grabWidth: {
      default: 5,
      type: Number,
    },
    height: { default: -1, type: Number },
    left: { default: null, type: Number },
    leftGutter: {
      default: 0,
      type: Number,
    },
    position: {
      default: 'absolute',
      type: String,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validator(value: string, props: any) {
        // The value must match one of these strings
        return ['absolute', 'relative'].includes(value)
      },
    },
    resizeable: {
      default: true,
      type: Boolean,
    },
    resizeDirections: {
      default: ['l', 'r', 'u', 'd', 'ul', 'ur', 'dl', 'dr'],
    },
    rightGutter: {
      default: 0,
      type: Number,
    },
    top: { default: null, type: Number },
    topGutter: {
      default: 0,
      type: Number,
    },
    width: { default: -1, type: Number },
  }),
  resize = () => {
    emit('resizing')
    switch (resizeModeWhenClicked.value) {
      case 'down':
        resizedDown()
        break
      case 'downLeft':
        resizedLeft()
        resizedDown()
        break
      case 'downRight':
        resizedRight()
        resizedDown()
        break
      case 'left':
        resizedLeft()
        break
      case 'right':
        resizedRight()
        break
      case 'up':
        resizedUp()
        break
      case 'upLeft':
        resizedLeft()
        resizedUp()
        break
      case 'upRight':
      resizedRight()
      resizedUp()
        break
      default:
    }
  },
  resizedDown = () => {
        if(inRange(mousePositionInParent.value.y, boundries.value?.y.min ?? 0, boundries.value?.y.max ?? 0)){
          size.value.y += movedY.value
        }
        if(mousePositionInParent.value.y > (boundries.value?.y.max ?? 0)){
          size.value.y = (boundries.value?.y.max ?? 0) - divPos.value.y
        }
        clickedAtPosition.value.y = mousePosition.value.y},
  resizedLeft = () => {
    if(mousePositionInParent.value.x < corners.value.topRight.x) {
          size.value.x -= movedX.value
          divPos.value.x += movedX.value
        }
        if(mousePositionInParent.value.x < (boundries.value?.x.min ?? 0)){
          size.value.x += divPos.value.x
          divPos.value.x = 0
        }
        
        clickedAtPosition.value.x = mousePosition.value.x
  },
  resizedRight = () => {
        if(inRange(mousePositionInParent.value.x,boundries.value?.x.min ?? 0,boundries.value?.x.max ?? 0)) {
          size.value.x += movedX.value
        }        
        if(mousePositionInParent.value.x > (boundries.value?.x.max ?? 0)){
          size.value.x = (boundries.value?.x.max ?? 0)  - divPos.value.x
        }
        clickedAtPosition.value.x = mousePosition.value.x
      },
  resizedUp = () => {    
    if(inRange(mousePositionInParent.value.y,boundries.value?.y.min ?? 0,boundries.value?.y.max ?? 0)) {
          size.value.y -= movedY.value
          divPos.value.y += movedY.value
        }
        if(mousePositionInParent.value.y < (boundries.value?.y.min ?? 0)){
          size.value.y += divPos.value.y
          divPos.value.y = 0
        }
        clickedAtPosition.value.y = mousePosition.value.y
  },
  resizeMode = computed(() => {
    if (!props.resizeable) {
      return ''
    } else if (
      Math.abs(mousePosition.value.x - corners.value.topLeft.x) < props.grabWidth &&
      Math.abs(mousePosition.value.y - corners.value.topLeft.y) < props.grabWidth &&
      props.resizeDirections.includes('ul')
    ) {
      return 'upLeft'
    } else if (
      Math.abs(mousePosition.value.x - corners.value.topLeft.x) < props.grabWidth &&
      Math.abs(mousePosition.value.y - corners.value.bottomLeft.y) < props.grabWidth &&
      props.resizeDirections.includes('dl')
    ) {
      return 'downLeft'
    } else if (
      Math.abs(mousePosition.value.x - corners.value.topRight.x) < props.grabWidth &&
      Math.abs(mousePosition.value.y - corners.value.topRight.y) < props.grabWidth &&
      props.resizeDirections.includes('ul')
    ) {
      return 'upRight'
    } else if (
      Math.abs(mousePosition.value.x - corners.value.topRight.x) < props.grabWidth &&
      Math.abs(mousePosition.value.y - corners.value.bottomRight.y) < props.grabWidth &&
      props.resizeDirections.includes('dl')
    ) {
      return 'downRight'
    } else if (
      Math.abs(mousePosition.value.x - corners.value.topLeft.x) < props.grabWidth &&
      props.resizeDirections.includes('l')
    ) {
      return 'left'
    } else if (
      Math.abs(mousePosition.value.x - corners.value.topRight.x) < props.grabWidth &&
      props.resizeDirections.includes('r')
    ) {
      return 'right'
    } else if (
      Math.abs(mousePosition.value.y - corners.value.topRight.y) < props.grabWidth &&
      props.resizeDirections.includes('u')
    ) {
      return 'up'
    } else if (
      Math.abs(mousePosition.value.y - corners.value.bottomRight.y) < props.grabWidth &&
      props.resizeDirections.includes('d')
    ) {
      return 'down'
    } else {
      return ''
    }
  }),
  resizeModeWhenClicked = ref<null | string>(null),
  selected = ref<null | string>(null),
  setBoundries = () => {
    boundries.value = {
      x: {
        max:
          parentSize.value.x -
          props.rightGutter -
          borders.value.left -
          borders.value.right -
          parentBorders.value.left -
          parentBorders.value.right,
        min: props.leftGutter,
      },
      y: {
        max:
          parentSize.value.y -
          props.bottomGutter -
          borders.value.top -
          borders.value.bottom -
          parentBorders.value.top -
          parentBorders.value.bottom,
        min: props.topGutter,
      },
    }
  },
  setParentInfo = () => {
    const parent = getParent()
    const parentRect = parent.getBoundingClientRect()
    parentSize.value = {
      x: parentRect.width == 0 ? window.innerWidth : parentRect.width,
      y: parentRect.height == 0 ? window.innerHeight : parentRect.height,
    }
    parentPosition.value = {
      x: parentRect.left,
      y: parentRect.top,
    }
    const ps = window.getComputedStyle(getParent())
    parentBorders.value = {
      bottom: parseInt(ps.borderBottom.replace('px', '')),
      left: parseInt(ps.borderLeft.replace('px', '')),
      right: parseInt(ps.borderRight.replace('px', '')),
      top: parseInt(ps.borderTop.replace('px', '')),
    }
  },
  size = ref<iXY>({ x: 0, y: 0 }),
  sizeAtResizeStart = ref<iXY>({ x: 0, y: 0 }),
  thisDiv = computed(() => thisInstance?.vnode.el),
    thisInstance = getCurrentInstance(),
   
  zIndexAdjust = () => {
    const dar = document.querySelectorAll(`.vueDragAndResize`)
    if(dar.length > 1){
    const divs = <iZindexInfo[]>[]
    let z = 99999
      dar.forEach((element: any) => {
        if(element.getAttribute('data-uid') == thisInstance?.uid){
          element.style.zIndex = '99999'
        } else {
        divs.push({
          uid: element.getAttribute('data-uid'),
          // zIndex: parseInt(element.getAttribute('data-z')) - 1
          // zIndex: --z
          zIndex: parseInt(window.getComputedStyle(element).zIndex)
        })
      }
      });
      divs.sort((a, b) => b.zIndex - a.zIndex)
      divs.forEach((d: any) => {
        (<HTMLElement>document.querySelectorAll(`[data-uid='${d.uid}']`)[0]).style.zIndex = (--z).toString()
      }); 
    }
  }

  defineExpose({boundries,corners})

onMounted(() => {
  size.value = { x: props.width, y: props.height }
  window.addEventListener('mousemove', (event: any) => {
    mousePosition.value = { x: event.pageX, y: event.pageY }
    mousePositionInParent.value = { x: event.pageX - parentPosition.value.x, y: event.pageY - parentPosition.value.y }
    if (selected.value == 'drag') {
      drag()
    } else if (selected.value == 'resize') {
      resize()
    }
  })
  window.addEventListener('mouseup', () => {
    if(selected.value == 'drag'){
      emit('dragEnd', {
        end: divPos.value,
        start: divPosAtDragStart.value
      })
    } else if(selected.value == 'resize'){
      emit('resizeEnd', {
        end: size.value,
        start: sizeAtResizeStart.value
      })
    }
    selected.value = null
    resizeModeWhenClicked.value = null
  })
  new ResizeObserver((entries) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const entry of entries) {
      setParentInfo()
      setBoundries()
      collisionCheck()
    }
  }).observe(thisDiv.value?.parentNode)
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        setParentInfo()
        setBoundries()
        collisionCheck()
      }
    });
  }).observe(thisDiv.value?.parentNode, {
    attributes: true, // Watch for attribute changes
    childList: false, // Watch for changes to the children
    subtree: false,   // Watch for changes in all descendant nodes
  });

  thisDiv.value?.addEventListener('mousedown', (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        zIndexAdjust()
    if (resizeMode.value != '') {
      if (props.resizeable) {
        emit('resizeStart')
        sizeAtResizeStart.value = size.value
        selected.value = 'resize'
      }
      resizeModeWhenClicked.value = resizeMode.value
    } else {
      if (props.draggable && props.dragOn == '') {
        emit('dragStart')
        divPosAtDragStart.value = divPos.value
        selected.value = 'drag'
      }
    }
    clickedAtPosition.value = { x: event.pageX, y: event.pageY }
    divPosWhenClicked.value = divPos.value
  })
  const rect = thisDiv.value?.getBoundingClientRect()
  divPos.value = {
    x: props.left == null ? rect.left : props.left,
    y: props.top == null ? rect.top : props.top,
  }
  //@ts-expect-error Type 'undefined' is not assignable to type 'Element'.
  const s = window.getComputedStyle(thisDiv.value)
  borders.value = {
    bottom: parseInt(s.borderBottom.replace('px', '')),
    left: parseInt(s.borderLeft.replace('px', '')),
    right: parseInt(s.borderRight.replace('px', '')),
    top: parseInt(s.borderTop.replace('px', '')),
  }
  if (props.dragOn != '') {
    const dragItem =
      props.dragOn == '' ? thisDiv.value : thisDiv.value?.querySelectorAll(props.dragOn)
    dragItem.forEach((di: any) => {
      di.classList.add('draggable')
      di.addEventListener('mousedown', (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        zIndexAdjust()
        selected.value = 'drag'
        clickedAtPosition.value = { x: event.pageX, y: event.pageY }
        divPosWhenClicked.value = divPos.value
      })
    })
  }
  nextTick().then(() => {
    if(props.width == -1){
      //@ts-expect-error not assignable to type element
      const a = window.getComputedStyle(thisDiv.value)
      size.value.x = parseInt(a.width.replace('px','')) + parseInt(a.borderLeftWidth.replace('px','')) + parseInt(a.borderRightWidth.replace('px',''))
    }
    if(props.height == -1){
      //@ts-expect-error not assignable to type element
      const a = window.getComputedStyle(thisDiv.value)
      size.value.y = parseInt(a.height.replace('px','')) + parseInt(a.borderTopWidth.replace('px','')) + parseInt(a.borderBottomWidth.replace('px',''))
    }
    setParentInfo()
    setBoundries()
    zIndexAdjust()
  })
})

watch(
  () => [
    props.leftGutter,
    props.rightGutter,
    props.topGutter,
    props.bottomGutter,
    props.position,
    props.width,
    props.height,
    props.left,
    props.top,
    props.position
  ],
  () => {
    setParentInfo()
    setBoundries()
    collisionCheck()
  },
)
</script>

<template>
  <div
    :class="[
      'vueDragAndResize',
      resizeModeWhenClicked == null ? resizeMode : resizeModeWhenClicked,
      props.draggable && props.dragOn == '' ? 'draggable' : '',
      props.resizeable ? 'resizable' : '',
    ]"
    :data-uid="thisInstance?.uid"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.vueDragAndResize {
  width: v-bind(cssWidth) !important;
  height: v-bind(cssHeight) !important;
  position: v-bind(cssPosition);
  left: v-bind(cssLeft) !important;
  top: v-bind(cssTop) !important;
  &.draggable,
  :deep(.draggable) {
    cursor: move;
  }
  &.left,
  &.right {
    cursor: ew-resize;
  }
  &.up,
  &.down {
    cursor: ns-resize;
  }
  &.upLeft,
  &.downRight {
    cursor: nwse-resize;
  }
  &.upRight,
  &.downLeft {
    cursor: nesw-resize;
  }
}
</style>
