import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';
import Cart from './Components/Cart';

function App() {
    return (
        <Router>
            <div className="App">
              <Navbar/>
              <Routes>
                <Route path='/' exact Component={Home}/>
                <Route path='/products' Component={Products}/>
                <Route path='/cart' Component={Cart}/>
                <Route path='/wishlist'/>
              </Routes>
              {/* <Footer/> */}
            </div>
        </Router>
    );
}

export default App;
