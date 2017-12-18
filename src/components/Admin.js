import React from 'react'
import firebase, { auth, provider } from '../base'

class Admin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentItem: '',
      items: [],
    }
    this.itemsRef = firebase.database().ref('items')
  }
  // Set the items list
  componentDidMount () {
    this.itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          id: item,
          text: items[item].text
        })
      }
      this.setState({
        items: newState
      })
    })
  }
  // watch for state change on the text field
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // add an item to the list of items
  addItem = (e) => {
    e.preventDefault()
    const item = {
      text: this.state.currentItem
    }
    this.itemsRef.push(item)
    this.setState({
      currentItem: ''
    })
  }
  // remove an item from the list of items
  removeItem = (itemID) => {
    const itemRef = firebase.database().ref(`/items/${itemID}`)
    itemRef.remove()
  }
  render () {
    return (
      <div className='Admin'>
        <div className='container'>
          <h1> Admin</h1>
          <section className='add-item'>
            <form onSubmit={this.addItem}>
              <input type='text' name='currentItem' placeholder='Add a bingo Item' value={this.state.currentItem} onChange={this.handleChange} />
              <button>Add Item</button>
            </form>
          </section>
          <section className='displayItem'>
            <div className='wrapper'>
              <ul>
                {
                  this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.text}</h3>
                        <button onClick={() => this.removeItem(item.id)}>remove</button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Admin
