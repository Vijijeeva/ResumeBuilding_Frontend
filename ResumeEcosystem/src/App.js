import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ResumePreview from './components/ResumePreview';
import ResumeCustomization from './components/ResumeCustomization';
import { sampleResumeData } from './data/SampleData';
import './styles/App.css';

function App() {
  const [resumeData, setResumeData] = useState(sampleResumeData);
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Simulate real-time data updates from ecosystem
  useEffect(() => {
    const interval = setInterval(() => {
      // In real implementation, this would fetch from backend APIs
      console.log('Checking for resume data updates...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="App">
      <Header />
      <div className="app-container">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Resume Preview
          </button>
          <button 
            className={`tab-button ${activeTab === 'customize' ? 'active' : ''}`}
            onClick={() => setActiveTab('customize')}
          >
            Customize
          </button>
        </div>

        <div className="main-content">
          {activeTab === 'preview' ? (
            <ResumePreview 
              resumeData={resumeData} 
              template={selectedTemplate}
            />
          ) : (
            <ResumeCustomization
              resumeData={resumeData}
              onUpdate={updateResumeData}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;