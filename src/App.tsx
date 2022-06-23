import React from 'react';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import 'antd/dist/antd.less';
import "./styles/_main.scss";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
