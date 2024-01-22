import logo from './logo.svg';
import './App.css';
import Login from './components/auth/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/auth/signup';
import Home from './components/home/home';
import Category from './components/category/category';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/category" element={<Category />}/>
        
        
          
         
       
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
