import React, { lazy, Suspense } from 'react';
// import { AppContext } from "./container/AppContext";
// import ErrorBoundary from "./container/ErrorBoundary"
// const Home = lazy(() => import ('./container/Home'));
import "./App.css"
import Counter from "./counter/Counter"


const App: React.FC = () => {
  return (
    // <AppContext>
    //   <ErrorBoundary>
    //     <Suspense fallback="loading" >
    //       <Home />
    //     </Suspense>
    //   </ErrorBoundary>

    // </AppContext>
    // <div className="App">
    //     <Counter />
    // </div>
    
  );
}

export default App;
