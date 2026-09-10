import { useEffect, useRef, useState } from "react";

/**
 * 요소가 화면에 닿았는지 한 번만 알려준다. 리빌 애니메이션의 트리거.
 *
 * framer-motion 의 whileInView 를 쓰지 않는 이유:
 * IntersectionObserver 는 "교차 상태가 바뀐 순간"만 보고한다. 프레임 사이에
 * 스크롤이 크게 튀면(스크롤바 드래그, 앵커 점프, 새로고침 시 스크롤 복원)
 * 요소가 화면 아래 → 화면 위로 한 프레임에 넘어가면서 교차한 적이 없는 것이 되고,
 * once 리빌은 영구히 opacity 0 에 갇힌다. 실제로 그렇게 됐다 —
 * 스크롤을 한 번 훑은 뒤 Projects 카드 2장과 제목 밑줄이 안 보이는 채로 남았다.
 *
 * 그래서 관찰자 + 스크롤 좌표를 직접 읽는 그물, 두 겹으로 둔다.
 * 좌표 검사는 "요소 위쪽이 뷰포트 안으로 들어왔거나 이미 지나갔는가"만 보므로
 * 얼마나 크게 튀어도 놓치지 않는다. 켜진 뒤에는 둘 다 떼어낸다.
 */
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
    };

    // 아래쪽 8% 를 잘라 요소가 화면 안으로 확실히 들어온 뒤 켜지게 한다.
    // threshold 대신 rootMargin 을 쓰는 건 요소 높이와 무관해야 하기 때문이다
    // (Projects 섹션은 뷰포트보다 몇 배 길고, 제목 밑줄은 2px 다).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) reveal();
    };
    // 마운트 직후 이미 화면에 있는 요소(첫 화면)를 위한 한 번의 검사
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [shown]);

  return [ref, shown] as const;
}
