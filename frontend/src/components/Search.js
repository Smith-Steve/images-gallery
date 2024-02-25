import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Search = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={
                    word
                  } /* This maakes it a controlled component. the variable word is apart of the state of this pplication*/
                  onChange={(event) => setWord(event.target.value)}
                  placeholder="Search for New Image"
                />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Search Image
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
