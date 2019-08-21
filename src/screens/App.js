import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

// All screens
import {
  Assets,
  Dashboard,
  LogIn,
  Users,
  SideBar
} from './';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={LogIn} />
        <Route path="/Assets" exact component={Assets} />
        <Route path="/Dashboard" exact component={Dashboard} />
        <Route path="/Users" exact component={Users} />
      </div>
    </BrowserRouter>
  )
};

export default App;