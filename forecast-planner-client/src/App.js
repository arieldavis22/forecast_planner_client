
import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import NewEventForm from './containers/NewEventForm'
import FriendList from './containers/FriendList'
import EditEventForm from './components/EditEventForm'
import { Route, Switch, withRouter } from 'react-router-dom';
import { autoLog, allUsers, getEvents } from "./FetchData"

class App extends React.Component {

  state={
    currentUser: null,
    weatherApiRequest: [],
    allUsers: [],
    userEvents: [],
    friendEvents: []
  }

  fetchAllUsers = () => {
        //all users
        allUsers()
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

  componentDidMount = () => {
    //auto login
    autoLog()
    .then(r => r.json())
    .then(response => {
      if (!response.error) {
        this.setState({currentUser: response.name})
        this.fetchEventsAndSetState()
      }
    })

    this.fetchAllUsers()

  }

  setCurrentUser = user => {
    this.setState({currentUser: user.name})
  }

  logout = () => {
    this.setState({
      currentUser: null,
      userEvents: [],
      friendEvents: []
    })
  }

  fetchEventsAndSetState = () => {
    getEvents(this.state.currentUser)
    .then(r => {
        if(r.ok) {
            return r.json()
        } else {
            throw r
        }
    })
    .then(data => {
        this.setState({
            userEvents: data.events,
            friendEvents: data.friend_events
        })
    })
    .catch(error => console.log(error))
}

  render() {
    return (
    <div>
      <Route path="/" render={routerProps => <Navbar {...routerProps} currentUser={this.state.currentUser} logout={this.logout}/>} />
      <Switch>
          <Route exact path="/" render={routerProps => 
            <Home 
            {...routerProps} 
            currentUser={this.state.currentUser} 
            userEvents={this.state.userEvents}
            friendEvents={this.state.friendEvents}
            updateEvents={this.fetchEventsAndSetState}/> } 
            />

          <Route path="/login" render={routerProps => 
            <Login 
            {...routerProps} 
            setCurrentUser={this.setCurrentUser} 
            currentUser={this.state.currentUser} 
            updateEvents={this.fetchEventsAndSetState}
            fetchAllUsers={this.fetchAllUsers}/>} 
            />

          <Route path="/signup" render={routerProps => 
            <Signup 
            {...routerProps} 
            setCurrentUser={this.setCurrentUser} 
            currentUser={this.state.currentUser}
            fetchAllUsers={this.fetchAllUsers}/>} 
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
              allUsers={this.state.allUsers}
              updateEvents={this.fetchEventsAndSetState}/> } 
              />
      </Switch>
      </div>
  );
  }

}

export default withRouter(App);
