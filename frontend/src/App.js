import { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  /* As a result of the below, 'word' is now in state of app.*/
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]);
        /* New images will be added to a new array.*/
      })
      .catch((error) => console.log(error));
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search handleSubmit={handleSearchSubmit} word={word} setWord={setWord} />
      <Container className="mt-4">
        <Row x={1} md={2} lg={3}>
          {images.map((image, index) => (
            <Col key={index} className="pb-3">
              <ImageCard
                image={image}
                key={index}
                deleteImage={handleDeleteImage}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;
