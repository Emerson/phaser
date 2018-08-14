import React from 'react'
import { connect } from 'react-redux'

class FactionPanel extends React.Component {
  closePanel (e) {
    e.preventDefault()
    this.props.closePanel()
  }

  render () {
    return (
      <div className='panel-wrapper'>
        <div className='panel'>
          <div className='panel-header'>
            Faction
            <a href='#' onClick={this.closePanel.bind(this)}>close</a>
          </div>
          <div className='panel-content'>
            <p>Faction panel content goes here</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state: state}
}

function mapDispatchToProps (dispatch) {
  return ({
    closePanel: () => {
      dispatch({type: 'CLOSE_PANEL'})
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(FactionPanel)
