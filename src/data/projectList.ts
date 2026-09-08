import type { ProjectWrapperType } from "@/types/projectList.types";
import chart1 from "@/assets/image/chart1.png";
import chart2 from "@/assets/image/chart2.png";
import chart3 from "@/assets/image/chart3.png";
import chart4 from "@/assets/image/chart4.png";
import heartField1 from "@/assets/image/heartfield1.png";
import eclectic1 from "@/assets/image/eclectic1.png";
import eclectic2 from "@/assets/image/eclectic2.png";
import stockSignal1 from "@/assets/image/stocksignal1.png";
import stockSignal2 from "@/assets/image/stocksignal2.png";
import stockSignal3 from "@/assets/image/stocksignal3.png";
import stockSignal4 from "@/assets/image/stocksignal4.png";

export const projectListData: ProjectWrapperType[] = [
  {
    title: "SmartKeeper 어플리케이션 개발",
    description: "자회사의 webview에 사용될 화면 개발",
    contentText: [
      "html + chart.js를 활용한 차트 작업",
      "ajax를 활용해 동적으로 데이터를 받아와 처리하는 작업",
      "막대 차트 및 도넛, 라인등의 여러 혼합차트 작업",
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
      "selenium을 활용한 크롤링 작업",
      "크롤링한 데이터를 가공하여 엑셀로 저장하는 작업.",
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
    period: {
      start: "2024.06",
      end: "2025.12",
    },
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
      "상품 수주·발주 관리 시스템으로, Etevers 사내에서 실무자의 주문 처리 및 재고 관리를 효율화하기 위해 구축된 내부 운영 웹 애플리케이션",
    period: {
      start: "2025.02",
      end: "2025.09",
    },
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
        title: "동적 grid 조작",
        content:
          "전자정부 프레임워크와 exBuilder 환경에 익숙하지 않은 상태에서, Grid의 기본 구조가 사전에 정의된 data field와 header를 기반으로 동작하는 점 때문에 동적인 데이터에 따라 row 병합 및 그룹 구조를 변경해야 하는 요구사항을 구현하는 데 어려움이 있었습니다. 공식 문서와 레퍼런스가 부족해 Grid 설정만으로는 해결이 어려웠고, exBuilder에서 제공하는 함수들을 직접 분석하고 다양한 케이스를 테스트하며 값을 적용해보는 방식으로 동적 병합 및 그룹 처리 로직을 구현했습니다.",
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
    title: "LiRouti (리루티)",
    description:
      "UMC 팀 프로젝트(5인)로 개발한 챌린지·루틴 인증 기반 캐릭터 육성 서비스. 백엔드에서 챌린지·인증·재화 도메인을 담당하고, 운영 백오피스를 단독으로 설계·개발",
    period: {
      start: "2026.07",
    },
    deployLink: "https://lirouti-backoffice.vercel.app/",
    contentText: [
      "5인 백엔드 팀에서 챌린지·그룹/개인 인증 도메인을 담당하고, 이후 상점·재화·결제·캐릭터 영역까지 확장",
      "챌린지 조회 API 구현 — 커서 기반 무한스크롤, 카테고리 필터, 검색, 상세, 참여·이탈 및 스트릭 처리",
      "사진 인증 도메인 구현 — 인증 피드(최신순·좋아요순), 좋아요, 신고, 메모 수정, 삭제 후 재인증, 주기(매일·매주·매월) 기준 인증 제한 및 스트릭 집계",
      "OpenAI 기반 인증 사진 AI 심사 — 판정 5단계 분리, 심사 불가 시 보류(PENDING) 후 재심사, 킬 스위치 분리",
      "S3 presigned URL 미디어 업로드 인프라 구축 — 업로드된 실제 바이트 검증, 비공개 인증 사진 서명 URL 조회",
      "재화 지갑(잔액 + 거래 원장) 및 포트원 결제 연동 충전, 아바타 아이템 구매·착용, 캐릭터 해금 엔진과 판정기 구현",
      "Redis 기반 전역 요청 빈도 제한(rate limit) 메커니즘 도입 및 용도별 정책 분리",
      "JMeter 부하 테스트 + Prometheus·Grafana 모니터링 구성으로 조회 API 기준선 측정 환경 구축",
      "GitHub Actions에서 arm64 이미지를 빌드해 GHCR에 push하고, EC2(t4g.small) 단일 인스턴스가 pull만 하는 배포 파이프라인 구성 (2GB 메모리 보호를 위해 서버 빌드 배제)",
      "운영 백오피스를 단독 개발 — React 19 + Panda CSS 기반 화면 53개, 2단계 인증(TOTP)·감사 로그·신고 처리·회원/아이템/챌린지 관리·CSV 내보내기·⌘K 커맨드 팔레트 구현",
      "백오피스는 mock 데이터를 API 파사드 뒤에 둔 퍼블리싱 단계까지 완료해 Vercel에 배포(배포 링크)했으며, 운영 요구사항 회의를 거쳐 실 API 연동과 고도화를 진행할 예정",
    ],
    stackList: [
      "java21",
      "spring boot",
      "spring security",
      "jpa",
      "querydsl",
      "mysql",
      "redis",
      "flyway",
      "docker",
      "aws ec2",
      "aws s3",
      "github actions",
      "jmeter",
      "grafana",
      "react19",
      "typescript",
      "panda css",
      "tanstack-query",
      "zustand",
      "recharts",
    ],
    troubleShooting: [
      {
        title: "외부 AI 심사 실패 시 fail-open의 한계 — 보류 상태 도입",
        content:
          "인증 사진 AI 심사기가 응답하지 못할 때 그대로 통과시키는 fail-open 정책을 쓰고 있었습니다. 외부 API 하나가 인증 기능 전체를 멈추게 하지 않는다는 근거는 있었지만, 선택지가 '전부 통과'와 '전부 차단' 둘뿐이라는 문제가 있었습니다. 그 사이에 보류(PENDING) 상태를 두어, 일시적 실패는 승격하지 않고 대기 prefix에 저장한 뒤 복구되면 재심사하도록 했습니다. 노출 경로(공개 피드·게시글 수)에서는 제외하되 본인 조회와 스트릭에는 포함시키고, 제외 조건을 한 곳(VerificationQuerySupport)에 모아 여러 조회에서 규칙이 갈라지지 않게 했습니다.",
      },
      {
        title: "좋아요순 정렬의 커서 페이지네이션 — 복합 커서 설계",
        content:
          "최신순은 id 하나로 커서를 잡을 수 있었지만, 좋아요순은 좋아요 0개인 데이터가 대부분이라 값이 겹쳐 '어디까지 봤는지'를 가릴 수 없었습니다. 커서를 (좋아요 수, id) 조합으로 바꾸고, 집계값 기준이므로 where가 아닌 having으로 걸러 다음 페이지를 잘라냈습니다. 정렬 키가 실시간으로 변하는 데이터라 경계 항목의 중복·누락을 완전히 없앨 수는 없어, offset 대비 영향 범위가 경계 근처로 한정되는 커서 방식을 택하고 근사 정렬임을 API 문서에 명시했습니다.",
      },
      {
        title: "다중 아이템 구매의 멱등성이 지갑 차감에만 걸려 있던 문제",
        content:
          "멱등 키가 지갑 차감에만 적용되어 있어, 성공 후 정상 재시도가 '이미 보유' 오류로 보이고, 같은 키로 다른 장바구니를 보내면 보유 행만 생기고 차감은 replay되어 아이템이 무료로 지급되는 구멍이 있었습니다. 구매를 1급 레코드(avatar_purchase)로 승격시켜 멱등을 구매 단위로 옮기고, 장바구니를 정렬·결합해 SHA-256으로 fingerprint를 만들어 같은 키·다른 장바구니는 409로 거절하도록 했습니다. 회원 행을 FOR UPDATE로 선점한 뒤 분기하고, (회원, 키) 유니크 제약을 최종 방어선으로 남겼습니다.",
      },
      {
        title: "요청 빈도 제한이 용도를 구분하지 못하던 문제",
        content:
          "인증 사진과 프로필 사진이 presign 발급 예산 하나를 나눠 써서, 프로필을 몇 번 바꾼 것 때문에 정작 인증이 막힐 수 있었습니다. 용도(purpose) 값은 요청 본문에 있는데 기존 rate limit은 본문을 읽기 전에 도는 인터셉터에 있어 정책을 고를 수 없었습니다. 소진 판정을 RateLimitGuard로 분리해 본문이 이미 파싱된 서비스 계층에서도 호출할 수 있게 하고, 인증 계열은 정책을 공유하되 성격이 다른 프로필만 떼어냈습니다. 덤으로 소진 시점이 형식·용량 검증 뒤로 내려가, 400·413으로 끝날 요청이 예산을 깎지 않게 됐습니다.",
      },
      {
        title: "시드 마이그레이션이 AUTO_INCREMENT가 잡은 id를 덮어쓴 사고",
        content:
          "아이템 시드가 '시드 파일의 최대 id 다음'을 기준으로 id를 붙이면서, 앞선 마이그레이션이 AUTO_INCREMENT로 만든 업적 보상 전용 아이템 다섯 행을 덮어썼습니다. INSERT가 중복 키에 걸려 UPDATE로 넘어가는 바람에 비매품(price=0, active=false)이 판매 상품으로 바뀌어, 업적으로만 얻어야 할 한정 의상을 누구나 살 수 있는 상태였습니다. id는 환경마다 다르므로(개발 22~26, 로컬 184~188) 시드가 건드리지 않는 item_code로 조인해 복구하고, 시드가 만든 고아 행까지 함께 정리했습니다.",
      },
      {
        title: "디자인 원본(.dc.html)을 백오피스 SPA로 이관",
        content:
          "디자인 원본이 파일 이동(location.href) 기반 멀티페이지에 스타일은 전부 인라인 문자열, 목록 필터는 컴포넌트 state로 되어 있어 새로고침·뒤로가기·URL 공유가 불가능했습니다. 라우팅은 react-router 클라이언트 라우팅으로, 필터는 useSearchParams로 옮기고, 43개 CSS 변수 2세트(light/dark)를 Panda의 semanticTokens로 1:1 이관했습니다. 규칙을 문서에만 두면 새어 나가므로 레이어 의존 방향·선언 순서·디자인 토큰 명암비(WCAG AA)·토큰 실재 여부·주석 규약을 전부 lint 스크립트로 강제했습니다.",
      },
    ],
  },
  {
    title: "Newsift",
    description:
      "UMC에서 만난 팀원들과 함께(팀명: 502) 개발한 AI 뉴스 큐레이터 앱으로, speckit·pre-commit·Taskfile·CLAUDE.md 기반 개발 하네스 엔지니어링을 중점으로 진행한 프로젝트",
    period: {
      start: "2026.06",
    },
    contentText: [
      "RSS·Naver API 기반 뉴스 수집 파이프라인 구현",
      "이메일 인증 2단계 회원가입, JWT 발급, 소셜 OAuth(Kakao·Google·Apple) 연동",
      "3-factor 랭킹 + keyset 커서 페이지네이션 기반 개인화 피드 구현",
      "pg_bigm 유사도 기반 기사 검색 + 기사 저장(멱등 save/unsave, 1000건 상한) 구현",
      "AWS Polly 기반 기사 TTS 비동기 생성·S3 저장·데일리 브리핑 큐 구현",
      "GitHub Actions CI/CD 파이프라인 구성 및 EC2 배포 자동화",
      "speckit(spec·plan·tasks 문서화 도구), pre-commit 훅, Taskfile, CLAUDE.md를 조합한 개발 하네스 구축으로 팀 전체 워크플로우 표준화",
      "프론트 초기 라우팅·인증 골격 설계 — 가드 5종(ProtectedRoute·GuestOnlyRoute·GateRoute·AdminRoute·AuthShell), 역할 기반 레이아웃(User GNB / Admin Sidebar) 분리, 토큰 갱신 구조 수립",
    ],
    stackList: [
      "spring boot",
      "java",
      "spring security",
      "jpa",
      "postgresql",
      "flyway",
      "aws s3",
      "aws polly",
      "gemini",
      "react",
      "typescript",
      "react-router-dom",
      "zustand",
    ],
    troubleShooting: [
      {
        title: "소셜 신규 가입 시 약관 동의 수집 흐름 설계",
        content:
          "소셜 로그인으로 신규 가입하는 사용자의 경우, OAuth 콜백 직후 바로 JWT를 발급하면 약관 동의를 수집할 수 없는 문제가 있었습니다. 이를 해결하기 위해 콜백 시점에 정식 JWT 대신 pending-token을 발급하고, 프론트에서 약관 동의 화면을 거친 뒤 /complete 엔드포인트를 호출해 정식 JWT를 발급하는 2단계 플로우로 전환했습니다.",
      },
      {
        title: "공통 응답 형태 통일 및 테스트 대응",
        content:
          "각 엔드포인트마다 응답 구조가 달라 프론트와의 인터페이스가 불일치하는 문제가 있었습니다. ApiResponse<T> 래퍼(code·status·message·data 4-필드)로 전체 응답 형태를 통일하고, 기존 통합 테스트의 응답 파싱 로직도 일괄 수정하여 CI가 안정적으로 통과되도록 했습니다.",
      },
    ],
  },
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
      {
        title: "typescript 7 경로 설정 이슈",
        content:
          "TypeScript 7 환경에서 기존에 사용하던 경로 alias 설정이 정상적으로 동작하지 않는 문제를 겪었습니다.원인은 baseUrl 없이 paths를 사용하면서 ts-node 실행 시 런타임에서 모듈을 해석하지 못한 데 있었습니다. tsconfig.json에서 rootDir를 명확히 지정하고, tsconfig-paths를 적용하고, paths를 src 기준으로 재정의하여 컴파일 타임과 런타임 모두에서 모듈 alias가 일관되게 해석되도록 설정을 수정했습니다.",
      },
    ],
  },
  {
    title: "Stock Signal",
    description:
      "미국·한국 주식 시장 데이터를 자동 수집하고 5가지 팩터 스코어링 엔진으로 BUY/WATCH/AVOID 투자 시그널을 생성하는 분석 플랫폼",
    period: {
      start: "2026.05",
    },
    imageList: [stockSignal1, stockSignal2, stockSignal3, stockSignal4],
    deployLink: "https://stock-signal-frontend-two.vercel.app/",
    contentText: [
      "Claude Code를 활용한 바이브 코딩 방식으로 개발",
      "Turborepo 기반 모노레포 구조로 Next.js 프론트엔드, NestJS REST API, FastAPI 분석 서비스 3개 앱 설계 및 구축",
      "yfinance 주가 수집, VADER 감성 분석 기반 뉴스 처리, 재무지표·거시경제 데이터 수집 파이프라인 구현",
      "RSI, MACD, 볼린저 밴드 등 고급 기술 지표를 포함한 기술적(35%), 기본적(25%), 뉴스(20%), 거시경제(10%), 플로우(10%) 5팩터 스코어링 엔진으로 시그널 생성",
      "BullMQ 기반 비동기 잡 큐 아키텍처(8개 큐)로 데이터 수집·시그널 생성·성과 평가 파이프라인 자동화",
      "미국(17:30 ET)·한국(16:30 KST) 장 마감 후 NestJS @Cron 스케줄러로 전체 파이프라인 자동 실행",
      "한국 시장(KOSPI/KOSDAQ) 종목 자동 동기화 및 한국어 뉴스 감성 분석 파이프라인 구현",
      "시그널마다 투자 이유 5개 자동 생성 및 신뢰도(5~95%) 산출",
    ],
    stackList: [
      "next.js",
      "typescript",
      "nestjs",
      "fastapi",
      "python",
      "postgresql",
      "redis",
      "prisma",
      "bullmq",
      "turborepo",
      "tailwindcss",
      "echarts",
      "docker",
    ],
    troubleShooting: [
      {
        title: "장기 실행 배치 잡의 BullMQ Lock 만료 문제",
        content:
          "데이터 수집 배치 잡이 실행 도중 Lock이 만료되어 동일 잡이 중복 실행되는 문제가 발생했습니다. 주가·뉴스·재무 데이터를 순차 수집하는 파이프라인 특성상 단일 잡이 5분 이상 소요되는 경우가 있었기 때문입니다. Lock duration을 5분으로 설정하고 2분마다 갱신하는 방식으로 장기 실행 잡에서도 중복 실행 없이 안정적으로 처리되도록 개선했습니다.",
      },
      {
        title: "Feature Engineering 시 데이터 부족 구간 처리",
        content:
          "이동평균(MA20/MA60) 및 모멘텀 지표 계산 시 상장 초기 종목이나 데이터 수집 직후 종목에서 NaN·Inf 값이 발생해 스코어 계산이 중단되는 문제가 있었습니다. 최소 20일치 가격 데이터를 보유한 종목만 분석 대상으로 제한하고, 피처 추출 단계에서 NaN·Inf를 안전하게 처리하는 가드 로직을 추가하여 안정적인 스코어 산출이 가능하도록 개선했습니다.",
      },
      {
        title: "모노레포 환경에서 서비스 간 타입 공유",
        content:
          "Next.js, NestJS 두 TypeScript 서비스가 동일한 도메인 타입(주식, 추천, 성과)을 각자 정의하면서 타입 불일치 문제가 반복됐습니다. shared-types 패키지를 pnpm workspace 내에 별도로 구성하고 두 앱이 공통 타입을 import하도록 구조를 변경하여 타입 일관성을 확보하고 중복 정의를 제거했습니다.",
      },
      {
        title: "VADER가 지원하지 않는 한국어 뉴스 감성 분석",
        content:
          "영문 뉴스에 사용하던 VADER 감성 분석기가 한국어를 지원하지 않아 한국 시장 뉴스에 적용할 수 없었습니다. 금융·증시 도메인에 특화된 긍정(49개)·부정(22개) 한국어 키워드 사전을 직접 구성하고, 뉴스 제목·본문에서 키워드 빈도를 기반으로 감성 점수를 산출하는 방식으로 해결했습니다.",
      },
    ],
  },
  {
    title: "UMC Practice Project",
    description:
      "UMC 스터디 기간중 학습과 함께 응용 하면서 작업한 프로젝트입니다.",
    contentText: [
      "react, spring boot를 이용한 풀스택 프로젝트",
      "spring boot 파트를 학습하는 용도로 제공된 figma 기반으로 front 추가 작업",
    ],
    imageList: [],
    stackList: [
      "react19",
      "javascript",
      "typescript",
      "framer-motion",
      "spring boot",
      "java",
      "JPA",
      "mysql",
    ],
    troubleShooting: [
      {
        title: "framer-motion을 활용한 전반적인 UI 전환",
        content: "",
      },
      {
        title: "공통 stack형 modal 구조 설립",
        content:
          "기존에 zustand로 전체 상태관리 했는데 provider, context를 써서 처음으로 stack형 modal 구조 작성",
      },
    ],
  },
];
