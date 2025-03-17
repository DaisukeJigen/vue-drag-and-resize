import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  routerMode: 'hash',
  tree: {
    groups: [
      {
        id: 'top',
        title: '',
      },
      {
        include: (file) => file.path.startsWith('src/stories/basic'),
        title: 'Basic',
      },
      {
        include: (file) => file.path.startsWith('src/stories/props'),
        title: 'Props',
      },
      {
        include: (file) => file.path.startsWith('src/stories/events'),
        title: 'Events',
      },
      {
        include: (file) => file.path.startsWith('src/stories/expose'),
        title: 'Expose',
      },
    ],
  },
  vite: {
    base: '/vue-drag-and-resize/',
  },
})
