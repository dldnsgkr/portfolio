import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { toggleTheme } from "@/lib/theme";

// 천장에서 내려온 당김줄. 끌어내렸다 놓으면 테마가 바뀐다.
//
// 은유를 맞추는 데 한 번 막혔다: 다크 모드가 "램프가 켜진 상태"이므로
// 펜던트 자체의 줄을 당기면 램프가 꺼져야 하는데 그런 상태는 없다.
// 그래서 이 줄은 램프의 줄이 아니라 **방 전등 스위치**다.
//   라이트 = 방에 불이 켜져 있고 펜던트는 천장에 올라가 있다 → 줄만 보인다
//   다크   = 방 불이 꺼지고 펜던트가 내려와 광원이 된다
// 두 방향이 같은 동작이라 대칭이고, 줄은 두 테마에서 같은 자리에 있다.
//
// 마우스로는 "당겨야" 바뀐다. 그냥 누르는 것으로는 바뀌지 않고 살짝 튕기기만
// 한다 — 당김이 조건인 물건에서 클릭도 먹히면 당길 이유가 없어진다.
// 키보드(Enter/Space)는 예외다. 키보드로는 드래그가 불가능하므로 그 경로를
// 막으면 포커스는 가는데 눌러도 안 되는 컨트롤이 된다.
// 헤더의 스위치가 여전히 정식 컨트롤이고, 이건 그걸 대체하지 않는다.

const REST_LEN = 96; // 평상시 줄 길이(px)
const PULL_MAX = 130; // 끌 수 있는 최대 거리
const TRIGGER = 44; // 이만큼 넘게 당겨야 켜진다
const BEAD = 13; // 손잡이의 보이는 지름
// 실제 클릭 영역. 13px 은 WCAG 2.5.8 최소 타깃(24x24)에 미달이라
// 보이는 크기는 그대로 두고 히트 영역만 키운다.
const HIT = 28;
// 그냥 눌렀을 때 알려주는 반동 거리(px). 임계보다 훨씬 작아야
// "이걸로는 안 바뀐다"가 몸으로 읽힌다.
const HINT_DIP = 14;

export default function PullCord() {
  const reduceMotion = useReducedMotion();
  // 당긴 거리. 드래그가 쓰고, 놓으면 스프링이 0 으로 되돌린다.
  const pull = useMotionValue(0);
  // 임계를 넘겼는지. 마우스 경로의 토글 판정은 이것 하나뿐이다.
  //
  // 클릭과 드래그를 구분하려고 두 번 헛돌았다. "드래그했다" 불리언은 click 이
  // 오지 않는 경우에 남아서 다음 클릭까지 삼켰고, "드래그 종료 후 250ms" 시간
  // 창은 onDragEnd 가 click 보다 먼저 온다고 가정했다가(framer 는 종료를
  // 프레임에 스케줄한다) 임계 미달인 당김을 토글해버렸다.
  // 지금은 구분할 필요가 없다 — 마우스 클릭은 아무것도 토글하지 않는다.
  const armed = useRef(false);

  // 줄은 당긴 만큼 늘어난다 — 손잡이만 내려가고 줄이 그대로면 끊어진 것처럼 보인다.
  const cordHeight = useTransform(pull, (v) => REST_LEN + v);
  // 당길수록 얇아진다(장력)
  const cordWidth = useTransform(pull, [0, PULL_MAX], [1.5, 1]);

  // 반동 한 번. framer 의 명령형 animate() 를 쓰면 번들이 6KB 늘어서
  // (475.1 vs 468.9 kB) 이 한 곡선만 직접 그린다. 내려갔다 올라오는 사인 반파.
  const hint = () => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 420, 1);
      pull.set(Math.sin(t * Math.PI) * HINT_DIP);
      if (t < 1) requestAnimationFrame(step);
      else pull.set(0);
    };
    requestAnimationFrame(step);
  };

  return (
    // 이름 블록 오른쪽 빈 자리. 램프(--lamp-x: 10%)와 겹치지 않는다.
    // 모바일에서는 Hero 가 좁아 이름과 부딪히므로 내보내지 않는다 — 헤더 스위치가 있다.
    <div
      className="absolute top-0 z-10 hidden pc:block"
      style={{ left: "68%" }}
    >
      {/* 줄 — 천장(top 0)에 고정. 움직이는 손잡이 안에 두면 함께 내려가버린다. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 block bg-muted/50"
        style={{ height: cordHeight, width: cordWidth }}
      />

      {/* 손잡이 = 실제 버튼. x 를 style 로 넘기는 이유: framer 가 y 를 위해
          인라인 transform 을 쓰면 Tailwind 의 -translate-x-1/2 가 덮인다. */}
      <motion.button
        type="button"
        aria-label="조명 줄 당기기 — 테마 전환"
        className="absolute grid cursor-grab touch-none place-items-center rounded-full active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          // 히트 영역의 중심이 아니라 위쪽 테두리를 줄 끝에 맞춘다 —
          // 그래야 안쪽 손잡이의 위쪽이 정확히 줄 끝에 닿는다.
          top: REST_LEN - (HIT - BEAD) / 2,
          left: 0,
          x: "-50%",
          y: pull,
          width: HIT,
          height: HIT,
        }}
        drag={reduceMotion ? false : "y"}
        dragConstraints={{ top: 0, bottom: PULL_MAX }}
        dragElastic={0.1}
        dragMomentum={false}
        dragSnapToOrigin
        // 놓으면 튕겨 올라간다. 이 스프링이 인터랙션의 전부다.
        dragTransition={{ bounceStiffness: 460, bounceDamping: 13 }}
        onDragStart={() => {
          armed.current = false;
        }}
        onDrag={(_, info) => {
          armed.current = info.offset.y > TRIGGER;
        }}
        onDragEnd={() => {
          if (!armed.current) return;
          armed.current = false;
          toggleTheme();
        }}
        onClick={(e) => {
          // 마우스로는 "당겨야" 바뀐다. 그냥 누르는 것으로는 바뀌지 않는다 —
          // 당김이 조건인 물건에서 클릭도 먹히면 당길 이유가 없어진다.
          // 토글 판정은 onDragEnd 가 임계(TRIGGER)로만 한다.
          if (e.detail !== 0) {
            // 대신 살짝 튕겨서 "당길 수 있다"를 알려준다
            if (!reduceMotion) hint();
            return;
          }
          // detail 0 = 키보드(Enter/Space). 키보드로는 드래그가 불가능하므로
          // 이 경로는 남긴다 — 없으면 포커스는 가는데 눌러도 안 되는 컨트롤이 된다.
          toggleTheme();
        }}
      >
        <span
          aria-hidden="true"
          className="block rounded-full bg-muted/70 ring-1 ring-inset ring-background/40"
          style={{ width: BEAD, height: BEAD }}
        />
      </motion.button>
    </div>
  );
}
