import { motion, type Variants } from "framer-motion";

// 이름 위에 놓는 모노그램(J♠).
//
// 코너 마크(absolute + 40px 인셋)에서 흐름 안의 모노그램으로 바꿨다. 이유:
//  - 우하단 180° 반복을 없앤 뒤로는 "카드 네 귀퉁이" 구조가 성립하지 않는다.
//  - absolute 로 두면 인덱스↔이름 간격이 뷰포트 높이에 따라 13.9~57.1px 로 흔들린다.
//    흐름 안에 넣고 margin-bottom 을 고정하면 모든 폭에서 같은 간격이 나오고,
//    콘텐츠와 겹칠 여지도 사라진다.
//
// 랭크·수트 둘 다 인라인 SVG path 다. 웹폰트 글리프로 두면
//  - ♠(U+2660) 는 Pretendard·Fraunces 어디에도 없어 OS 기본 폰트로 떨어지고,
//  - 세리프 J 는 어센더가 em box 를 넘어 line-height 에 따라 잘려 보인다.

// (A) 이름 위 모노그램 / (B) 워터마크 — 이 상수 하나로 전환한다.
const INDEX_MODE: "monogram" | "watermark" = "monogram";

// Fraunces wght700 / opsz40 / SOFT0 / WONK0 의 J 를 아웃라인화한 것.
// ink bbox 에 맞춰 정규화했으므로 SVG 좌측 = 잉크 좌측(사이드베어링 0).
const RANK_VIEWBOX = "0 0 646 1000";
const RANK_PATH =
  "M611.7 793.5Q611.7 886.6 526.3 943.3Q440.8 1000 293.7 1000Q154.5 1000 77.2 947.4Q0 894.8 0 805.8Q0 746.7 32.7 710.2Q65.4 673.7 121.7 673.7Q169.3 673.7 200.5 707.4Q231.6 741.1 231.6 802.1V859.9Q231.6 895.8 249 916Q266.5 936.2 304.6 936.2Q342.9 936.2 366.4 914Q389.9 891.8 389.9 850.4Q389.9 815 373.6 783.3Q357.2 751.6 335.5 715.5Q313.7 679.4 297.4 632Q281.1 584.7 281.1 518.6V122.8Q281.1 106.1 273.4 95.5Q265.7 85 247.8 81.6L201.9 73Q184.3 69.3 176.3 60.3Q168.3 51.3 168.3 34.6Q168.3 18.3 179.3 9.1Q190.4 0 212.9 0H601.2Q624.2 0 635.1 9.1Q646 18.2 646 34.5Q646 61.9 615 72.4L581.3 81.5Q564.7 87 556 96.4Q547.3 105.8 547.3 121.3V503.5Q547.3 556.4 557.1 594.1Q566.9 631.8 579.5 662.3Q592.1 692.8 601.9 723.7Q611.7 754.6 611.7 793.5Z";

// viewBox 를 ink 경계(x 12~88, y 6~94)로 잘라 여백 0 으로 맞췄다.
const SPADE_VIEWBOX = "12 6 76 88";
const SPADE_PATH =
  "M50 6C50 6 12 34 12 57C12 69 21 77 32 77C38 77 43 74 46 70C46 80 42 88 34 94L66 94C58 88 54 80 54 70C57 74 62 77 68 77C79 77 88 69 88 57C88 34 50 6 50 6Z";

// 광학 좌측 정렬 보정.
// J 는 정규화 때문에 사이드베어링이 0 이라 컨테이너선에 딱 붙는데,
// Pretendard 700 '이' 는 잉크가 LSB(107.4/2048 em)만큼 안쪽에서 시작한다.
// 그래서 보정 없이 두면 J 가 이름보다 바깥으로 튀어나온다.
// 이름과 같은 clamp 를 곱해 폰트 크기가 바뀌어도 두 잉크 좌측이 계속 맞도록 한다.
const OPTICAL_LEFT = "calc(clamp(3.25rem, 7vw, 4.75rem) * 0.05244)";

// 랭크 높이 44/48px, 수트 폭은 캡하이트의 약 55%(≈24/26px),
// 둘 사이 간격은 랭크 높이의 0.09~0.10배(4/5px) — 한 덩어리로 읽히게 붙인다.
const IndexUnit = () => (
  <span className="flex flex-col items-center gap-[4px] pc:gap-[5px]">
    <svg
      viewBox={RANK_VIEWBOX}
      fill="currentColor"
      className="h-[44px] w-auto pc:h-[48px]"
    >
      <path d={RANK_PATH} />
    </svg>
    <svg
      viewBox={SPADE_VIEWBOX}
      fill="currentColor"
      className="h-auto w-[24px] pc:w-[26px]"
    >
      <path d={SPADE_PATH} />
    </svg>
  </span>
);

export default function HeroCardIndex({ variants }: { variants?: Variants }) {
  // (B) 워터마크 — 단일 인스턴스, 우측으로 잘려 나가게.
  // Hero 루트가 relative 이므로 inset-0 은 Hero 박스 전체를 덮는다.
  if (INDEX_MODE === "watermark") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden text-primary/[0.06]"
      >
        <motion.div
          variants={variants}
          className="absolute right-[-14%] top-1/2 -translate-y-1/2"
        >
          <svg
            viewBox={RANK_VIEWBOX}
            fill="currentColor"
            className="h-[clamp(400px,46vw,560px)] w-auto"
          >
            <path d={RANK_PATH} />
          </svg>
        </motion.div>
      </div>
    );
  }

  // (A) 모노그램 — 흐름 안, 이름 바로 위. 간격은 모든 폭에서 30px 고정.
  return (
    <motion.div
      variants={variants}
      aria-hidden="true"
      className="pointer-events-none mb-[30px] w-fit select-none text-muted/[0.35]"
      style={{ marginLeft: OPTICAL_LEFT }}
    >
      <IndexUnit />
    </motion.div>
  );
}
