import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    group: 'Bạn bè'
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, group } = formData;

    // Kiểm tra ô trống
    if (!name || !phone || !email || !group) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }

    // Kiểm tra số điện thoại (đúng 10 số và bắt đầu bằng 0)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMsg('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0');
      return;
    }

    // Kiểm tra email có @
    if (!email.includes('@')) {
      setErrorMsg('Email không hợp lệ');
      return;
    }

    onAdd({ name, phone, email, group });
    navigate('/contacts', { replace: true });
  };

  return (
    <div>
      <h2>Thêm mới</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên: 
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>Số điện thoại: 
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>Email: 
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>Nhóm: 
            <select name="group" value={formData.group} onChange={handleChange}>
              {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddContact;