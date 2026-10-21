const BUILD_TAG = "hb-9472";
/* eslint-disable import/first */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchContacts = async () => {
      try {
        const savedContacts = localStorage.getItem('gk_contacts');
        if (savedContacts) {
          setContacts(JSON.parse(savedContacts));
          setLoading(false);
          return;
        }

        const res = await axios.get('/data/contacts.json', { signal: controller.signal });
        setContacts(res.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchContacts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_contacts', JSON.stringify(contacts));
    }
  }, [contacts, loading, error]);

  const handleAddContact = (newContact) => {
    const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) : 0;
    const contactToAdd = { ...newContact, id: maxId + 1, favorite: false };
    setContacts([...contacts, contactToAdd]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, favorite: !c.favorite } : c
    ));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route path="contacts" element={<ContactList contacts={contacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="contacts/new" element={<AddContact onAdd={handleAddContact} />} />
        <Route path="contacts/:id" element={<ContactDetail contacts={contacts} />} />
      </Route>
    </Routes>
  );
};

export default App;