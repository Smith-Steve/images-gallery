import { useState } from 'react';
import Header from'./components/Header';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

const App = () =>  {
  /* As a result of the below, 'word' is now in state of app.*/
  const [word,setWord] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(word)
  }
  

  return (
    <div>
      <Header title="Images Gallery"/>
      <Search handleSubmit={handleSearchSubmit} word={word} setWord={setWord}/>
    </div>
  );
}

export default App;
