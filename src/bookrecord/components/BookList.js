

import React, { useEffect, useState } from 'react';
import { BookContent } from '../components/BookContent';
import { Card, Row, Col, Pagination } from 'react-bootstrap';
import { getBookList } from '../api/getRecord';

const BookList = () => {
  const initialState = [];
  const [booklist, setBookList] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // ページネーション　最初は１ページ目
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);

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

  // booklistから、現在のページに表示する範囲をsliceで抽出
  const getPageRange = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return booklist.slice(startIndex, endIndex);
  };

  // currentPageをセット
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ページ数獲得、各ページにBootstrapのページネーション適用
  const renderPagination = () => {
    const totalPages = Math.ceil(booklist.length / booksPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return <Pagination>{pageNumbers}</Pagination>;
  };

  // １行に２列ずつ出力したいため、book1とbook2に分ける（上手くやればcssで実装できるかもしれない）
  const separateBooks = () => {
    const pageRange = getPageRange();
    const books = [];

    for (let i = 0; i < pageRange.length; i += 2) {
      const book1 = pageRange[i];
      const book2 = pageRange[i + 1];

      books.push(
        <Row key={i}>
          <Col>
            <BookContent {...book1} />
          </Col>
          {book2 ? (
          <Col>
            <BookContent {...book2} />
          </Col>
        ) : (
          <Col>
            <Card.Body></Card.Body>
          </Col>
        )}
        </Row>
      );
    }

    return books;
  };

  return (
    <Row>
      <Col xs={10}>
        <Card
          style={{ margin: '10px', marginLeft: '20px', marginRight: '10px' }}
          className="bg-warning"
        >
          <Card.Body style={{ padding: '20px' }}>
            <Card.Title style={{ fontWeight: 'bold', color: '#2F695B', fontSize: '24px' }}>
              最近登録した本
            </Card.Title>
            {loading ? <h1>loading...</h1> : <div>{separateBooks()}</div>}
            {renderPagination()}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export { BookList };
