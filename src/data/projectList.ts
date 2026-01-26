import type { ProjectWrapperType } from "@/types/projectList.types";
import chart1 from "@/assets/image/chart1.png";
import chart2 from "@/assets/image/chart2.png";
import chart3 from "@/assets/image/chart3.png";
import chart4 from "@/assets/image/chart4.png";

export const projectListData: ProjectWrapperType[] = [
  {
    title: "SmartKeeper 어플리케이션 개발",
    description: "자회사의 webview에 사용될 화면 개발",
    contentText: [
      "html + chart.js를 활용한 차트 작업",
      "ajax를 활용해 동적으로 데이터를 받아와 처리하는 작업",
      "막대 차트 및 도넛, 라인등의 여러 혼합차트를 작업 했습니다",
    ],
    imageList: [chart1, chart2, chart3, chart4],
    stackList: ["html", "css", "chart.js", "javascript"],
    troubleShooting: [
      {
        title: "x축 0과 맞닿아 있지 않는 bar 차트",
        content:
          "요구사항 중 심박수를 표출하는 부분이 있었는데 이 때문에 bar 형태로 생겼지만 공중에 떠있는 듯한 UI가 필요했습니다. 이에 중첩 bar chart를 이용해서 보여져야할 데이터 기반으로 dummy로 1층을 쌓고 2층에 실제 수치를 표기 하는 방법을 채택했습니다.",
      },
    ],
  },
  {
    title: "중소기업기술정보진흥원 지능형 추천시스템 개발",
    description: "웹 크롤링 기반 데이터 수집 및 가공 자동화",
    contentText: [
      "selenium을 활용한 크롤링 작업을 했습니다.",
      "크롤링한 데이터를 가공하여 엑셀로 저장하는 작업을 했습니다.",
    ],
    stackList: ["python", "selenium"],
    troubleShooting: [
      {
        title: "",
        content: "",
      },
    ],
  },
  {
    title: "HeartField",
    description: "첫번째 정식 main project(webview)",
    contentText: [
      "next.js 기반 web view 화면 작업했습니다.",
      "toss payments, kgmobiliance(결제 및 본인인증) 연동 작업했습니다.",
    ],
    stackList: [
      "tosspaymentsSDK",
      "next.js",
      "typescript",
      "swr",
      "zustand",
      "tailwindcss",
    ],
    troubleShooting: [
      {
        title: "",
        content: "",
      },
    ],
  },
  {
    title: "Hectofinancial",
    description: "시작부터 함께한 첫 프로젝트",
    contentText: [
      "react 기반의 공통컴포넌트 구축 작업을 했습니다.",
      "UI 특성 별로 layout component를 구분",
    ],
    stackList: [
      "next.js",
      "typescript",
      "swr",
      "zustand",
      "tailwindcss",
      "shadcn",
      "react-hook-form",
      "zod",
      "react-quill",
    ],
  },
  {
    title: "etevers",
    description: "",
    contentText: ["react 기반의 공통컴포넌트 구축 작업을 했습니다."],
    stackList: [
      "react",
      "typescript",
      "tanstack-router",
      "tanstack-query",
      "zustand",
      "tailwindcss",
      "shadcn",
      "react-hook-form",
      "zod",
      "react-quill",
      "axios",
      "framer-motion",
      "ag-grid",
    ],
  },
  {
    title: "엔지니어링공제",
    description: "전자정부 프레임워크 첫 경험",
    contentText: [
      "exbuilder라는 전자정부 프레임워크를 사용해 퍼블리싱 및 공통 컴포넌트 작업을 했습니다.",
    ],
    stackList: ["java", "exbuilder", "javascript(es5)"],
  },
  {
    title: "SRT",
    description: "퍼블리싱 및 svg를 극한으로 활용",
    contentText: [
      "SVG를 활용해 SRT 노선도를 그려봤습니다.",
      "순수 html, js, css 만을 사용해서 작업했습니다.",
      "웹 접근성(공공기관 기준)을 준수하여 작업했습니다.",
      "퍼블리싱 된 html 화면을 jsp로 변환 및 백엔드(spring boot)와 연동 작업을 했습니다.",
    ],
    stackList: ["html", "css", "javascript", "ajax", "java", "spring boot"],
  },
];

export const toyProjectListData: ProjectWrapperType[] = [
  {
    title: "UPDEV",
    description: "게시판 기반 웹사이트",
    contentText: [
      "spring, mybatis 기반 백엔드 담당",
      "cookie를 이용해 자동 로그인 기능 구현",
      "기본 CRUD 기능 구현",
      "좋아요, 조회수, 댓글, 대댓글 기능 구현",
    ],
  },
];
