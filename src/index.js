import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import './assets/css/index.css';

window.onload = () => {
    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
        document.querySelector('#root')
    );
};