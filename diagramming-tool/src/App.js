

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Registration from './Component/Register/Registration';
import MsgComponent from './Component/ConfirmMsg/MsgComponent';
import Login from './Component/Login';
import Registration from './Component/Register'
const App = () => {


  return (
    <><div className="App">
      <header className="App-header">
        <Registration />
      </header>


    </div><Router>
        <div>
          <Switch>

            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />

          </Switch>
        </div>
      </Router></>
  );
};

export default App;
