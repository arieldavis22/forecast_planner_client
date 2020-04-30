import React from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
    </div>
  );
}

export default App;
