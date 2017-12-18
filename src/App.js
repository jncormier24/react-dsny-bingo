import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import firebase, { auth, provider } from './base'
import './App.css'
import Game from './components/Game'
import Admin from './components/Admin'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentItem: '',
      items: [],
      user: null
    }
    this.itemsRef = firebase.database().ref('items')
  }
  // Set the items list
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
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
  login () {
    auth
      .signInWithRedirect(provider)
      .then((result) => {
        const user = result.user
        this.setState({
          user
        })
      })
  }
  logout = () => {
    auth
      .signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }
  render () {
    return (
      <div className='App'>
        <header>
          <div className='wrapper'>
            <h1>Dsny Bingo!</h1>
            {
              this.state.user
              ? <button onClick={this.logout}>Logout</button>
              : <button onClick={this.login}>Login</button>
            }
          </div>
        </header>
        <div className='container'>
          <Router>
            <div className='appNav'>
              <nav>
                <ul>
                  <li><Link to='/'>Game</Link></li>
                  <li><Link to='/admin'>Admin</Link></li>
                  <li><Link to='/help'>Help</Link></li>
                </ul>
              </nav>
              <Route exact path="/" component={Game} />
              <Route exact path="/admin" component={Admin} />
            </div>
          </Router>
        </div>
      </div>
    )
  }
}

export default App
