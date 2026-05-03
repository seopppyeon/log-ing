import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 좌표 보정 및 최초 1회 랜덤 생성 안전장치
const sanitizePosition = (pos) => {
  // 좌표가 아예 없거나 숫자가 아니면 랜덤하게 최초 1회 생성 (0~90%)
  if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number' || isNaN(pos.x) || isNaN(pos.y)) {
    return { 
      x: Math.floor(Math.random() * 90), 
      y: Math.floor(Math.random() * 90) 
    };
  }

  // 기존 px 데이터(100 초과) 복구 및 범위 제한
  let newX = pos.x > 100 ? Math.floor(Math.random() * 90) : pos.x;
  let newY = pos.y > 100 ? Math.floor(Math.random() * 90) : pos.y;
  
  newX = Math.max(0, Math.min(90, newX));
  newY = Math.max(0, Math.min(90, newY));
  
  return { x: newX, y: newY };
};

const initialLogs = [
  {
    id: 'dummy-1',
    date: '2026-04-20',
    category: 'Freediving',
    location: 'Jeju Island',
    max_depth: 15,
    earned_creature: 'whale',
    creature_position: { x: 30, y: 40 }
  },
  {
    id: 'dummy-2',
    date: '2026-04-25',
    category: 'Scuba',
    location: 'Okinawa',
    max_depth: 25,
    earned_creature: 'nemo',
    creature_position: { x: 60, y: 20 }
  }
];

const useStore = create(
  persist(
    (set) => ({
      userName: "다이버",
      logs: initialLogs,
      _hasHydrated: false, // Hydration 상태 확인용

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setUserName: (name) => set({ userName: name }),

      addLog: (log) => set((state) => ({ 
        logs: [...state.logs, { 
          ...log, 
          creature_position: sanitizePosition(log.creature_position) 
        }] 
      })),
      
      savePosition: (id, position) => set((state) => ({
        logs: state.logs.map(log => 
          String(log.id) === String(id) 
            ? { ...log, creature_position: sanitizePosition(position) } 
            : log
        )
      })),

      deleteLog: (id) => set((state) => ({
        logs: state.logs.filter(log => String(log.id) !== String(id))
      })),
    }),
    {
      name: 'log-ing-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      }
    }
  )
);

export default useStore;
