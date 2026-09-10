import type { Transition } from "framer-motion";

// 리빌 애니메이션의 공통 규칙만 모아둔다.
//
// 섹션마다 같은 fade-up 을 거는 건 템플릿 신호라 하지 않는다. 대신 각 섹션이
// 자기 콘텐츠에서 나오는 동작을 쓰고(타임라인은 축을 그리고, 카드는 깔리고,
// 아이콘 격자는 물결친다), 공유하는 건 트리거 규칙(useRevealOnce)과
// 감속 곡선뿐이다.

// 감속만 있는 곡선(easeOutExpo 계열). 들어오는 동작에는 가속을 넣지 않는다.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * reduced-motion 이면 즉시 완료로 바꾼다.
 *
 * MotionConfig reducedMotion="user" 는 transform·layout 애니메이션을 끄지만,
 * 컴포넌트에 명시한 transition 은 MotionConfig 의 기본값을 덮어써서
 * opacity 전환이 그대로 남는다. 그래서 호출부마다 이걸 통과시킨다.
 */
export function reveal(
  reduceMotion: boolean | null,
  transition: Transition,
): Transition {
  return reduceMotion ? { duration: 0 } : transition;
}
