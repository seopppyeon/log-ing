import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExportCard from '../components/ExportCard';
import LogDetail from '../components/LogDetail';
import { strings } from '../constants/strings';
import './List.css';

const List = () => {
  const logs = useStore((state) => state.logs);
  const userName = useStore((state) => state.userName);
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedExportLog, setSelectedExportLog] = useState(null);

  const handleOpenExport = (log) => {
    setSelectedLog(null);
    setSelectedExportLog(log);
  };

  const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="list-container">
      <div className="logs-list">
        {sortedLogs.map((log) => (
          <div key={log.id} className="log-card glass-panel" onClick={() => setSelectedLog(log)}>
            <div className="log-card-header">
              <span className={`category-badge ${log.category.toLowerCase()}`}>
                {log.category}
              </span>
              <span className="log-date">{log.date}</span>
            </div>

            <div className="log-card-body">
              <div className="log-details">
                <h3>{log.location}</h3>
                <p>{strings.export.stats.maxDepth}: {log.max_depth}m</p>
              </div>
              <div className="earned-creature-thumbnail">
                <div className={`creature-icon-small ${log.category.toLowerCase()}`}>
                  {log.earned_creature}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {logs.length === 0 && (
        <div className="empty-state">
          <p>{strings.list.noLogs}</p>
          <button className="btn btn-primary" onClick={() => navigate('/new')}>
            <Plus size={18} style={{ marginRight: '8px' }} /> {strings.list.recordButton}
          </button>
        </div>
      )}

      {selectedLog && (
        <LogDetail 
          log={selectedLog} 
          onClose={() => setSelectedLog(null)} 
          onExport={handleOpenExport}
        />
      )}

      {selectedExportLog && (
        <ExportCard
          log={selectedExportLog}
          onClose={() => setSelectedExportLog(null)}
        />
      )}
    </div>
  );
};

export default List;
