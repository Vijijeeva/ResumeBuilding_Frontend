import React from 'react';

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional' },
    { id: 'classic', name: 'Classic', description: 'Traditional layout' },
    { id: 'creative', name: 'Creative', description: 'Design-focused' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' }
  ];

  return (
    <div className="template-selector">
      <h3>Choose Template</h3>
      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className={`template-preview ${template.id}`}>
              <div className="preview-header"></div>
              <div className="preview-content">
                <div className="preview-line short"></div>
                <div className="preview-line medium"></div>
                <div className="preview-line long"></div>
              </div>
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;