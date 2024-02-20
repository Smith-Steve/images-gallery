import React from 'react';
import { Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <>
      <h1> Images Gallery</h1>
      <p>
        {' '}
        Simple Application That Retrieves Photos that uses unsplash API. In
        order to start, enter a term into the input field
      </p>
      <Button href="https://unsplash.com" target="_blank">
        Learn More
      </Button>
    </>
  );
};

export default Welcome;
