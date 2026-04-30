import React, { useState } from 'react';
import OceanView from '../components/OceanView';
import useStore from '../store/useStore';
import { Settings, Save, X } from 'lucide-react';
import { strings } from '../constants/strings';
import './Home.css';

const Home = () => {
  const { userName, setUserName } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSaveName = () => {
    setUserName(tempName);
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <div className="header glass-panel" style={{ position: 'fixed', top: '1.25rem', left: '1.25rem', right: '1.25rem', margin: 0, width: 'calc(100% - 2.5rem)' }}>
        <div className="title-row">
          <h1>{userName}님의 바다</h1>
          <button className="settings-btn" onClick={() => { setTempName(userName); setIsModalOpen(true); }}>
            <Settings size={20} />
          </button>
        </div>
        <p>{strings.home.subtitle}</p>
      </div>
      <OceanView />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h3>이름 수정</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="input-field"
                placeholder="다이버 이름 입력"
                autoFocus
              />
              <button className="btn btn-primary save-btn" onClick={handleSaveName}>
                <Save size={18} style={{ marginRight: '8px' }} />
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
