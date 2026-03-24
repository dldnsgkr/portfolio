import type { ProjectWrapperType } from "@/types/projectList.types";
import chart1 from "@/assets/image/chart1.png";
import chart2 from "@/assets/image/chart2.png";
import chart3 from "@/assets/image/chart3.png";
import chart4 from "@/assets/image/chart4.png";
import heartField1 from "@/assets/image/heartfield1.png";
import eclectic1 from "@/assets/image/eclectic1.png";
import eclectic2 from "@/assets/image/eclectic2.png";

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
        title: "파일 다운로드 완료 여부 체크 방식 개선",
        content:
          "파일 다운로드 완료 여부를 .crdownload 파일 체크 방식으로 판단하여 파일 손상 없이 안정적으로 후처리되도록 개선함",
      },
      {
        title: "파일명 중복 처리 로직 구현",
        content:
          "동일 파일명 및 폴더명으로 인한 덮어쓰기 문제를 방지하기 위해 자동 파일명 중복 처리 로직을 구현함",
      },
      {
        title: "크롬 드라이버 자동 설치 및 관리",
        content:
          "크롬 버전 변경에 따른 드라이버 충돌 문제를 자동 설치 방식으로 해결함",
      },
    ],
  },
  {
    title: "HeartField",
    description:
      "운동 관련 상품 판매와 사용자 간 채팅 및 소통 기능을 포함한 커머스 플랫폼",
    contentText: [
      "Next.js 기반 웹뷰 환경에서 사용자 화면(UI) 구현 및 페이지 구조 설계",
      "Toss Payments, KG모빌리언스 결제 및 본인인증 연동을 통해 결제 프로세스 기능 구현",
    ],
    imageList: [heartField1],
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
        title: "외부 결제 응답 데이터 App Router 중계 처리",
        content:
          "TossPayments, KG모빌리언스 결제 완료 후 반환되는 데이터를 Next.js App Route에서 서버 사이드로 수신하고, 검증 및 가공 과정을 거쳐 클라이언트 화면 경로로 리다이렉트하는 구조를 설계했습니다.",
      },
      {
        title: "별점 컴포넌트 반별점 및 드래그 처리 이슈",
        content:
          "별 아이콘 클릭 시 정수 단위 점수만 처리되어 사용자 입력을 세밀하게 반영하기 어려웠습니다. 이를 해결하기 위해 클릭 및 드래그 이벤트의 좌표 값을 기준으로 별의 절반 영역을 계산하여 0.5점 단위의 별점 처리를 구현했습니다.",
      },
      {
        title: "무한 스크롤 로딩 상태 처리",
        content:
          "스크롤이 끝 지점에 도달했을 때 로딩 상태를 명확히 보여주기 위해 로더를 노출하고, SWR을 통해 추가 데이터를 요청한 뒤 기존 데이터에 병합하는 방식으로 무한 스크롤을 구현했습니다.",
      },
    ],
  },
  {
    title: "Hectofinancial",
    description: "폐기물 처리 관련 서비스를 위한 사용자 및 관리자 관리 시스템",
    contentText: [
      "재사용성을 고려한 React 기반 공통 컴포넌트 설계 및 구축",
      "UI 특성에 따라 Layout 컴포넌트를 분리하여 화면 구조의 일관성과 유지보수성 개선",
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
    troubleShooting: [
      {
        title: "레이아웃 중복과 UI 관리 복잡도 문제",
        content:
          "프로젝트가 진행되면서 페이지별 UI 구조가 유사하지만 완전히 동일하지 않아, 기존 방식으로는 레이아웃 수정 시 여러 페이지를 함께 수정해야 하는 문제가 있었습니다. 이를 해결하기 위해 UI 특성에 따라 레이아웃을 컴포넌트화하고, 공통 컴포넌트를 중심으로 구조를 재설계하여 유지보수성과 재사용성을 개선했습니다.",
      },
    ],
  },
  {
    title: "etevers",
    description:
      "ERP와 연동된 상품 수주·발주 관리 시스템으로, Etevers 사내에서 실무자의 주문 처리 및 재고 관리를 효율화하기 위해 구축된 내부 운영 웹 애플리케이션",
    contentText: [
      "ag-grid 기반 데이터 테이블 UI 구현 및 custom excel export",
      "재사용 가능한 공통 컴포넌트 설계 및 폼 상태 관리 로직을 구축하여 유지보수성과 개발 효율 개선",
    ],
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
    troubleShooting: [
      {
        title: "framer-motion을 활용한 card UI 애니메이션",
        content:
          "framer-motion 라이브러리를 활용하여 카드 컴포넌트에 부드러운 진입 및 퇴장 애니메이션을 구현했습니다. 이를 통해 사용자 경험을 향상시키고, UI의 동적 변화를 자연스럽게 표현할 수 있었습니다.",
      },
      {
        title: "react-hook-form 데이터의 실시간 변경 감지 및 처리",
        content:
          "react-hook-form을 사용하여 폼 데이터의 실시간 변경을 감지하고, 데이터 변경에 따른 현 화면에 대한 상황을 즉각적으로 반영하도록 구현했습니다.",
      },
      {
        title: "filter 영역 컴포넌트의 재사용성 향상",
        content:
          "filter 영역 컴포넌트를 재사용 가능한 형태로 설계했습니다. 제일 큰 wrapper 컴포넌트를 만들고 label, input, button 등 세부 컴포넌트를 props로 받도록 구현했습니다.",
      },
    ],
  },
  {
    title: "엔지니어링공제",
    description: "단순 퍼블",
    contentText: [
      "exbuilder라는 전자정부 프레임워크를 사용해 퍼블리싱 및 공통 컴포넌트 작업을 했습니다.",
    ],
    stackList: ["java", "exbuilder", "javascript(es5)"],
    troubleShooting: [
      {
        title: "전자정부 프레임워크 적응",
        content:
          "전자정부 프레임워크의 구조와 특성에 익숙하지 않아 초기에는 어려움이 있었으나, 공식 문서와 커뮤니티 자료를 참고하여 빠르게 적응할 수 있었습니다.",
      },
    ],
  },
  {
    title: "SRT",
    description: "SRT 홈페이지 및 앱의 웹뷰 퍼블리싱",
    contentText: [
      "SVG를 활용해 SRT 노선도를 그려봤습니다.",
      "순수 html, js, css 만을 사용해서 작업했습니다.",
      "웹 접근성(공공기관 기준)을 준수하여 작업했습니다.",
      "퍼블리싱 된 html 화면을 jsp로 변환 및 백엔드(spring boot)와 연동 작업을 했습니다.",
    ],
    stackList: ["html", "css", "javascript", "ajax", "java", "spring boot"],
    troubleShooting: [
      {
        title: "SVG를 활용한 노선도 구현",
        content:
          "SVG의 다양한 요소와 속성을 활용하여 SRT 노선도를 구현했습니다. 이를 통해 복잡한 그래픽을 효과적으로 표현하고, 사용자 인터랙션을 향상시킬 수 있었습니다.",
      },
    ],
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
    stackList: ["spring", "java", "mybatis", "oracle DB"],
    troubleShooting: [],
  },
  {
    title: "Eclectic Explorations",
    description: "velog clone coding project",
    contentText: [
      "javascript 라이브러리인 koa.js를 활용한 백엔드 담당",
      "vue framework를 활용한 프론트엔드 담당",
    ],
    imageList: [eclectic1, eclectic2],
    stackList: ["koa.js", "vue", "javascript", "mysql", "scss"],
    troubleShooting: [
      {
        title: "Transtion 태그를 이용한 애니메이션 처리",
        content:
          "vue의 transition 태그를 활용하여 컴포넌트 간 전환 애니메이션을 구현했습니다. 이를 통해 사용자에게 자연스러운 UI 전환 경험을 제공할 수 있었습니다.",
      },
      // {
      //   title: "typescript 7 경로 설정 이슈",
      //   content:
      //     "TypeScript 7 환경에서 기존에 사용하던 경로 alias 설정이 정상적으로 동작하지 않는 문제를 겪었습니다.원인은 baseUrl 없이 paths를 사용하면서 ts-node 실행 시 런타임에서 모듈을 해석하지 못한 데 있었습니다. tsconfig.json에서 rootDir를 명확히 지정하고, tsconfig-paths를 적용하고, paths를 src 기준으로 재정의하여 컴파일 타임과 런타임 모두에서 모듈 alias가 일관되게 해석되도록 설정을 수정했습니다.",
      // },
    ],
  },
];
