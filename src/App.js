import './App.css';
import Login from './components/login/LoginPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element= {<Login/>}/>
              <Route path='/login' element= {<Login/>}/>
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
