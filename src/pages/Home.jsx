import React, { useState } from 'react';
import OceanView from '../components/OceanView';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import List from './List';
import { useNavigate } from 'react-router-dom';
import { Settings, Save, X, List as ListIcon, Waves } from 'lucide-react';
import { strings } from '../constants/strings';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [viewMode, setViewMode] = useState('ocean'); // 'ocean' or 'list'

  // Swipe Detection Logic
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const handleTouchStart = (e) => {
    // 버튼이나 입력창 클릭 시에는 스와이프 발동 안함
    if (e.target.closest('button') || e.target.closest('input')) return;
    
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // 초기화
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === 0) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 100; // 최소 거리

    if (swipeDistance > minSwipeDistance) {
      // Left Swipe (Left scroll) -> List View
      if (viewMode === 'ocean') {
        setViewMode('list');
      }
    } else if (swipeDistance < -minSwipeDistance) {
      // Right Swipe (Right scroll) -> Add Log or Ocean View
      if (viewMode === 'list') {
        setViewMode('ocean');
      } else {
        navigate('/new');
      }
    }
    
    // 리셋
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleSaveName = () => {
    setUserName(tempName);
    setIsModalOpen(false);
  };

  return (
    <div 
      className="home-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="header glass-panel" style={{ position: 'fixed', top: '1.25rem', left: '1.25rem', right: '1.25rem', margin: 0, zIndex: 1100, width: 'calc(100% - 2.5rem)' }}>
        <div className="header-top-row">
          <div className="title-row">
            <h1>{userName}님의 {viewMode === 'ocean' ? '바다' : '로그'}</h1>
            <button className="settings-btn" onClick={() => { setTempName(userName); setIsModalOpen(true); }}>
              <Settings size={20} />
            </button>
          </div>
          <button className="view-toggle-btn" onClick={() => setViewMode(viewMode === 'ocean' ? 'list' : 'ocean')}>
            {viewMode === 'ocean' ? <ListIcon size={20} /> : <Waves size={20} />}
            <span>{viewMode === 'ocean' ? '리스트' : '오션'}</span>
          </button>
        </div>
        <p>{viewMode === 'ocean' ? strings.home.subtitle : '기록된 다이빙 목록입니다.'}</p>
      </div>
      
      {viewMode === 'ocean' ? <OceanView /> : <List />}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content glass-panel"
              initial={{ scale: 0.9, opacity: 0, y: -20, x: '-50%' }}
              animate={{ scale: 1, opacity: 1, y: -50, x: '-50%' }}
              exit={{ scale: 0.9, opacity: 0, y: -20, x: '-50%' }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
