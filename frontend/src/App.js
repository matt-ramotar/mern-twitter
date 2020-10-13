import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route';
import { Switch } from 'react-router-dom';

import MainPage from './main/MainPage';
import NavBarContainer from './nav/NavBarContainer';
import LoginFormContainer from './session/LoginFormContainer';
import SignupFormContainer from './session/SignupFormContainer';

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
