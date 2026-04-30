import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, X } from 'lucide-react';
import { strings } from '../constants/strings';
import './ExportCard.css';

const ExportCard = ({ log, onClose }) => {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        backgroundColor: '#090e17',
        useCORS: true,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `log-ing-${log.date}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  if (!log) return null;

  return (
    <div className="export-modal-overlay">
      <div className="export-modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        {/* This is the area that gets captured by html2canvas */}
        <div className="export-card-capture-area" ref={cardRef}>
          <div className="export-card-header">
            <span className={`export-category ${log.category.toLowerCase()}`}>{log.category}</span>
            <span className="export-date">{log.date}</span>
          </div>
          
          <div className="export-card-body">
            <h2 className="export-location">{log.location}</h2>
            <div className="export-stats">
              <div className="stat-item">
                <span className="stat-label">{strings.export.stats.maxDepth}</span>
                <span className="stat-value">{log.max_depth}m</span>
              </div>
              
              {log.category === 'Scuba' && log.category_data && (
                <div className="stat-item">
                  <span className="stat-label">{strings.export.stats.airConsumed}</span>
                  <span className="stat-value">{log.category_data.consumption} bar</span>
                </div>
              )}
              
              {log.category === 'Freediving' && log.category_data && (
                <div className="stat-item">
                  <span className="stat-label">{strings.export.stats.relaxTime}</span>
                  <span className="stat-value">{log.category_data.relax_time}s</span>
                </div>
              )}
              
              {log.category === 'Training' && log.category_data && (
                <>
                  <div className="stat-item">
                    <span className="stat-label">{strings.export.stats.focus}</span>
                    <span className="stat-value">{log.category_data.focus}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">{strings.export.stats.duration}</span>
                    <span className="stat-value">{log.category_data.duration}m</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="export-creature-showcase">
              <div className="showcase-label">{strings.export.discovered}</div>
              <div className={`export-creature-icon ${log.category.toLowerCase()}`}>
                {log.earned_creature}
              </div>
            </div>
          </div>
          
          <div className="export-card-header">
            <span className="brand-name">{strings.export.brandName}</span>
            <span className="brand-tagline">{strings.export.brandTagline}</span>
          </div>
        </div>

        <button className="btn btn-primary download-btn" onClick={handleDownload}>
          <Download size={18} style={{ marginRight: '8px' }} /> {strings.export.saveImage}
        </button>
      </div>
    </div>
  );
};

export default ExportCard;
