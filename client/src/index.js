import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import App from './App';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <AnimatePresence>
                <Router>
                    <App />
                </Router>
            </AnimatePresence>
        </Provider>
    </React.StrictMode>
);