import React from 'react';
import GlobalProvider from "./context/GlobalContext"
import Home from "./component/pages/Home";

const App = () => {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
}

export default App;
