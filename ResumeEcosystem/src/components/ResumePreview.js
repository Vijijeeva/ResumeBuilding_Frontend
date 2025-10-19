import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/ResumePreview.css';

const ResumePreview = ({ resumeData, template }) => {
  const resumeRef = useRef();

  const handleExportPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.personalInfo.name}_resume.pdf`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="resume-preview-container">
      <div className="preview-controls">
        <h2>Resume Preview</h2>
        <div className="control-buttons">
          <button className="btn-secondary" onClick={() => window.print()}>
            Print
          </button>
          <button className="btn-primary" onClick={handleExportPDF}>
            Export PDF
          </button>
        </div>
      </div>

      <div ref={resumeRef} className={`resume-template ${template}`}>
        {/* Personal Info Section */}
        <header className="resume-header">
          <div className="personal-info">
            <h1 className="name">{resumeData.personalInfo.name}</h1>
            <p className="title">{resumeData.personalInfo.title}</p>
            <div className="contact-info">
              <span>{resumeData.personalInfo.email}</span>
              <span>{resumeData.personalInfo.phone}</span>
              <span>{resumeData.personalInfo.location}</span>
              {resumeData.personalInfo.linkedin && (
                <span>LinkedIn: {resumeData.personalInfo.linkedin}</span>
              )}
            </div>
          </div>
        </header>

        {/* Summary Section */}
        {resumeData.summary && (
          <section className="resume-section">
            <h2 className="section-title">Professional Summary</h2>
            <p className="summary-text">{resumeData.summary}</p>
          </section>
        )}

        {/* Experience Section */}
        <section className="resume-section">
          <h2 className="section-title">Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="company">{exp.company}</h3>
                <span className="date">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </span>
              </div>
              <p className="position">{exp.position}</p>
              <p className="description">{exp.description}</p>
              {exp.technologies && (
                <div className="technologies">
                  <strong>Technologies:</strong> {exp.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h3 className="institution">{edu.institution}</h3>
                <span className="date">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="degree">{edu.degree} in {edu.field}</p>
              <p className="gpa">GPA: {edu.gpa}</p>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {resumeData.skills.map((skillCategory, index) => (
              <div key={index} className="skill-category">
                <strong>{skillCategory.category}:</strong>
                <div className="skill-tags">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="resume-section">
          <h2 className="section-title">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className="date">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                <strong>Tech Stack:</strong> {project.technologies.join(', ')}
              </div>
            </div>
          ))}
        </section>

        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Certifications</h2>
            <div className="certifications-list">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <strong>{cert.name}</strong> - {cert.issuer} ({formatDate(cert.date)})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;