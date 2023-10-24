import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
              <Navbar/>
              <Routes>
                <Route path='/'/>
                <Route path='/products'/>
                <Route path='/cart'/>
                <Route path='/wishlist'/>
              </Routes>
            </div>
        </Router>
    );
}

export default App;
