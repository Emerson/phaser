import Phaser from 'phaser'
import constants from './config/constants'
import GameScene from './scenes/game'
import AppCSS from './assets/scss/app.scss'

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
  parent: 'canvas',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      },
      debug: false
    }
  },
  scene: [GameScene]
}

// eslint-disable-next-line no-new
new Phaser.Game(config)

if (module.hot) {
  module.hot.accept(() => {})

  module.hot.dispose(() => {
    window.location.reload()
  })
}
