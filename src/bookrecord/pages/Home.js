import React, { useEffect, useState } from 'react';
import { getBookList } from '../api/getRecord';
import { BookCalendar } from '../components/BookCalendar';
import { BookContent } from '../components/BookContent';
import { FolderView } from '../components/FolderView';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const initialState = [];
  const [booklist, setBookList] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookList();
        setBookList(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  {/* Homeでは最初の３冊のみ出力 */}
  const firstThreeBooks = booklist.slice(0, 3);


  
  return (
    <Row>
      <Col xs={6}>
        <Card style={{ margin: '10px', marginLeft: '20px' , marginRight:'10px'}} className="bg-warning" >
          <Card.Body style={{ padding: '20px'}}>
            <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '24px' }}>
              最近登録した本
            </Card.Title>
            {loading ? (
              <h1>loading...</h1>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                 {firstThreeBooks.map((book) => (
                  <div key={book.id} style={{ margin: '5px' }}>
                    <BookContent {...book} />
                  </div>
                ))}
                {booklist.length > 3 && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Link to="/booklist/">
                      <Button variant="primary">もっと見る</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

          </Card.Body>
        </Card>
      </Col>


      <Col xs={6}>
        <BookCalendar />
        <FolderView />
      </Col>
    </Row>
  );
};

export { Home };
