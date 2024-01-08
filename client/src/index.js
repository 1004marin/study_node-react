import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.js";//전역으로 넣어주기
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from'redux-promise';
import reduxThunk from 'redux-thunk';

const creatStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Provider>
    <App />
</Provider>


  //index.html의 root 안에 보여줄 것이 <app/>라고 정의해둔 것임
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
