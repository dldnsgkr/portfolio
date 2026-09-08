import { useEffect, useState } from "react";

/**
 * 현재 보고 있는 섹션 id 를 돌려준다.
 *
 * 기존 App.tsx 는 scroll 이벤트로 offsetTop 을 재고 reduce 로 계산해놓고
 * 결과를 어디에도 쓰지 않았다. 스크롤마다 레이아웃을 읽는 방식이기도 해서
 * IntersectionObserver 로 다시 짰다.
 *
 * rootMargin 으로 뷰포트 중앙에 얇은 밴드를 만들고, 그 밴드와 겹치는 섹션을
 * 활성으로 본다. 섹션 사이 빈 구간에서는 마지막 활성값을 유지한다.
 * Hero 는 목록에 넣지 않는다 — 최상단에서는 어떤 네비 항목도 현재가 아니다.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sectionIds = key.split(",");
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        // 문서 순서상 첫 번째 것을 고른다 (밴드에 둘이 걸칠 때의 흔들림 방지)
        const next = sectionIds.find((id) => intersecting.has(id));
        if (next) setActive(next);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
