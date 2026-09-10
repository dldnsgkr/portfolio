import clsx from "clsx";
import SectionTitle from "../SectionTitle";
import { historyData, type HistoryItem } from "@/data/history";

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
        {rows.map(({ item, start }, idx) => {
          const isLast = idx === rows.length - 1;

          return (
            <li
              key={`${item.date}-${item.title}`}
              className="grid grid-cols-[4.75rem_1fr] pc:grid-cols-[7.5rem_1fr]"
            >
              {start ? (
                <time
                  dateTime={start.iso}
                  className="pr-5 pt-px text-right text-small tabular-nums text-muted"
                >
                  {item.date}
                </time>
              ) : (
                <span className="pr-5 pt-px text-right text-small tabular-nums text-muted">
                  {item.date}
                </span>
              )}

              <div
                className={clsx(
                  // 축은 이 레이아웃의 구조 장치다. --line(1.33:1)은 구조선치고 약해서
                  // muted/30 으로 올렸다 — 라이트 1.55:1 / 다크 1.80:1
                  "relative border-l border-muted/30 pl-7",
                  isLast ? "pb-0" : "pb-12",
                )}
              >
                <span
                  aria-hidden="true"
                  // -4px: 절대 배치의 기준은 패딩 박스라 1px 보더가 그 밖에 있다.
                  // 보더 중심은 패딩 박스 기준 -0.5px 이므로 7px 점은 -0.5-3.5 = -4px 여야
                  // 축과 중심이 맞는다(-3px 이면 오른쪽으로 1px 밀린다).
                  className="absolute -left-[4px] top-[7px] h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-surface"
                />

                <h3 className="text-h3 font-semibold leading-snug">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-2 max-w-prose text-body text-muted">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default History;
