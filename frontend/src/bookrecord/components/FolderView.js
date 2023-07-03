import React, { useEffect, useState } from 'react'
import { getFolderList } from '../api/getRecord'
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const FolderView = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getFolderList();
          setFolders(data);
          setLoading(false);

        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      };    
      
      fetchData();
    }, []);

    // console.log(folders)
    // folders.map((folder) => {
    //   console.log(folder.name)
    //   console.log(folder.id)
    // })

    return (
      <Row>
      <Col xs={10}>
        <Card style={{ margin: '10px'}} className="bg-warning" >
          <Card.Body style={{ padding: '20px'}}>
            <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '24px' }}>
              フォルダ一覧
            </Card.Title>
       {
            loading ?
            <h1>loading...</h1> :
            <div>
            {folders.map((folder) => (
              <div key={folder.id}>
                <Link to={`/folder/${folder.id}`}>
                <ul>
                  <li style={{lineHeight: '30px',fontSize:'24px' }}> {folder.folder_name}</li>
                 </ul>
                </Link>
              </div>
            ))}
            </div>

  
      }
     </Card.Body>
      </Card>
    </Col>
    </Row>

  );
};
export { FolderView };