import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter as Router, RouterProvider, createBrowserRouter} from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
  </Router>

)
