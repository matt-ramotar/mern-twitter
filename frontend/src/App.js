import React from 'react';
import { AuthRoute, ProtectedRoute } from './util/route';
import { Switch } from 'react-router-dom';

import MainPage from './components/MainPage';
import NavBarContainer from './components/nav/NavBarContainer';
import LoginFormContainer from './components/session/LoginFormContainer';
import SignupFormContainer from './components/session/SignupFormContainer';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path='/' component={MainPage} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
    </Switch>
  </div>
);
export default App;
