import { X, Share2, Image as ImageIcon, MapPin, Calendar, Trash2 } from 'lucide-react';
import { strings } from '../constants/strings';
import useStore from '../store/useStore';
import './LogDetail.css';

const LogDetail = ({ log, onClose, onExport }) => {
  if (!log) return null;

  const handleShare = async () => {
    const shareData = {
      title: 'Log-ing',
      text: `${log.location}에서 ${log.max_depth}m 다이빙을 기록했어요!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(strings.detail.shareSuccess);
      } catch (err) {
        alert(strings.detail.shareFail);
      }
    }
  };

  const deleteLog = useStore((state) => state.deleteLog);

  const handleDelete = () => {
    if (window.confirm(strings.detail.deleteConfirm)) {
      deleteLog(log.id);
      onClose();
    }
  };

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <h2>{strings.detail.title}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="detail-body">
          <div className="detail-main-info">
            <div className={`detail-category-badge ${log.category.toLowerCase()}`}>
              {log.category}
            </div>
            <div className="detail-date">
              <Calendar size={14} /> {log.date}
            </div>
            <h1 className="detail-location">
              <MapPin size={20} /> {log.location}
            </h1>
          </div>

          <div className="detail-stats-grid">
            <div className="detail-stat-item">
              <span className="label">{strings.export.stats.maxDepth}</span>
              <span className="value">{log.max_depth}m</span>
            </div>

            {log.category === 'Scuba' && log.category_data && (
              <>
                <div className="detail-stat-item">
                  <span className="label">{strings.create.scuba.start}</span>
                  <span className="value">{log.category_data.start_pressure} bar</span>
                </div>
                <div className="detail-stat-item">
                  <span className="label">{strings.create.scuba.end}</span>
                  <span className="value">{log.category_data.end_pressure} bar</span>
                </div>
                <div className="detail-stat-item highlight">
                  <span className="label">{strings.export.stats.airConsumed}</span>
                  <span className="value">{log.category_data.consumption} bar</span>
                </div>
              </>
            )}

            {log.category === 'Freediving' && log.category_data && (
              <>
                <div className="detail-stat-item">
                  <span className="label">{strings.export.stats.relaxTime}</span>
                  <span className="value">{log.category_data.relax_time}s</span>
                </div>
                <div className="detail-stat-item">
                  <span className="label">{strings.create.freediving.equalization}</span>
                  <span className="value">
                    {log.category_data.eq_status === 'Good' ? strings.create.freediving.eqOptions.good 
                     : log.category_data.eq_status === 'Left Fail' ? strings.create.freediving.eqOptions.leftFail 
                     : strings.create.freediving.eqOptions.rightFail}
                  </span>
                </div>
              </>
            )}

            {log.category === 'Training' && log.category_data && (
              <>
                <div className="detail-stat-item">
                  <span className="label">{strings.export.stats.focus}</span>
                  <span className="value">{log.category_data.focus}</span>
                </div>
                <div className="detail-stat-item">
                  <span className="label">{strings.export.stats.duration}</span>
                  <span className="value">{log.category_data.duration}m</span>
                </div>
              </>
            )}
          </div>

          <div className="detail-creature-section">
            <p className="section-label">{strings.export.discovered}</p>
            <div className={`detail-creature-card ${log.category.toLowerCase()}`}>
              <span className="creature-emoji">{log.earned_creature}</span>
              <div className="creature-info">
                <span className="creature-name">{log.earned_creature.toUpperCase()}</span>
                <span className="creature-desc">이 생물이 바다에 추가되었습니다.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <div className="secondary-actions">
            <button className="btn btn-secondary close-text-btn" onClick={onClose}>
              {strings.detail.closeButton || "닫기"}
            </button>
            <button className="btn btn-danger delete-btn" onClick={handleDelete}>
              <Trash2 size={18} /> {strings.detail.deleteButton}
            </button>
          </div>
          <button className="btn btn-primary share-btn" onClick={() => onExport(log)}>
            <Share2 size={18} /> {strings.detail.shareButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetail;
