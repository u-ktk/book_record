import React from 'react';
import { Link } from 'react-router-dom';
import no_img from '../images/no_image_tate.png';
import { CardGroup, Card, Row, Col, Badge } from 'react-bootstrap';

const defaultImage = no_img;

const BookContent = (book) => {
  let badgeClass = '';
  switch (book.progress) {
    case 'finished':
      badgeClass = 'bg-primary';
      break;
    case 'unread':
      badgeClass = 'bg-secondary';
      break;
    case 'reading':
      badgeClass = 'bg-success';
      break;
    default:
      break;
  }

  return (
    <Row lassName="g-4">
      <Col key={book.id}>
        <Card className="bg-warning" style={{ margin: '10px', padding: '5px', paddingTop: '15px', paddingBottom: '15px', boxShadow: '3px -2px 14px -5px #BBBBB9', borderRadius: '14px'}}>
          <Row className="g-0">
            <Col md={4} style={{ marginLeft: '20px', marginRight: '-30px' }}>
              {book.photo ? (
                <Card.Img
                  variant="top"
                  src={book.photo}
                  style={{ width: '40%', height: 'auto' }}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src={defaultImage}
                  style={{ width: '40%', height: 'auto' }}
                />
              )}
            </Col>
            <Col md={8} className="d-flex align-items-center">
              <Card.Body>
                <Badge pill className={badgeClass} style={{ marginBottom: '5px'}}>
                  {book.progress}
                </Badge>
                <Card.Title>
                  {/* 絶対パス(booklistからもアクセスできるように！) */}
                  <Link to={`/book/${book.id}`}>{book.title}</Link>
                </Card.Title>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export { BookContent };
