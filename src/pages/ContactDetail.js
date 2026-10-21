import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [callEndedMsg, setCallEndedMsg] = useState('');

  const contact = contacts.find(c => c.id === Number(id));

  useEffect(() => {
    let timerId;
    if (isCalling) {
      timerId = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isCalling]);

  if (!contact) {
    return <div>Không tìm thấy liên hệ</div>;
  }

  const handleCall = () => {
    setSeconds(0);
    setIsCalling(true);
    setCallEndedMsg('');
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallEndedMsg(`Cuộc gọi kết thúc sau ${seconds} giây`);
  };

  return (
    <div>
      <h2>Chi tiết</h2>
      <p>Họ tên: {contact.name}</p>
      <p>Số điện thoại: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      <p>Nhóm: {contact.group}</p>
      <p>Yêu thích: {contact.favorite ? 'Có' : 'Không'}</p>
      
      <div style={{ marginTop: '15px', marginBottom: '15px' }}>
        {!isCalling ? (
          <button onClick={handleCall}>Gọi</button>
        ) : (
          <div>
            <p>Đang gọi... {seconds} giây</p>
            <button onClick={handleEndCall}>Kết thúc</button>
          </div>
        )}
        {callEndedMsg && !isCalling && <p>{callEndedMsg}</p>}
      </div>

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ContactDetail;