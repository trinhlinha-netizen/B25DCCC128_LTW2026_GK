import React from 'react';
import { GROUPS } from '../data';

const FilterBar = ({ keyword, onKeywordChange, group, onGroupChange }) => {
    return (
        <div style={{ marginBottom: '15px' }}>
            <label>Tìm kiếm: 
                <input 
                    type="text" 
                    value={keyword} 
                    onChange={onKeywordChange} 
                    placeholder="Tên hoặc số điện thoại..." 
                    style={{ marginLeft: '5px' }}
                />
            </label>
            <label style={{ marginLeft: '20px' }}>Nhóm: 
                <select value={group} onChange={onGroupChange} style={{ marginLeft: '5px' }}>
                    <option value="Tất cả">Tất cả</option>
                    {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </label>
        </div>
    );
};

export default FilterBar;