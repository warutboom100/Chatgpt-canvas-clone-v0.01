import React, { useEffect, useContext } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.css';
import { Context } from './context/Context';
import { intl_PCServer } from './config/api_backend';
import Loader from './components/loading/Loader';
import Login from './pages/Login/Login';
import Main from './components/Main/Main';
import Sidebar from './components/sidebar/Sidebar';


function App() {
  const [cookies] = useCookies("");
  const { backend_connect, setBackend_connect, initloading, setInitloading } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!backend_connect) {
      // intl_PCServer(setBackend_connect);
    } else {
      const timer = setTimeout(() => {
        setInitloading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [backend_connect, setBackend_connect, setInitloading]); 

  return (
    <>
      {!initloading ? (
        <Loader />
      ) : (
        <>
          {!cookies.user_hci ? (
            <div className='d-flex' style={{overflow:"visible",gap:"1.6rem"}}>
              <Sidebar />
              <Main />
            </div>
          ) : (
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Navigate to="/login" />} /> {/* Redirect all other routes */}
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;