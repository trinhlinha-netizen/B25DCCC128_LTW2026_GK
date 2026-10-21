const BUILD_TAG = "qf-2817";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      try {
        const savedBooks = localStorage.getItem('gk_books');
        if (savedBooks) {
          setBooks(JSON.parse(savedBooks));
          setLoading(false);
          return;
        }

        const res = await axios.get('/data/books.json', { signal: controller.signal });
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_books', JSON.stringify(books));
    }
  }, [books, loading, error]);

  const handleAddBook = (newBook) => {
    const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
    const bookToAdd = { ...newBook, id: maxId + 1, available: true };
    setBooks([...books, bookToAdd]);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const handleToggleStatus = (id) => {
    setBooks(books.map(b => 
      b.id === id ? { ...b, available: !b.available } : b
    ));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home books={books} />} />
        <Route path="books" element={<BookList books={books} onDelete={handleDeleteBook} onToggle={handleToggleStatus} />} />
        <Route path="books/new" element={<AddBook onAdd={handleAddBook} />} />
        <Route path="books/:id" element={<BookDetail books={books} />} />
      </Route>
    </Routes>
  );
};

export default App;