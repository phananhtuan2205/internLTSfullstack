import React, { useState } from 'react';
import './App.css';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Header from './ComponentUser/Header';
import { Routes, Route } from "react-router-dom";
import Home from "./ComponentUser/Home"
import AboutUs from "./ComponentUser/AboutUs"
import Shop from "./ComponentUser/Shop"
import Blog from "./ComponentUser/Blog"
import Contact from "./ComponentUser/Contact"
import Product from './ComponentAdmin/Product';
import { useRoutes } from "react-router-dom";
import routes from "./router";
function App() {
  let element = useRoutes(routes);
  return (
    <div className='App'>
      {element}

    </div>
    
  );
}

export default App;
