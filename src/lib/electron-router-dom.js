import { createElectronRouter } from 'electron-router-dom'

export const { Router, registerRoute } = createElectronRouter({
  port: 5173,
  types: {
    /**
     * The ids of the windows of your application, think of these ids as the basenames of the routes
     * this new way will allow your editor's intelisense to help you know which ids are available to use
     * both in the main and renderer process
     */
    ids: ['main']
  }
})
