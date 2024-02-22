import { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  /* As a result of the below, 'word' is now in state of app.*/
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(word);
    fetch(`${API_URL}/new-image?query=${word}`)
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
        {images.length ? (
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
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
