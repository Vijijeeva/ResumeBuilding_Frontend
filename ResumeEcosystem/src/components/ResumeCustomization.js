import React from 'react';
import SectionEditor from './SectionEditor';
import TemplateSelector from './TemplateSelector';
import '../styles/ResumeCustomization.css';

const ResumeCustomization = ({ 
  resumeData, 
  onUpdate, 
  selectedTemplate, 
  onTemplateChange 
}) => {
  const sections = [
    { id: 'personalInfo', title: 'Personal Information', type: 'personal' },
    { id: 'summary', title: 'Professional Summary', type: 'text' },
    { id: 'experience', title: 'Work Experience', type: 'list' },
    { id: 'education', title: 'Education', type: 'list' },
    { id: 'skills', title: 'Skills', type: 'skills' },
    { id: 'projects', title: 'Projects', type: 'list' },
    { id: 'certifications', title: 'Certifications', type: 'list' }
  ];

  const [activeSection, setActiveSection] = React.useState('personalInfo');

  return (
    <div className="customization-container">
      <div className="customization-sidebar">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateChange={onTemplateChange}
        />
        
        <div className="section-list">
          <h3>Resume Sections</h3>
          {sections.map(section => (
            <button
              key={section.id}
              className={`section-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="integration-status">
          <h4>Connected Platforms</h4>
          <div className="platform-item connected">
            <span>LinkedIn</span>
            <div className="status-dot"></div>
          </div>
          <div className="platform-item connected">
            <span>GitHub</span>
            <div className="status-dot"></div>
          </div>
          <div className="platform-item">
            <span>Coursera</span>
            <div className="status-dot disconnected"></div>
          </div>
          <div className="platform-item">
            <span>HackerRank</span>
            <div className="status-dot disconnected"></div>
          </div>
        </div>
      </div>

      <div className="customization-main">
        <SectionEditor
          section={activeSection}
          data={resumeData[activeSection]}
          onUpdate={(data) => onUpdate(activeSection, data)}
          type={sections.find(s => s.id === activeSection)?.type}
        />
        
        <div className="ai-suggestions">
          <h4>AI Suggestions</h4>
          <div className="suggestion-item">
            <p>Consider adding more quantifiable achievements to your experience section.</p>
            <button className="btn-suggestion">Apply Suggestion</button>
          </div>
          <div className="suggestion-item">
            <p>Your skills section could be better organized by proficiency level.</p>
            <button className="btn-suggestion">Reorganize</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCustomization;