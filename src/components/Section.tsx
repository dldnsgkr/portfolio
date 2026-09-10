import clsx from "clsx";
import Container from "./Container";

// 레이아웃 프리미티브 — 애니메이션 래퍼가 아니다.
// 배경 톤, 상하 여백, 가로 컨테이너 세 가지만 책임진다.
// 섹션마다 걸려 있던 fade-up 은 제거했다(모든 섹션이 똑같이 떠오르는 건 템플릿 신호).
export default function Section({
  id,
  children,
  tone = "bg",
  fullHeight = false,
}: {
  id: string;
  children: React.ReactNode;
  // 인접 섹션끼리 배경을 번갈아 주어 리듬을 만든다. 구분선은 쓰지 않는다.
  tone?: "bg" | "surface";
  fullHeight?: boolean;
}) {
  return (
    <section
      id={id}
      className={clsx(
        tone === "surface" ? "bg-surface" : "bg-background",
        fullHeight
          // hero 만 쓰는 분기. 램프 빛이 콘텐츠 컨테이너 밖으로 번져야 하므로
          // 클리핑은 컨테이너가 아니라 뷰포트 폭인 섹션에서 한다.
          ? "flex min-h-[86svh] items-center overflow-hidden"
          : "py-section-mobile pc:py-section-pc",
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
