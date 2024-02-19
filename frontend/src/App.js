import Header from'./components/Header'
import Search from './components/Search'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

const App = () =>  {
  return (
    <div>
      <Header title="Images Gallery"/>
      <Search/>
    </div>
  );
}

export default App;
