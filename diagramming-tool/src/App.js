import './App.css';

import HomePage from './Component/HomePage/HomePage';


import Home from './Component/Home/Home';
import ChangePassword from './Component/ChangePassword/ChangePassword';

function App() {
  return (
    <div className="App">
      <header className="App-header">

       <HomePage/>

       {/* <Home/> */}
       {/* <ChangePassword/> */}

      </header>
    </div>
  );
}

export default App;