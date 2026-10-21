import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from "../components/ContactTable";

const ContactList = ({ contacts, onDelete, onToggleFavorite }) => {
  const [keyword, setKeyword] = useState('');
  const [group, setGroup] = useState('Tất cả');

  const handleQueryShift = (e) => {
    setKeyword(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const filteredContacts = contacts.filter(contact => {
    const term = keyword.toLowerCase();
    const matchKeyword = contact.name.toLowerCase().includes(term) || contact.phone.includes(term);
    const matchGroup = group === 'Tất cả' || contact.group === group;
    return matchKeyword && matchGroup;
  });

  return (
    <div>
      <h2>Danh sách</h2>
      <FilterBar 
        keyword={keyword} 
        onKeywordChange={handleQueryShift} 
        group={group} 
        onGroupChange={handleGroupChange} 
      />
      
      {filteredContacts.length > 0 ? (
        <>
          <p>Tìm thấy {filteredContacts.length} liên hệ</p>
          <ContactTable 
            contacts={filteredContacts} 
            onDelete={onDelete} 
            onToggleFavorite={onToggleFavorite} 
          />
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
};

export default ContactList;