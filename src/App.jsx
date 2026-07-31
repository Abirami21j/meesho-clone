import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { DataProvider } from './context/DataContext';
import SplashScreen from './components/common/SplashScreen';

function App() {
  const [ready, setReady] = useState(false);

  return (
    <AuthProvider>
      <DataProvider>
        <CheckoutProvider>
          {ready ? <AppRoutes /> : <SplashScreen onFinish={() => setReady(true)} />}
        </CheckoutProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;