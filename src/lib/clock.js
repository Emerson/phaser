import moment from 'moment'
import config from '../config/constants'

/*
*   == Clock
*
*   The main game clock. Each `tick` of the clock adds 1-hour to the time. This
*   is the base unit of time for this game and all stats will be calculated
*   around this. For example, a factory will output `x` amount of production
*   per hour, Units will move `x` distance per hour, battle stats will be
*   calculated each hour.
*
*   The nice thing about this is that we can easily change how fast or slow the
*   game runs by changing the frequency of the `tick`. Want to speed up the
*   game? Just call `addTick` in shorter intervals.
*/
class Clock {
  /*
  *   Initialize the main game Clock
  */
  constructor (store) {
    this._tickCallbacks = []
    this._time = moment(config.GAME_START_DATE, 'YYYY-MM-DD H:mm:ss')
    this.store = store
    this.ticks = 0
  }

  /*
  *   The main time tracker for the game. This method adds 1-hour to the time
  *   and fires any registered callbacks.
  */
  addTick () {
    console.log('Clock::addTick')
    this.ticks++
    this._time.add(1, 'hour')
    // Dispatch our ADD_TICK event to the react store. Still need to think about
    // this pattern a little more...
    this.store.dispatch({
      type: 'ADD_TICK',
      labels: {
        clock: this.formattedTime
      }
    })
  }

  /*
  *   `onTick` allows other parts of the codebase to register a callback that
  *   should be run every tick. This allows us to break up our codebase into
  *   smaller, more manageable blocks.
  *
  *   eg. somewhere in another file...
  *
  *     clock.onTick(function() {
  *       adjustProductionEfficiency()
  *       calculateFinalProductionOutput()
  *     })
  */
  onTick (callback) {
    this._tickCallbacks.push(callback)
  }

  get time () {
    return this._time
  }

  get formattedTime () {
    return this._time.format('HH:mm, DD MMM, YYYY')
  }
}

export default Clock
