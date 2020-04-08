import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { Provider } from 'react-redux';
// import store from './redux/store';

import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <App />, rootElement
  // Will implement Redux in a future PR, not that it's strictly needed, mostly for practice using it
  // <Provider store={store}>
  //   <App />
  // </Provider>, rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
