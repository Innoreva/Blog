import logo from './logo.svg';
import './App.css';
import Login from './components/Login';


import React from 'react';
import { Box } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components


 import Header from './components/header/Header';
 import Home from './components/home/Home';
 import DetailView from './components/details/DetailView';
 import CreatePost from './components/create/CreatePost';


function App() {
  return (
   
      <BrowserRouter>
        
         <Header />
        <Box style={{marginTop: 64}}>
          <Routes>
            <Route exact path='/' element={Home} />
            <Route exact path='/details' element={DetailView} />
            <Route exact path='/create' element={CreatePost} />
           
          </Routes>
        </Box> 
      </BrowserRouter>
   
  );
}

export default App;  
