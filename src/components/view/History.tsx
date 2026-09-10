import clsx from "clsx";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { historyData, type HistoryItem } from "@/data/history";
import { EASE_OUT, reveal } from "@/lib/reveal";
import { useRevealOnce } from "@/lib/useRevealOnce";

// date 문자열의 시작 연월을 뽑는다.
// 형식이 제각각이라("2014 ~ 2021", "2022.06 ~ 2023 초", "2026.02", "2026.03 ~")
// 앞쪽의 YYYY 와 있으면 .MM 만 읽고 나머지는 무시한다.
// 파싱 실패는 null 로 돌려 호출부가 정렬을 포기할 수 있게 한다.
type ParsedStart = { key: number; iso: string };

function parseStart(date: string): ParsedStart | null {
  const m = /^\s*(\d{4})(?:\s*[.\-/]\s*(\d{1,2}))?/.exec(date);
  if (!m) return null;

  const year = Number(m[1]);
  const month = m[2] === undefined ? undefined : Number(m[2]);
  if (month !== undefined && (month < 1 || month > 12)) return null;

  return {
    // 월이 없으면 0 으로 두어 같은 해에서 가장 앞에 오게 한다
    key: year * 100 + (month ?? 0),
    iso:
      month === undefined
        ? String(year)
        : `${year}-${String(month).padStart(2, "0")}`,
  };
}

// 최신이 위로. 하나라도 파싱에 실패하면 정렬을 포기하고 원본 순서를 쓴다
// (일부만 정렬된 어중간한 순서가 제일 읽기 어렵다).
function sortNewestFirst(items: HistoryItem[]) {
  const parsed = items.map((item) => ({ item, start: parseStart(item.date) }));
  if (parsed.some((row) => row.start === null)) {
    if (import.meta.env.DEV) {
      const bad = parsed
        .filter((row) => row.start === null)
        .map((row) => row.item.date);
      console.warn(
        `[History] 시작 연월 파싱 실패 — 원본 배열 순서로 렌더한다: ${bad.join(", ")}`,
      );
    }
    return parsed;
  }
  // Array.prototype.sort 는 안정 정렬이라 같은 키는 원본 순서를 유지한다
  return [...parsed].sort((a, b) => b.start!.key - a.start!.key);
}

const History = () => {
  const rows = sortNewestFirst(historyData);

  return (
    <div>
      <SectionTitle>History</SectionTitle>

      {/* 지그재그를 버리고 좌측 단일 축으로. 6개 항목에는 지그재그가 읽는 순서만 흔든다.
          연월은 축 왼쪽, 제목·설명은 축 오른쪽. */}
      <ol className="mt-14">
        {rows.map(({ item, start }, idx) => (
          <Row
            key={`${item.date}-${item.title}`}
            item={item}
            start={start}
            isLast={idx === rows.length - 1}
          />
        ))}
      </ol>
    </div>
  );
};

// 행 하나가 화면에 닿으면 축 → 점 → 내용 순으로 켜진다.
// 트리거를 자식마다 두면 7px 짜리 점이 축보다 먼저 켜져 순서가 뒤집히므로,
// 트리거는 행에만 걸고 순서는 delay 로 만든다. 행마다 따로 켜지니
// 스크롤을 내리는 동안 축이 이어져 그려지는 것처럼 보인다.
function Row({
  item,
  start,
  isLast,
}: {
  item: HistoryItem;
  start: ParsedStart | null;
  isLast: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [ref, shown] = useRevealOnce<HTMLLIElement>();

  const axis: Variants = {
    hidden: { scaleY: 0 },
    shown: {
      scaleY: 1,
      transition: reveal(reduceMotion, { duration: 0.55, ease: EASE_OUT }),
    },
  };
  const dot: Variants = {
    hidden: { scale: 0 },
    shown: {
      scale: 1,
      transition: reveal(reduceMotion, {
        type: "spring",
        stiffness: 420,
        damping: 18,
        delay: 0.14,
      }),
    },
  };
  const body: Variants = {
    hidden: { opacity: 0, x: -6 },
    shown: {
      opacity: 1,
      x: 0,
      transition: reveal(reduceMotion, {
        duration: 0.4,
        ease: EASE_OUT,
        delay: 0.1,
      }),
    },
  };
  const label: Variants = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: reveal(reduceMotion, { duration: 0.4, delay: 0.1 }),
    },
  };

  const dateClass = "pr-5 pt-px text-right text-small tabular-nums text-muted";

  return (
    <motion.li
      ref={ref}
      className="grid grid-cols-[4.75rem_1fr] pc:grid-cols-[7.5rem_1fr]"
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
    >
      {start ? (
        <motion.time
          variants={label}
          dateTime={start.iso}
          className={dateClass}
        >
          {item.date}
        </motion.time>
      ) : (
        <motion.span variants={label} className={dateClass}>
          {item.date}
        </motion.span>
      )}

      <div
        className={clsx(
          // 축은 이 레이아웃의 구조 장치다. --line(1.33:1)은 구조선치고 약해서
          // muted/30 으로 올렸다 — 라이트 1.55:1 / 다크 1.80:1
          "relative border-l border-muted/30 pl-7",
          isLast ? "pb-0" : "pb-12",
        )}
      >
        {/* 회색 축 위를 금색이 위에서 아래로 덧그린다. 스크롤 방향과 그려지는
            방향이 같아 "지나온 만큼 그려진다"로 읽힌다.
            타임라인에서만 쓰는 동작이라 다른 섹션과 겹치지 않는다. */}
        <motion.span
          aria-hidden="true"
          variants={axis}
          className="absolute -left-px top-0 h-full w-px origin-top bg-accent/50"
        />

        <motion.span
          aria-hidden="true"
          variants={dot}
          // -4px: 절대 배치의 기준은 패딩 박스라 1px 보더가 그 밖에 있다.
          // 보더 중심은 패딩 박스 기준 -0.5px 이므로 7px 점은 -0.5-3.5 = -4px 여야
          // 축과 중심이 맞는다(-3px 이면 오른쪽으로 1px 밀린다).
          className="absolute -left-[4px] top-[7px] h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-surface"
        />

        {/* 제목·설명은 축에서 밀려 나오듯 x 로만 움직인다.
            y 로 띄우면 위아래 행과 섞여 어느 항목인지 흐려진다. */}
        <motion.div variants={body}>
          <h3 className="text-h3 font-semibold leading-snug">{item.title}</h3>

          {item.description && (
            <p className="mt-2 max-w-prose text-body text-muted">
              {item.description}
            </p>
          )}
        </motion.div>
      </div>
    </motion.li>
  );
}

export default History;
