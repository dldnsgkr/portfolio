import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsDark } from "@/lib/useIsDark";

// 다크 모드로 바뀌면 천장에서 펜던트 램프가 내려와 Hero 를 비춘다.
//
// 포커 테이블 위 초록 갓 펜던트는 J♠ 모티프의 정확한 도상이고,
// 배경에서 빼낸 초록을 "명도가 충분해서 실제로 초록으로 읽히는 자리"로 옮긴 것이다.
// (페이지 배경으로 쓰면 L8% 라 이끼가 됐다.)
//
// 라이트 모드 = 방에 불이 켜져 있음 → 램프 없음.
// 다크 모드 = 불이 꺼짐 → 이 램프가 광원이 된다.

// 갓은 UI 크롬이 아니라 사물이라 토큰을 쓰지 않고 고정색으로 둔다.
const SHADE = "#22382C"; // 초록 에나멜
const SHADE_TOP = "#31513D"; // 위쪽 능선
const RIM = "#F7F1E2"; // 불이 닿는 갓 안쪽

// 램프의 가로 위치(Hero 박스 기준). --lamp-x 로 빼서 CSS 만으로 조정할 수 있다.
// PC 10% = 이름 잉크의 중심(모든 폭에서 9.6% 로 측정됨).
// 모바일은 박스가 좁아 그 위치에선 갓이 화면 밖으로 나가므로 오른쪽으로 당긴다.

// SVG viewBox 는 300x200 이고 갓 테두리는 y=182 에 있다.
// 컨테이너 높이 = 폭 x 200/300 이므로 테두리는 컨테이너 높이의 182/200 = 91% 지점이다.
// 빛은 반드시 이 지점에서 시작해야 램프에서 나온 것으로 읽힌다.
const RIM_TOP = "91%";
// 갓 지름은 컨테이너 폭의 73.3%(SVG x 40~260). 원뿔 요소 폭이 컨테이너의 300% 이므로
// 갓 지름은 원뿔 폭의 24.4% 다. 다만 blur 가 양옆으로 번지므로 기하학적 꼭지는
// 그보다 좁게 두어야 실제로 "갓에서 시작하는" 폭으로 보인다.
const CONE_APEX = { left: "41.5%", right: "58.5%" };
// 커서가 화면 끝에 있을 때의 최대 기울기. 이보다 크면 매달린 게 아니라 흔드는 것처럼 보인다.
const MAX_TILT_DEG = 2.4;
// Hero 를 벗어나는 동안 램프가 천장으로 되말려 올라가는 거리(px).
const RETRACT_PX = -64;

export default function HeroLamp() {
  const isDark = useIsDark();

  // 램프 본체를 자식으로 분리한 이유: useScroll 은 마운트된 대상을 측정해야 한다.
  // 조건부로 렌더되는 요소에 ref 를 걸면 다크 모드가 아닐 때 측정 대상이 없다.
  return <AnimatePresence>{isDark && <Lamp key="lamp" />}</AnimatePresence>;
}

function Lamp() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const drop = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 120, damping: 14, mass: 0.9 };
  const lightIn = {
    duration: reduceMotion ? 0 : 0.8,
    delay: reduceMotion ? 0 : 0.3,
  };

  // 스크롤로 Hero 를 벗어나면 불이 잦아들고 램프가 천장으로 되말려 올라간다.
  // 스크롤에 연동된 값이라 자동 재생이 아니고, 되돌아오면 그대로 되살아난다.
  // 이게 없으면 램프가 "한 번 재생되는 인트로"로 남아 아래 섹션까지 떠 있다.
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  // 빛은 Hero 절반쯤에서 이미 사라져야 한다 — 화면에 남은 램프가
  // 아래 섹션의 텍스트를 물들이면 대비 계산이 무의미해진다.
  const dim = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const retract = useTransform(scrollYProgress, [0, 1], [0, RETRACT_PX]);

  // 커서를 따라 램프가 기울고 빛이 함께 흐른다.
  // 사용자 동작에 반응하는 모션이라 "자동 재생은 Hero 1회" 원칙과 충돌하지 않는다.
  // 천장 고정점(전선 위쪽)을 축으로 도니 매달린 물체처럼 읽힌다.
  const tiltTarget = useMotionValue(0);
  const tilt = useSpring(tiltTarget, {
    stiffness: 55,
    damping: 16,
    mass: 0.7,
  });

  useEffect(() => {
    // 터치 기기는 커서가 없다. reduced-motion 이면 아예 붙이지 않는다.
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (e: PointerEvent) => {
      const half = window.innerWidth / 2;
      const norm = Math.max(-1, Math.min(1, (e.clientX - half) / half));
      tiltTarget.set(norm * MAX_TILT_DEG);
    };
    // 창을 벗어나면 수직으로 되돌린다
    const onLeave = () => tiltTarget.set(0);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, tiltTarget]);

  return (
    <motion.div
      ref={rootRef}
      aria-hidden="true"
      // overflow-hidden 을 걸지 않는다 — 빛은 컨테이너를 넘어야 하고,
      // 클리핑은 섹션(뷰포트 폭)이 맡는다.
      className="pointer-events-none absolute inset-0 z-0 select-none [--lamp-x:32%] pc:[--lamp-x:10%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      {/* 위치 기준점 — 램프와 빛이 같은 컨테이너를 공유해야 정렬이 어긋나지 않는다.
          framer-motion 은 애니메이션 대상 요소에 인라인 transform 을 써서
          Tailwind 의 -translate-x-1/2 를 덮어버린다(램프만 오른쪽으로 밀렸던 원인).
          그래서 x 정렬은 애니메이션이 걸리지 않는 이 바깥 div 가 맡는다. */}
      <div
        className="absolute top-0 w-[230px] -translate-x-1/2 pc:w-[280px]"
        style={{ left: "var(--lamp-x)" }}
      >
        {/* 전선·갓·빛을 한 덩어리로 기울이고 되말아 올린다.
            축은 컨테이너 상단 중앙(천장 고정점).
            빛만 따로 두면 갓과 빛이 어긋나 보인다. */}
        <motion.div
          style={{
            rotate: tilt,
            y: reduceMotion ? 0 : retract,
            transformOrigin: "50% 0",
          }}
        >
          {/* 빛 전체를 한 겹으로 묶어 스크롤에 따라 같이 잦아들게 한다.
              inset-0 으로 부모와 같은 박스를 갖게 해서(부모는 rotate 때문에
              이미 containing block 이다) 안쪽 % 좌표가 그대로 유지된다. */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: reduceMotion ? 1 : dim }}
          >
            {/* 빛 원뿔 — 갓 테두리에서 아래로 넓어진다.
                순수 radial-gradient 로는 옆으로 번진 얼룩이 되므로 clip-path
                사다리꼴에 세로 그라데이션을 넣고 blur 로 직선 변을 녹인다.
                그라데이션이 clip 경계 전에 사라져야 아래가 잘려 보이지 않는다. */}
            <motion.div
              className="absolute left-1/2"
              style={{
                top: RIM_TOP,
                width: "300%",
                height: "420%",
                marginLeft: "-150%",
                background:
                  "linear-gradient(to bottom, rgba(247,241,226,0.17), rgba(198,166,100,0.075) 32%, rgba(198,166,100,0.02) 58%, transparent 76%)",
                clipPath: `polygon(${CONE_APEX.left} 0%, ${CONE_APEX.right} 0%, 100% 100%, 0% 100%)`,
                // 좌우 끝을 페이드. 실제 조명도 가장자리가 흐려지고,
                // 어디서 잘리더라도 하드 엣지가 남지 않는다.
                maskImage:
                  "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)",
                filter: "blur(26px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={lightIn}
            />

            {/* 테두리 바로 아래 핫스팟 */}
            <motion.div
              className="absolute left-1/2"
              style={{
                top: RIM_TOP,
                width: "130%",
                height: "70%",
                marginLeft: "-65%",
                marginTop: "-24%",
                background:
                  "radial-gradient(closest-side, rgba(247,241,226,0.22), transparent 76%)",
                filter: "blur(12px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={lightIn}
            />
          </motion.div>

          {/* 램프 — 위에서 내려와 살짝 흔들리고 멈춘다 */}
          <motion.div
            className="relative"
            initial={{ y: "-105%" }}
            animate={{ y: 0 }}
            exit={{ y: "-105%" }}
            transition={drop}
          >
            <motion.div
              style={{ transformOrigin: "top center" }}
              animate={
                reduceMotion ? undefined : { rotate: [0, 2.2, -1.4, 0.7, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 1.15,
                      ease: "easeOut",
                      times: [0, 0.24, 0.48, 0.74, 1],
                      delay: 0.1,
                    }
              }
            >
              <svg
                viewBox="0 0 300 200"
                className="h-auto w-full"
                fill="none"
                shapeRendering="geometricPrecision"
              >
                <defs>
                  <radialGradient id="lampBulb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={RIM} stopOpacity="0.95" />
                    <stop offset="55%" stopColor={RIM} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={RIM} stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 전선 */}
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="112"
                  stroke={SHADE}
                  strokeWidth="2.5"
                />
                {/* 소켓 칼라 */}
                <path d="M138 112h24v20a12 4 0 0 1-24 0z" fill={SHADE_TOP} />
                {/* 갓 — 얕은 원뿔 */}
                <path
                  d="M136 130 L40 182 A110 12 0 0 0 260 182 L164 130 Z"
                  fill={SHADE}
                />
                {/* 위쪽 능선 */}
                <path
                  d="M136 130 L164 130 L172 136 L128 136 Z"
                  fill={SHADE_TOP}
                  opacity="0.8"
                />
                {/* 불이 닿는 갓 안쪽 */}
                <path
                  d="M40 182 A110 12 0 0 0 260 182 A110 9 0 0 1 40 182 Z"
                  fill={RIM}
                  opacity="0.85"
                />
                {/* 전구 */}
                <ellipse
                  cx="150"
                  cy="186"
                  rx="44"
                  ry="11"
                  fill="url(#lampBulb)"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
