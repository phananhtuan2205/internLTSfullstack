import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CartReducer from './features/CartSlice';
import { getTotal } from './features/CartSlice';
const store = configureStore({
  reducer:{
    cart: CartReducer  
  }
})
store.dispatch(getTotal())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
