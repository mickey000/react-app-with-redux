import 'babel-polyfill';
import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(todoApp, persistedState);

store.subscribe(_.throttle(() => {
  saveState({
    todos: store.getState().todos
  });

  console.log('Save state to the localStorage');
  
}, 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
