//small edit by Laura
import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import NewEventForm from './containers/NewEventForm'
import { Route } from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null,
    weatherApiRequest: []
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/autologin', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(response => {
      if (!response.error) {
        this.setState({currentUser: response.name})
      }
    })
  }

  setCurrentUser = user => {
    this.setState({currentUser: user.name})
  }

  logout = () => this.setState({currentUser: null})

  changeWeatherApiRequest = request => {

  }
  

  render() {
    console.log(this.state.currentUser)
    return (
    <div>
      <Navbar currentUser={this.state.currentUser} logout={this.logout}/>

      <Route exact path="/" render={routerProps => <Home {...routerProps} currentUser={this.state.currentUser} />}/>

      <Route exact path="/login" render={routerProps => 
        <Login {...routerProps} setCurrentUser={this.setCurrentUser}/>}
        />

      <Route exact path="/signup" 
        render={routerProps => 
        <Signup {...routerProps} setCurrentUser={this.setCurrentUser}/>} 
        />

        <Route exact path="/new-event" render={routerProps => <NewEventForm {...routerProps} currentUser={this.state.currentUser}/> } />
    </div>
  );
  }

}

export default App;
