import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useStore from '../store/useStore';
import { Edit2, Save, Navigation } from 'lucide-react';
import { strings } from '../constants/strings';
import './OceanView.css';

const OceanView = () => {
  const logs = useStore((state) => state.logs);
  const savePosition = useStore((state) => state.savePosition);
  const _hasHydrated = useStore((state) => state._hasHydrated);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [temporaryPositions, setTemporaryPositions] = useState({});
  const containerRef = useRef(null);
  const oceanContentRef = useRef(null);

  // 1. 수심 추적 로직 (윈도우 스크롤 추적)
  const { scrollYProgress } = useScroll();

  // 수심 수치 계산 (0m ~ 40m)
  const [currentDepth, setCurrentDepth] = useState(0);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setCurrentDepth(Math.round(v * 40));
    });
  }, [scrollYProgress]);

  // 수심바 포인터 위치 계산
  const pointerY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  if (!_hasHydrated) return null;

  const toggleEditMode = () => {
    if (isEditMode) {
      Object.keys(temporaryPositions).forEach((id) => {
        savePosition(id, temporaryPositions[id]);
      });
      setIsEditMode(false);
      setTemporaryPositions({}); 
    } else {
      setIsEditMode(true);
    }
  };

  const handleDragEnd = (id, currentXPercent, currentYPercent, info) => {
    // 드래그 거리를 컨테이너 크기 대비 %로 변환
    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = oceanContentRef.current?.clientHeight || window.innerHeight;
    
    const deltaXPercent = (info.offset.x / width) * 100;
    const deltaYPercent = (info.offset.y / height) * 100;

    let newX = Math.max(5, Math.min(85, currentXPercent + deltaXPercent));
    let newY = Math.max(5, Math.min(95, currentYPercent + deltaYPercent));

    setTemporaryPositions(prev => ({
      ...prev,
      [id]: { x: newX, y: newY }
    }));
  };

  return (
    <div className="ocean-exploration-wrapper" ref={containerRef}>
      {/* 2. 동적 수심바 (Depth Bar) */}
      <div className="depth-bar-container">
        <div className="depth-line">
          <motion.div 
            className="depth-pointer"
            style={{ top: pointerY }}
          >
            <div className="depth-label">
              <span className="depth-value">{currentDepth}</span>
              <span className="depth-unit">m</span>
            </div>
            <Navigation className="pointer-icon" size={12} fill="currentColor" />
          </motion.div>
        </div>
        <div className="depth-markers">
          <span>0m</span>
          <span>20m</span>
          <span>40m</span>
        </div>
      </div>

      {/* 3. 실제 바다 콘텐츠 영역 (탐험 가능하도록 길게 설정) */}
      <div className="ocean-content" ref={oceanContentRef}>
        <button 
          className={`edit-mode-btn ${isEditMode ? 'active glass-panel' : 'glass-panel'}`}
          onClick={toggleEditMode}
          style={{ position: 'fixed', top: '100px', right: '20px' }} // 뷰포트 고정
        >
          {isEditMode ? <Save size={16} /> : <Edit2 size={16} />}
          <span>{isEditMode ? strings.ocean.saveLayout : strings.ocean.editLayout}</span>
        </button>

        {logs.map((log) => {
          const rawX = temporaryPositions[log.id]?.x ?? log.creature_position?.x;
          const rawY = temporaryPositions[log.id]?.y ?? log.creature_position?.y;
          
          let posX = (rawX !== undefined && rawX !== null && !isNaN(rawX)) ? rawX : 50;
          let posY = (rawY !== undefined && rawY !== null && !isNaN(rawY)) ? rawY : 50;

          return (
            <motion.div
              key={`${log.id}-${posX}-${posY}`}
              className={`creature-wrapper ${isEditMode ? 'editing' : ''}`}
              style={{ 
                position: 'absolute',
                left: `${posX}%`, 
                top: `${posY}%`,
                transform: 'none'
              }}
              drag={isEditMode}
              dragMomentum={false}
              dragElastic={0}
              onDragEnd={(e, info) => handleDragEnd(log.id, posX, posY, info)}
            >
              <div className={`creature-icon ${log.category.toLowerCase()}`}>
                {log.earned_creature}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OceanView;
