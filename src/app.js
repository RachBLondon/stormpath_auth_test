import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import { MasterPage, IndexPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyEmailPage, ProfilePage } from './pages';

import App from './components/app';
import GitHub from './components/GitHub/GitHub';

import rootReducer from './reducers'
import DevTools from './components/DevTools'

export default function configureStore(initialState){
  const createStoreWithMiddleWare =  createStore(
        rootReducer,
        initialState,
          compose(
            applyMiddleware(reduxThunk),
            DevTools.instrument())
          )
    return createStoreWithMiddleWare;
  }

  const store = configureStore({});


ReactStormpath.init();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <HomeRoute path='/' component={MasterPage}>
        <IndexRoute component={IndexPage} />
        <LoginRoute path='/login' component={LoginPage} />
        <Route path='/verify' component={VerifyEmailPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/forgot' component={ResetPasswordPage} />

        <AuthenticatedRoute>
          <HomeRoute path='/profile' component={ProfilePage} />
          <Route path="/github" component={GitHub} />
        </AuthenticatedRoute>
      </HomeRoute>
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
