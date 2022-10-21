import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

const Router = process.env.NODE_ENV === 'test' ? MemoryRouter : BrowserRouter;

const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
