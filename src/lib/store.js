import { createStore } from 'redux'

/*
*   Our redux store. This is where the game state will live. If you need help
*   understanding redux, I suggest watching Dan Abramov's (created redux)
*   tutorials:
*
*     https://egghead.io/courses/getting-started-with-redux
*
*   I'm not 100% sure how this will all play out, but I think we could
*   potentially just dump this state object into a Postgres database if we ever
*   want to `save` the game. I think this also opens up the option of having a
*   proper node server do the calculations so that players cannot just manually
*   adjust values and cheat.
*/
const initialState = {
  ui: {
    panel: null
  },
  labels: {
    clock: null
  },
  ticks: 0,
  factions: [
    {
      id: 'england',
      label: 'England',
      factories: 10,
      buildQueue: []
    },
    {
      id: 'germany',
      label: 'Germany',
      factories: 14,
      buildQueue: []
    },
    {
      id: 'japan',
      label: 'Japan',
      factories: 12,
      buildQueue: []
    },
    {
      id: 'united-states',
      label: 'United States',
      factories: 8,
      buildQueue: []
    },
    {
      id: 'italy',
      label: 'Italy',
      factories: 6,
      buildQueue: []
    }
  ]
}

function appReducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TICK' : {
      return Object.assign({}, state, {
        ticks: state.ticks++,
        labels: {
          clock: action.labels.clock
        }
      })
    }
    case 'OPEN_PANEL': {
      return Object.assign({}, state, {
        ui: {
          panel: action.panel
        }
      })
    }
    case 'CLOSE_PANEL': {
      return Object.assign({}, state, {
        ui: {
          panel: null
        }
      })
    }
    default: return state
  }
}

const store = createStore(appReducer, initialState)

export default store
