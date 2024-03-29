import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from './components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  /* As a result of the below, 'word' is now in state of app.*/
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([true]);

  async function axiosGetImages() {
    try {
      const response = await axios.get(`${API_URL}/images`);
      setImages(response.data || []);
      setLoading(false);
      toast('Saved Images Into MongoDB');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => axiosGetImages, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New Image ${word.toUpperCase()} found`);
    } catch (error) {
      console.log(error);
    }
    setWord('');
  };

  const handleDeleteImage = async (id) => {
    console.log('We are in the top of the handle delete function. In app.js');
    try {
      const response = await axios.delete(`${API_URL}/images/${id}`);
      console.log('Outside of if block.', response.data);
      if (response.data.deleted_Id) {
        console.log('Were in if block');
        setImages(images.filter((image) => image.id !== id));
        toast.warning('Image Removed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const response = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (response.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image,
          ),
        );
        toast.info(`Image ${imageToBeSaved.title} was saved.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            handleSubmit={handleSearchSubmit}
            word={word}
            setWord={setWord}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row x={1} md={2} lg={3}>
                {images.map((image, index) => (
                  <Col key={index} className="pb-3">
                    <ImageCard
                      image={image}
                      key={index}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
