import React from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout/Layout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
