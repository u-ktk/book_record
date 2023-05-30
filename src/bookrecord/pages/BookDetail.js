import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookDetail } from '../api/getRecord';
import { Card, Row, Col, Table } from 'react-bootstrap';
import no_img from '../images/no_image_tate.png';
const defaultImage = no_img;

const BookDetail = () => {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookDetail(id);
        setDetail(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Row>
      <Col xs={10}>
        <Card style={{ margin: '2rem', marginLeft: '2rem', paddingLeft: '2rem', padding: '1.5rem' }} className="bg-warning">
        <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '1.5rem', margin: "1rem" }}>
               {detail.title}
        </Card.Title>
          <Card.Body style={{ padding: '20px', display: 'flex' }}>
  
            <Table borderless style={{ flex: '1' , fontSize: "1.2rem"}}>
              <tbody>
                <tr>
                  <td style={{ width: '25%', fontWeight: 'bold', color: '#2F695B' }}>著者</td>
                  <td>{detail.author}</td>
                </tr>
                <tr>
                  <td style={{ width: '25%', fontWeight: 'bold', color: '#2F695B' }}>日付</td>
                  <td>{detail.date}</td>
                </tr>
                <tr>
                  <td style={{ width: '25%', fontWeight: 'bold', color: '#2F695B' }}>読書状況</td>
                  <td>{detail.progress}</td>
                </tr>
                <tr>
                  <td style={{ width: '25%', fontWeight: 'bold', color: '#2F695B' }}>印象に残った一文</td>
                  <td>{detail.highlighted_quote}</td>
                </tr>
                <tr>
                  <td style={{ width: '25%', fontWeight: 'bold', color: '#2F695B' }}>メモ</td>
                  <td>{detail.memo}</td>
                </tr>
              </tbody>
            </Table>
            {/* 画像がある場合表示*/}
            <div style={{ width: '20%', marginLeft: '2rem' }}>
              <Card.Img variant="top" src={detail.photo ? detail.photo : defaultImage} style={{ width: '100%', height: 'auto' }} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export { BookDetail };
