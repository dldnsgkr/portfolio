// History.tsx 에서 내용 그대로 분리했다. 문장·수치·기간은 손대지 않는다.
// 배열 순서도 원본 그대로다 — 시간순 정렬은 렌더링 시점에 한다.
export type HistoryItem = {
  date: string;
  title: string;
  description?: string;
};

export const historyData: HistoryItem[] = [
  {
    date: "2014 ~ 2021",
    title: "골프 선수 준비",
    description:
      "약 7년간 골프 선수로 활동하며 목표를 향해 꾸준히 훈련하고, 자기 관리와 집중력을 기르는 경험을 쌓았습니다.",
  },
  {
    date: "2022.06 ~ 2023 초",
    title: "국비지원학원 풀스택 과정 수료",
    description:
      "웹 개발 전반에 대한 이론과 실습을 통해 프론트엔드를 중심으로 백엔드의 기본 개념까지 함께 익히고, 팀 프로젝트를 통해 개발 흐름과 협업 경험을 쌓았습니다.",
  },
  {
    date: "2023.02 ~ 2024.01",
    title: "SNK (safekorea)",
    description:
      "Chart.js를 활용하여 웹뷰에 표시되는 차트 기능을 구현했으며, Spring Boot 기반 자사 솔루션에서 데이터 처리 관련 스크립트를 수정·개선했습니다. 또한 CentOS, Ubuntu 환경에서 DB 서버를 구성하고 MySQL 및 PostgreSQL의 백업 스크립트와 운영 흐름을 구축했으며, Python을 활용한 데이터 크롤링 작업을 수행했습니다.",
  },
  {
    date: "2026.02",
    title: "학점은행제 학사 과정 수료",
    description: "학점은행제를 통해 컴퓨터공학 학사 과정을 수료했습니다.",
  },
  {
    date: "2024.03 ~ 2026.04",
    title: "CY",
    description:
      "React, Next.js, TypeScript를 기반으로 프론트엔드 개발을 담당했으며, 다양한 프로젝트(Heartfield, Hecto Financial, Etevers, 엔지니어링공제, SRT 등)에 참여하여 사용자 인터페이스 구현 및 서비스 기능 개발을 수행했습니다.",
  },
  {
    date: "2026.03 ~",
    title: "동양미래대학교 야간 학사 과정 재학",
    description:
      "추가적인 학습을 위해 야간 학사 과정에 재학 중이며, 동아리 활동을 통해 백엔드 기술(Spring Boot)을 학습하며 프론트엔드 중심에서 풀스택 역량으로 확장하고 있습니다.",
  },
];
