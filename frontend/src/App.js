import { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  /* As a result of the below, 'word' is now in state of app.*/
  const [word, setWord] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    setWord('');
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search handleSubmit={handleSearchSubmit} word={word} setWord={setWord} />
    </div>
  );
};

export default App;
