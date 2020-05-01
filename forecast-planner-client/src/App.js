import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route } from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null
  }

  setCurrentUser = user => {
    this.setState({currentUser: user})
  }

  render() {
    console.log(this.state.currentUser)
    return (
    <div>
      <Navbar />
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" render={routerProps => 
        <Login {...routerProps} setCurrentUser={this.setCurrentUser}/>}/>
      <Route exact path="/signup" 
        render={routerProps => 
        <Signup {...routerProps} setCurrentUser={this.setCurrentUser}/>} 
        />
    </div>
  );
  }

}

export default App;
