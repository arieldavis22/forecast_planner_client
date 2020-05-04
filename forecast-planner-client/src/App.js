
import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import NewEventForm from './containers/NewEventForm'
import FriendList from './containers/FriendList'
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null,
    weatherApiRequest: [],
    allUsers: []
  }

  componentDidMount = () => {
    //auto login
    fetch('http://localhost:3000/autologin', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(response => {
      if (!response.error) {
        this.setState({currentUser: response.name})
      }
    })

    //all users
    fetch('http://localhost:3000/users')
    .then(r => {
      if(r.ok) {
          return r.json()
      } else {
          throw r
      }
  })
    .then(data => {
      this.setState({
        allUsers: data
      })
    })
    .catch(error => console.log(error))
  }

  setCurrentUser = user => {
    this.setState({currentUser: user.name})
  }

  logout = () => this.setState({currentUser: null})
  

  render() {
    console.log(this.state)
    return (
    <div>
      <Navbar currentUser={this.state.currentUser} logout={this.logout}/>
      <Switch>
          <Route exact path="/" render={routerProps => 
              <Home 
              {...routerProps} 
              currentUser={this.state.currentUser} /> } 
              />

          <Route path="/login" render={routerProps => 
              <Login 
              {...routerProps} 
              setCurrentUser={this.setCurrentUser}/>} 
              />

          <Route path="/signup" render={routerProps => 
              <Signup 
              {...routerProps} 
              setCurrentUser={this.setCurrentUser}/>} 
              />
              
          <Route path="/new-event" render={routerProps => 
              <NewEventForm 
              {...routerProps} 
              currentUser={this.state.currentUser}/> } 
              />

          <Route path="/friends" render={routerProps => 
              <FriendList 
              {...routerProps} 
              currentUser={this.state.currentUser}
              allUsers={this.state.allUsers}/> } 
              />

      </Switch>
      </div>
  );
  }

}

export default withRouter(App);
