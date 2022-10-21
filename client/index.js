import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

const Router = process.env.NODE_ENV === 'test' ? MemoryRouter : BrowserRouter;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
