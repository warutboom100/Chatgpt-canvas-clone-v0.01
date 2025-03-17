import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import ContextProvider from './context/Context.jsx';
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ContextProvider>
  </StrictMode>,
)
