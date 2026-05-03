export const strings = {
  home: {
    title: "내 바닷속 친구들",
    subtitle: "로그를 추가해 바닷속 친구들을 불러와 보세요!",
  },
  list: {
    title: "다이빙 로그",
    divesCount: (count) => `${count}개의 다이빙 기록`,
    noLogs: "아직 로그가 없네요. 첫 다이빙을 기록해 보세요!",
    recordButton: "다이빙 기록하기",
  },
  create: {
    title: "다이빙 기록",
    category: "카테고리",
    date: "날짜",
    location: "장소",
    locationPlaceholder: "예: 제주도 서귀포",
    maxDepth: "최대 수심 (m)",
    depthPlaceholder: "예: 25",
    scuba: {
      pressureTitle: "공기압 (bar)",
      start: "시작",
      end: "종료",
      consumption: (val) => `공기 소모량: ${val} bar`,
    },
    freediving: {
      title: "프리다이빙 상세",
      relaxTime: "릴렉스 타임 (초)",
      equalization: "이퀄라이징",
      eqOptions: {
        good: "양호",
        leftFail: "왼쪽 귀 실패",
        rightFail: "오른쪽 귀 실패",
      },
    },
    training: {
      title: "드라이 트레이닝 상세",
      focus: "훈련 집중 항목",
      duration: "훈련 시간 (분)",
      focusOptions: {
        apnea: "무호흡 (STA/DYN)",
        stretching: "스트레칭",
        cardio: "유산소 / 수영",
      },
    },
    saveButton: "로그 저장",
  },
  ocean: {
    editLayout: "배치 편집",
    saveLayout: "배치 저장",
  },
  export: {
    saveImage: "이미지 저장",
    discovered: "발견한 생물",
    brandName: "Log-ing",
    brandTagline: "나만의 깊은 바다 여정",
    stats: {
      maxDepth: "최대 수심",
      airConsumed: "공기 소모량",
      relaxTime: "릴렉스 타임",
      focus: "집중 항목",
      duration: "훈련 시간",
    },
  },
  detail: {
    title: "로그 상세",
    closeButton: "닫기",
    exportButton: "로그 내보내기",
    shareButton: "로그 공유하기",
    shareSuccess: "링크가 클립보드에 복사되었습니다.",
    shareFail: "공유하기를 지원하지 않는 브라우저입니다.",
    deleteButton: "로그 삭제",
    deleteConfirm: "정말로 이 로그를 삭제하시겠습니까? 삭제된 로그는 복구할 수 없습니다.",
  },
  profile: {
    title: "내 프로필",
    login: "로그인",
    logout: "로그아웃",
    editName: "이름 수정",
    saveName: "이름 저장",
    namePlaceholder: "이름을 입력하세요",
    welcome: (name) => `${name}님, 환영합니다!`,
  }
};
