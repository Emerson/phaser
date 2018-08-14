import Phaser from 'phaser'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import React from 'react'

import Clock from '../lib/clock'
import store from '../lib/store'
import BaseUI from '../ui/base'
import ImgBackground from '../assets/images/fake-map.png'

class Game extends Phaser.Scene {
  /*
  *   Not sure what the significance of this is?
  */
  constructor () {
    super({ key: 'Game' })
  }

  /*
  *   Runs before the game starts and allows us to preload any assets we need.
  */
  preload () {
    /* ... */
    this.load.image('map', ImgBackground)
  }

  /*
  *   Runs after `preload` and sets up the game.
  */
  create () {
    this.add.image(600, 300, 'map')
    this.clock = new Clock(store)
    this.time.addEvent({
      loop: true,
      delay: 2000, // Change this to increase or decrease the speed of the game
      callback: () => {
        this.clock.addTick()
      }
    })
    this.dateLabel = this.add.text(1000, 570, store.getState().labels.clock, { fill: '#0f0' })
    this.dateLabel.setInteractive()
    // Render the React UI
    render(
      <Provider store={store}>
        <BaseUI />
      </Provider>,
      document.getElementsByClassName('react-ui')[0]
    )
    // Debug - make our store and clock available on the window object
    window.store = store
    window.clock = this.clock
  }

  /*
  *   The main game loop. Phaser tries to run this method 60 times per second.
  *   This is the place where we will update any of the canvas based graphics.
  */
  update () {
    this.dateLabel.setText(store.getState().labels.clock)
  }
}

export default Game
