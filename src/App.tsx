import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { AppRoutes } from './Routes';

import { AuthProvider } from './contexts/authContext';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' index element={<Login></Login>}></Route>
          <Route path='/*' element={<AppRoutes></AppRoutes>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
