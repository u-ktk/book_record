import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './bookrecord/pages/Home'
import { BookDetail } from './bookrecord/pages/BookDetail';
import Navbar, { CustomNavbar } from './bookrecord/components/Navbar';
import { BookRecord } from './bookrecord/pages/BookRecord';
import { BookSearch } from './bookrecord/pages/BookSearch';
import { FolderDetail } from './bookrecord/pages/FolderDetail';
import { CalendarDetail } from './bookrecord/pages/CalenderDetail';
import { FolderList } from './bookrecord/pages/FolderList';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { BookList } from './bookrecord/components/BookList';
import { Login } from './bookrecord/pages/login';



const App = () => {

  return (

    <div>

       <BrowserRouter>
       {/* NavBarにHome、bookrecord, booksearch, folderのリンク */}
        <CustomNavbar/>
        <div>
          
          {/* v6ではSwitchではなくRoutesであることに注意 */}
          <Routes>
            {/* ホーム画面 */}
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/bookrecord/' element ={<BookRecord/>} /> 
              <Route exact path='/book/:id/' element ={<BookDetail/>} />
              <Route exact path='booksearch/' element ={<BookSearch/>} />
              <Route exact path='booklist/' element ={<BookList/>} />
              <Route exact path='/folder' element ={<FolderList/>} />
              <Route exact path='/folder/:id' element ={<FolderDetail/>} />
              <Route exact path='/calendar/:date' element ={<CalendarDetail/>} />
              <Route render={() => <h4>not found</h4>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;

