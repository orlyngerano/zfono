import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './screen/Home';
import Device from './screen/Device';

import DeviceReducer from './reducers/Device';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const reducers = combineReducers({
  Device: DeviceReducer
});

const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(pReducer);
const persistor = persistStore(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route exact path='/home' component={Home} />
              <Route exact path="/device" component={Device} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>          
    );
  }
}



export default App;
