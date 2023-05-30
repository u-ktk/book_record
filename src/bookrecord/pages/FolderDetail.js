import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getFolder } from '../api/getRecord'
import { Card, Row, Col, Table } from 'react-bootstrap';


const FolderDetail = () => {
    const [bookFolder, setBookFolder] = useState([])
    const [loading, setLoading] = useState(true)
    // useParams()　 react-router-domから提供される　！　URLのパラメータを取得　し、変数に格納
    const {id} = useParams();

  
    useEffect(() => {
  
      const fetchData = async () => {
        try {
          const data = await getFolder(id);
          setBookFolder(data);
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
      <Col xs={6}>
        <Card style={{ margin: '10px', marginLeft: '20px' , marginRight:'10px'}} className="bg-warning" >
          <Card.Body style={{ padding: '20px'}}>
          <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '24px' }}>
            {/*  (?.) を使用して、bookFolder配列の要素が存在しない場合には undefined を返す.
            そのためエラーが発生せずに folder_name に正しい値が代入される。 */}
           {bookFolder[0]?.folder_name}
          </Card.Title>
  
        {
            loading ?
            <h1>loading...</h1>
            :
        
        <div>
            {bookFolder[0].books.map((book, index) => 
            
              <Card.Body style={{ padding: '1rem', display: 'flex' , fontSize: '1.2rem'}}>
              {/* このリンクを本のidにしなければならない（フォルダー一覧で新しく生成したidは×） */}
               <Link to={`/book/${book[1]}`}>{book[0]}</Link>
              </Card.Body>

               )}
            {/* {bookFolder[0].book.map(book => < FolderView{...book}/> )} */}
        </div>

        }

        </Card.Body>
        </Card>
      </Col>
      </Row>
  );
};

export {FolderDetail}