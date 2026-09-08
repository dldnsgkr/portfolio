// 다크 모드에서 invert 가 필요한 아이콘 목록.
//
// 추측이 아니라 실측이다. 각 SVG 를 64x64 캔버스에 그려 알파 0.35 이상 픽셀의
// 평균 휘도와 채도를 계산했고, 아래 항목은 전부 휘도 0.000 / 채도 0.000 —
// 즉 순수 검정 단색 로고다. 딥 그린 배경에서는 형체가 남지 않는다.
//
// 경계선에 있던 것들(bun 0.652/0.102, notion 0.571/0.000, ohMyZsh 0.445/0.000)은
// 흰 면을 함께 가져서 다크에서도 읽히므로 invert 하지 않는다. invert 하면 오히려 깨진다.
//
// 콘텐츠가 아니라 렌더링 특성이므로 skiilsList.ts 를 건드리지 않고 여기서 관리한다.
// 아이콘을 교체하면 이 목록도 다시 재야 한다.
export const DARK_INVERT_ICONS = new Set<string>([
  "Next", // icon_next.svg
  "Github", // icon_gitHub.svg
  "shadcn", // icon_shadcn.svg
  "react-quill", // icon_quill.svg
  "tanstack-query", // icon_tanstack.svg
  "tanstack-router", // icon_tanstack.svg
  "styled-components", // icon_styledComponents.svg
  "framer-motion", // icon_framerMotion.svg
  "swiper", // icon_swiper.svg
]);
