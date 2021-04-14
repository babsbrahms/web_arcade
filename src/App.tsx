import React, { lazy, Suspense } from 'react';
import { AppContext } from "./container/AppContext";

const Home = lazy(() => import ('./container/Home'));


const App: React.FC = () => {
  return (
    <AppContext>
      <Suspense fallback="loading" >
        <Home />
      </Suspense>
    </AppContext>
    
  );
}

export default App;
