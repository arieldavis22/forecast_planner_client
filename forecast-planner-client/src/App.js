
import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import NewEventForm from './containers/NewEventForm'
import FriendList from './containers/FriendList'
import EditEventForm from './components/EditEventForm'
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null,
    weatherApiRequest: [],
    allUsers: [],
    userEvents: []
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
        this.fetchEventsAndSetState()
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

  logout = () => {
    this.setState({
      currentUser: null,
      userEvents: []
    })
  }

  fetchEventsAndSetState = () => {
    fetch("http://localhost:3000/getevents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentUser: this.state.currentUser
            //refactor, just use session[:id]
        })
    })
    .then(r => {
        if(r.ok) {
            return r.json()
        } else {
            throw r
        }
    })
    .then(data => {
        this.setState({
            userEvents: data.events
        })
    })
    .catch(error => console.log(error))
}

  changeWeatherApiRequest = request => {

  }
  

  render() {
    return (
    <div>
      <Navbar currentUser={this.state.currentUser} logout={this.logout}/>
      <Switch>
          <Route exact path="/" render={routerProps => 
            <Home 
            {...routerProps} 
            currentUser={this.state.currentUser} 
            userEvents={this.state.userEvents}
            updateEvents={this.fetchEventsAndSetState}/> } 
            />

          <Route path="/login" render={routerProps => 
            <Login 
            {...routerProps} 
            setCurrentUser={this.setCurrentUser} 
            currentUser={this.state.currentUser} 
            updateEvents={this.fetchEventsAndSetState}/>} 
            />

          <Route path="/signup" render={routerProps => 
            <Signup 
            {...routerProps} 
            setCurrentUser={this.setCurrentUser} 
            currentUser={this.state.currentUser}/>} 
            />

          <Route path="/new-event" render={routerProps => 
            <NewEventForm 
            {...routerProps} 
            currentUser={this.state.currentUser} 
            updateEvents={this.fetchEventsAndSetState}/> } 
            />

          <Route path="/edit/:id" render={routerProps => 
            <EditEventForm 
            {...routerProps} 
            currentUser={this.state.currentUser} 
            events={this.state.userEvents} 
            updateEvents={this.fetchEventsAndSetState}/> } 
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
