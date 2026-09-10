import clsx from "clsx";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import IconButton from "../button/IconButton";
import type { SkillWrapperType } from "@/types/skillsList.types";
import { DARK_INVERT_ICONS } from "@/data/iconTone";
import { reveal } from "@/lib/reveal";
import { useRevealOnce } from "@/lib/useRevealOnce";
import { useMagneticGrid } from "@/lib/useMagneticGrid";

// Main 과 Experience 는 subTit 이 이미 위계를 설명한다. 그 위계를 밀도로 보여준다.
type Variant = "main" | "experience";

// 셀 폭을 1fr 신축이 아니라 고정값으로 두고 justify-start 로 좌측 정렬한다.
// 1fr 이면 열이 콘텐츠 폭을 정확히 나눠 가져 마지막 줄의 빈 칸이 "표에서 빠진 셀"처럼
// 도드라진다. 고정 폭 + 좌측 정렬이면 남는 자리가 줄 끝 여백이 되어 문장 줄바꿈처럼 읽힌다.
// (항목 19개·43개는 어떤 열 수로도 나누어떨어지지 않는다 — 없앨 수 없는 문제라 덜 보이게 한다.)
const SIZES = {
  main: {
    grid: "grid-cols-[repeat(auto-fill,100px)]",
    cell: "min-h-[104px] gap-2.5",
    icon: "h-10 w-10",
    label: "text-small",
  },
  experience: {
    grid: "grid-cols-[repeat(auto-fill,88px)]",
    cell: "min-h-[64px] gap-1.5",
    icon: "h-6 w-6",
    label: "text-[0.6875rem] leading-[1.25]",
  },
} satisfies Record<Variant, Record<string, string>>;

const SkillsWrapper = ({
  mainTit,
  subTit,
  className,
  skillList,
  variant = "main",
}: SkillWrapperType & { variant?: Variant }) => {
  const size = SIZES[variant];
  const reduceMotion = useReducedMotion();
  const [gridRef, shown] = useRevealOnce<HTMLDivElement>();
  // 자기장은 셀의 transform 을 직접 쓴다. 리빌이 끝난 뒤부터 켜서
  // 두 애니메이션이 같은 프레임에 같은 속성을 다투지 않게 한다.
  const magnetRef = useMagneticGrid<HTMLDivElement>(!reduceMotion && shown);

  // 격자에는 격자의 동작을 준다 — 좌상단에서 시작해 읽는 순서대로 셀이 켜진다.
  // Experience 는 43개라 간격을 그대로 두면 1초가 넘어가므로,
  // 항목 수로 간격을 나눠 어느 목록이든 전체가 0.5초 안에 끝나게 한다.
  // reduced-motion 이면 물결도 없앤다 — 즉시 켜지는 셀을 줄지어 켜는 건
  // 의미가 없고, 그 사이 아직 안 켜진 셀이 안 보이는 콘텐츠로 남는다.
  const step = reduceMotion
    ? 0
    : Math.min(0.03, 0.5 / Math.max(skillList.length, 1));
  const grid: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: step } },
  };
  const cell: Variants = {
    hidden: { opacity: 0, y: 6, scale: 0.94 },
    shown: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reveal(reduceMotion, { duration: 0.26, ease: "easeOut" }),
    },
  };

  return (
    // 바깥 보더 박스는 없앴다 — 회색 슬래브처럼 무거웠고, 구분은 제목과 여백으로 충분하다.
    <section className={clsx("flex flex-col", className)}>
      <h3 className="text-h3 font-semibold text-primary">{mainTit}</h3>
      <p className="mt-1 text-small text-muted">{subTit}</p>

      <motion.div
        ref={(node) => {
          gridRef.current = node;
          magnetRef.current = node;
        }}
        className={clsx("mt-6 grid justify-start gap-y-1", size.grid)}
        variants={grid}
        initial="hidden"
        animate={shown ? "shown" : "hidden"}
      >
        {/* 래퍼가 하나 더 있는 이유: 리빌(opacity·y·scale)과 자기장(transform)이
            같은 요소에 걸리면 framer-motion 의 인라인 transform 과 자기장의
            매 프레임 쓰기가 서로를 덮어쓴다. 리빌은 이 div, 자기장은 안쪽 버튼. */}
        {skillList.map((skillObj) => (
          <motion.div key={skillObj.name} variants={cell} className="flex">
            <IconButton
              skillObj={skillObj}
              magnetic
              className={clsx("w-full", size.cell, size.label)}
            >
              {skillObj.imgPath ? (
                <img
                  src={skillObj.imgPath}
                  alt={skillObj.imgAlt}
                  loading="lazy"
                  className={clsx(
                    size.icon,
                    "pointer-events-none object-contain opacity-90 transition duration-300 ease-out group-hover:opacity-100",
                    // grayscale 은 걷어냈다. 측정 결과 라이트·다크 양쪽 가시성 저하의
                    // 직접 원인이었다 — 라이트에서 3:1 미달 28개 중 27개가 채도 0.35 이상,
                    // 즉 색상으로는 구분되는데 grayscale 이 그 색상을 지워 배경과 같은
                    // 밝은 회색으로 만들었다. 불투명도로는 해결되지 않는다(α=1.0 에서도 미달).
                    // 순수 검정 단색 로고만 다크에서 뒤집는다.
                    DARK_INVERT_ICONS.has(skillObj.name) && "dark:invert",
                  )}
                />
              ) : (
                <span
                  className={clsx(
                    size.icon,
                    "flex items-center justify-center text-[0.7rem] font-semibold text-muted",
                  )}
                  aria-hidden="true"
                >
                  {skillObj.name.slice(0, 2)}
                </span>
              )}
              {skillObj.name}
            </IconButton>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsWrapper;
