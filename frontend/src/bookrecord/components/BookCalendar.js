import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin  from "@fullcalendar/interaction"
import { getDateList } from '../api/getRecord'
import { Card, Row, Col } from 'react-bootstrap';


const BookCalendar = () => {
    const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getDateList();
          console.log(data);
          setDate(data);
          setLoading(false);

        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      };    
      
      fetchData();
    }, []);


  const handleDateClick = (e) => {
    const clickedDate = e.date;
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = clickedDate.toLocaleDateString('ja-JP', options).replace(/\//g, '-');;
    console.log(formattedDate); // "2023/05/22"
    window.location.href =`/calendar/${formattedDate}`

    
  };




  return (
    <Row>
    <Col xs={10}>
      <Card style={{ margin: '10px'}} className="bg-warning" >
        <Card.Body style={{ padding: '20px'}}>
          <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '24px' }}>
            カレンダー
          </Card.Title>
          <p>日付をクリックするとその日読んだ本の一覧が表示されます</p>
        {
            loading ?
            <h1>loading...</h1> :
            <div>

                <FullCalendar
                    plugins={[daygridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={date}
                    eventBackgroundColor={'#2F695B'}
                    eventBorderColor={"#F8FAF0"}
                    dateClick={handleDateClick}/>
            </div>
}
      </Card.Body>
      </Card>
    </Col>
    </Row>

  );
};

export {BookCalendar}