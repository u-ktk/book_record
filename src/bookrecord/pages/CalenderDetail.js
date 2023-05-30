// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDate } from '../api/getRecord';
// import { Card, Row, Col, Table } from 'react-bootstrap';


// const CalendarDetail = () => {

//   const [bookData, setBookData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // date(2023-05-22)をパラメータとして保持　文字列に変換
//   const dateParams = useParams();
//   const date = dateParams.date;


//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const data = await getDate(date);
//         const filteredData = data.filter((item) => item.date === date);
//         setBookData(filteredData);
//         setLoading(false);

//       } catch (e) {
//         console.error(e);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [date]);


//   return (
//     <div>

//       {
//           loading?
//           <h1>loading...</h1> :
//           <div>
//             {!bookData || bookData.length === 0 ?           
//             <h1 style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '1.5rem' , margin:"1rem"}}>データがありません</h1>
//             :

//             bookData.map((item) => (
//               <div key={item.id}>
//                 <h2>{item.title}</h2>
//                 <p>{item.author}</p>
//                 <p>{item.date}</p>
//               </div>
//             ))
//             }
//             </div>
    
//       }

//       </div>
//   )
// }
// export {CalendarDetail}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDate } from '../api/getRecord';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { fontSize } from '@mui/system';


const CalendarDetail = () => {

  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  // date(2023-05-22)をパラメータとして保持　文字列に変換
  const dateParams = useParams();
  const date = dateParams.date;


  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getDate(date);
        const filteredData = data.filter((item) => item.date === date);
        setBookData(filteredData);
        setLoading(false);

      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);


  return (
    <Row>
    <Col xs={6}>
      <Card style={{ margin: '10px', marginLeft: '20px' , marginRight:'10px'}} className="bg-warning" >
        <Card.Body style={{ padding: '20px'}}>
        <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '24px' }}>
               {date}
        </Card.Title>

      {
          loading?
          <h1>loading...</h1> :
          <div>
            {!bookData || bookData.length === 0 ?           
            <h1 style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '1.5rem' , margin:"1rem"}}>データがありません</h1>
            :

            bookData.map((item) => (
              
              <div key={item.id}>

            <Card.Body style={{ padding: '20px', display: 'flex' }}>
            <Table borderless style={{ flex: '1' }}>
              <tbody>
                <tr style={{fontSize: "1.5rem"}}>
                  <td style={{ width: '25%', fontWeight: 'bold', color: '#2F695B' }}>{item.title}</td>
                  <td>{item.author}</td>
                </tr>
                </tbody>
              </Table>
              </Card.Body>

              </div>
            ))
            }
            </div>
    
      }


        </Card.Body>
        </Card>
      </Col>
      </Row>
  );
};
export {CalendarDetail}
