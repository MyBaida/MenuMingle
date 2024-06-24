// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {Provider} from 'react-redux';
// import store from './store';
// import './css/index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistStore } from 'redux-persist'; // Import persistStore
import store from './store'; // Import your Redux store
import App from './App';
import reportWebVitals from './reportWebVitals'; // Import reportWebVitals

import './css/index.css';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
    <App />
  </Provider>
);
const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();