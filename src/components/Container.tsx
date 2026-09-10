import clsx from "clsx";

// 모든 섹션이 공유하는 단 하나의 가로 기준선.
// 개별 뷰가 자기 폭을 정하지 못하게 하려고 Section 이 이걸 강제로 감싼다.
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx("mx-auto w-full max-w-content px-5 pc:px-10", className)}
    >
      {children}
    </div>
  );
}
