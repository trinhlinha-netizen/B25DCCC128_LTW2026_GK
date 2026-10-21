import React from 'react';

const Home = ({ contacts }) => {
  const totalContacts = contacts.length;
  
  const favoriteContactsCount = contacts.reduce((acc, curr) => {
    return curr.favorite ? acc + 1 : acc;
  }, 0);

  const gmailContactsCount = contacts.reduce((acc, curr) => {
    return curr.email.toLowerCase().endsWith('@gmail.com') ? acc + 1 : acc;
  }, 0);

  return (
    <div>
      <h1>Danh bạ</h1>
      <p>Tổng số liên hệ: {totalContacts}</p>
      <p>Số liên hệ yêu thích: {favoriteContactsCount}</p>
      <p>Số liên hệ dùng Gmail: {gmailContactsCount}</p>
    </div>
  );
};

export default Home;