import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

// 모달 안 이미지 가로 스크롤 영역.
//
// 기존 구현은 onWheel 로 세로 휠을 가로 스크롤로 바꿨는데, 모달 본문이 세로로
// 스크롤되는 상황에서 이건 사용자를 가로막는다. 네이티브 가로 스크롤에 맡기고
// 대신 (1) 더 볼 게 있다는 그라데이션 힌트와 (2) 키보드 접근성을 붙인다.
//
// tabIndex 0 + role="group" 이면 포커스 후 방향키로 브라우저가 직접 스크롤한다.
export default function ProjectImageStrip({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    setEdges({
      left: el.scrollLeft > 4,
      right: overflow > 4 && el.scrollLeft < overflow - 4,
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    update();
    el.addEventListener("scroll", update, { passive: true });

    // 스크롤러가 아니라 "내용"을 관찰해야 한다. lazy 이미지가 뒤늦게 로드되면
    // scrollWidth 는 늘어나지만 스크롤러 자신의 박스 크기는 그대로여서,
    // 스크롤러만 보면 오른쪽 페이드가 영원히 안 켜진다.
    const observer = new ResizeObserver(update);
    observer.observe(content);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [images, update]);

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        role="group"
        tabIndex={0}
        aria-label={`${title} 화면 ${images.length}장 — 방향키로 넘길 수 있습니다`}
        className="overflow-x-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <div ref={contentRef} className="flex w-max gap-2">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`${title} 프로젝트 화면 ${index + 1}`}
              loading="lazy"
              onLoad={update}
              className="h-44 w-auto shrink-0 rounded-md object-cover"
            />
          ))}
        </div>
      </div>

      {/* 스크롤 힌트 — 남은 방향으로만 페이드를 띄운다 */}
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-md bg-gradient-to-r from-surface to-transparent transition-opacity duration-200",
          edges.left ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-md bg-gradient-to-l from-surface to-transparent transition-opacity duration-200",
          edges.right ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
