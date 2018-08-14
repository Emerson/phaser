import React from 'react'
import FactionInfoUI from './faction-info'
import { connect } from 'react-redux'

/*
*   Our base UI. This will be the entry point for opening and closing any of the
*   other UI panels.
*/
class BaseUI extends React.Component {
  openFactionPanel (e) {
    e.preventDefault()
    this.props.openPanel('faction')
  }

  render () {
    let panel = null
    if (this.props.ui.panel === 'faction') {
      panel = <FactionInfoUI />
    }
    return (
      <div className='baseUI'>
        <nav className='primaryNav'>
          <ul>
            <li><a href='#' onClick={this.openFactionPanel.bind(this)}>Faction</a></li>
            <li><a href='#'>Production</a></li>
            <li><a href='#'>Research</a></li>
          </ul>
        </nav>
        {panel}
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return ({
    openPanel: () => {
      dispatch({type: 'OPEN_PANEL', panel: 'faction'})
    }
  })
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseUI)
