import { useEffect, useRef } from "react";

// 커서 주변의 격자 셀이 끌려오며 커진다. anime.js 격자 데모의 그 효과를
// 라이브러리 없이 만든 것 — 매 프레임 transform 을 직접 쓰고, 부드러움은
// CSS transition 이 맡는다(프레임마다 목표가 바뀌면 지수적으로 뒤따라온다).
//
// framer-motion 을 쓰지 않는 이유: 셀 62개에 각각 스프링을 붙이면
// 구독이 62개 생긴다. rAF 한 번에 직접 쓰는 쪽이 훨씬 싸다.
// 대신 리빌 애니메이션과 같은 요소를 다투면 안 되므로, 리빌은 바깥 래퍼가
// 맡고 여기서는 [data-magnet] 요소의 transform 만 건드린다.

// 셀 폭이 100px 이라 반경 130 이면 좌우 한 칸만 반응해 "자기장"으로 안 읽힌다.
// 180 이면 두 칸까지 걸려 커서 주변이 한 덩어리로 움직인다.
const RADIUS = 180; // 영향권(px)
const MAX_SCALE = 0.24; // 중심에서의 확대량
const MAX_PULL = 8; // 커서 쪽으로 끌려오는 최대 거리(px)

export function useMagneticGrid<T extends HTMLElement>(enabled: boolean) {
  const gridRef = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;
    const grid = gridRef.current;
    if (!grid) return;
    // 터치 기기는 커서가 없다
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let cells: HTMLElement[] = [];
    let centers: { x: number; y: number }[] = [];
    let bounds: DOMRect | null = null;
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    // 스크롤·리사이즈로 좌표가 낡았음을 표시만 해둔다. 실제 측정은 커서가
    // 영향권에 들어와 있을 때만 한다 — 스크롤할 때마다 셀 62개의 rect 를
    // 읽으면 마우스가 근처에 없어도 프레임마다 레이아웃을 강제한다.
    let stale = true;

    const measure = () => {
      cells = [...grid.querySelectorAll<HTMLElement>("[data-magnet]")];
      bounds = grid.getBoundingClientRect();
      centers = cells.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      stale = false;
    };

    const invalidate = () => {
      stale = true;
      // 커서가 이미 격자 근처에 있으면 다음 프레임에 다시 잰다
      if (pointer) schedule();
    };

    const clear = (el: HTMLElement) => {
      el.style.transform = "";
      el.style.zIndex = "";
    };

    const apply = () => {
      raf = 0;
      if (stale && pointer) measure();
      for (let i = 0; i < cells.length; i++) {
        const el = cells[i];
        if (!pointer) {
          clear(el);
          continue;
        }
        const c = centers[i];
        const dx = pointer.x - c.x;
        const dy = pointer.y - c.y;
        const d = Math.hypot(dx, dy);
        if (d > RADIUS) {
          clear(el);
          continue;
        }
        // 선형으로 감쇠시키면 경계에서 툭 끊긴다. 코사인이면 0 에서 기울기도 0 이다.
        const f = Math.cos((d / RADIUS) * (Math.PI / 2));
        const k = (MAX_PULL * f) / (d || 1);
        el.style.transform = `translate(${dx * k}px, ${dy * k}px) scale(${
          1 + MAX_SCALE * f
        })`;
        // 커진 셀이 이웃 아래로 들어가지 않게 한다
        el.style.zIndex = String(1 + Math.round(f * 10));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    // 격자 위에서만 듣지 않는 이유: 커서가 격자 바로 밖에 있을 때도
    // 가장자리 셀은 반응해야 한다. 그래야 효과가 잘려 보이지 않는다.
    const onMove = (e: PointerEvent) => {
      if (stale) measure();
      if (!bounds) return;
      const inRange =
        e.clientX > bounds.left - RADIUS &&
        e.clientX < bounds.right + RADIUS &&
        e.clientY > bounds.top - RADIUS &&
        e.clientY < bounds.bottom + RADIUS;
      const had = pointer !== null;
      pointer = inRange ? { x: e.clientX, y: e.clientY } : null;
      if (inRange || had) schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    measure();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    // 스크롤·리사이즈로 셀 좌표가 바뀐다
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      cells.forEach(clear);
    };
  }, [enabled]);

  return gridRef;
}
