import React from 'react'
import firebase from '../base'

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentItem: '',
      items: []
    }
    this.itemsRef = firebase.database().ref('items')
  }
  render () {
    return (
    )
  }
}

export default Game
