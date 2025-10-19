import React, { useState } from 'react';

const SectionEditor = ({ section, data, onUpdate, type }) => {
  const [localData, setLocalData] = useState(data);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...localData];
    updated[index] = { ...updated[index], [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const addItem = () => {
    const newItem = type === 'skills' 
      ? { category: '', items: [] }
      : {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        };
    
    const updated = [...localData, newItem];
    setLocalData(updated);
    onUpdate(updated);
  };

  const removeItem = (index) => {
    const updated = localData.filter((_, i) => i !== index);
    setLocalData(updated);
    onUpdate(updated);
  };

  const renderPersonalInfo = () => (
    <div className="form-group">
      <label>Full Name</label>
      <input
        type="text"
        value={localData.name || ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      
      <label>Professional Title</label>
      <input
        type="text"
        value={localData.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      
      <label>Email</label>
      <input
        type="email"
        value={localData.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      
      <label>Phone</label>
      <input
        type="tel"
        value={localData.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
      />
      
      <label>Location</label>
      <input
        type="text"
        value={localData.location || ''}
        onChange={(e) => handleChange('location', e.target.value)}
      />
    </div>
  );

  const renderTextInput = () => (
    <div className="form-group">
      <label>Summary Text</label>
      <textarea
        value={localData || ''}
        onChange={(e) => onUpdate(e.target.value)}
        rows="6"
        placeholder="Write a compelling professional summary..."
      />
    </div>
  );

  const renderListItems = () => (
    <div className="list-editor">
      {localData.map((item, index) => (
        <div key={index} className="list-item-editor">
          <button 
            className="remove-btn"
            onClick={() => removeItem(index)}
          >
            ×
          </button>
          
          {section === 'experience' && (
            <>
              <input
                type="text"
                placeholder="Company"
                value={item.company || ''}
                onChange={(e) => handleArrayChange(index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={item.position || ''}
                onChange={(e) => handleArrayChange(index, 'position', e.target.value)}
              />
              <div className="date-inputs">
                <input
                  type="month"
                  placeholder="Start Date"
                  value={item.startDate || ''}
                  onChange={(e) => handleArrayChange(index, 'startDate', e.target.value)}
                />
                <input
                  type="month"
                  placeholder="End Date"
                  value={item.endDate || ''}
                  onChange={(e) => handleArrayChange(index, 'endDate', e.target.value)}
                />
              </div>
              <textarea
                placeholder="Description"
                value={item.description || ''}
                onChange={(e) => handleArrayChange(index, 'description', e.target.value)}
                rows="3"
              />
            </>
          )}

          {section === 'education' && (
            <>
              <input
                type="text"
                placeholder="Institution"
                value={item.institution || ''}
                onChange={(e) => handleArrayChange(index, 'institution', e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree"
                value={item.degree || ''}
                onChange={(e) => handleArrayChange(index, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={item.field || ''}
                onChange={(e) => handleArrayChange(index, 'field', e.target.value)}
              />
              <div className="date-inputs">
                <input
                  type="month"
                  placeholder="Start Date"
                  value={item.startDate || ''}
                  onChange={(e) => handleArrayChange(index, 'startDate', e.target.value)}
                />
                <input
                  type="month"
                  placeholder="End Date"
                  value={item.endDate || ''}
                  onChange={(e) => handleArrayChange(index, 'endDate', e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      ))}
      
      <button className="add-btn" onClick={addItem}>
        + Add {section === 'experience' ? 'Experience' : 'Education'}
      </button>
    </div>
  );

  return (
    <div className="section-editor">
      <h3>Edit {section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
      
      {type === 'personal' && renderPersonalInfo()}
      {type === 'text' && renderTextInput()}
      {type === 'list' && renderListItems()}
    </div>
  );
};

export default SectionEditor;