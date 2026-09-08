import { motion } from "framer-motion";
import clsx from "clsx";
import ProjectModal from "./ProjectModal";
import { useState } from "react";
import type { ProjectWrapperType } from "@/types/projectList.types";

// 앞면에 노출할 스택 태그 개수. 넘치면 +N 으로 접는다.
const MAX_TAGS = 4;

export default function ProjectCard(props: ProjectWrapperType) {
  const [open, setOpen] = useState(false);

  const {
    title,
    description,
    period,
    contentText,
    imageList,
    stackList,
    troubleShooting,
    deployLink,
  } = props;

  const periodText = period
    ? `${period.start} ~ ${period.end ?? "진행중"}`
    : null;

  // 실무 5건은 공개 가능한 화면이 없어 앞으로도 이미지가 생기지 않는다.
  // 회색 플레이스홀더로 자리를 채우면 섹션 전체가 비어 보이므로,
  // 이미지가 없으면 썸네일 영역을 렌더링하지 않고 텍스트가 그 자리를 쓰게 한다.
  const hasImage = Boolean(imageList && imageList.length > 0);

  const tags = stackList?.slice(0, MAX_TAGS) ?? [];
  const hiddenTagCount = (stackList?.length ?? 0) - tags.length;
  // 데이터 추가가 아니라 troubleShooting 배열 길이에서 파생한 값이다.
  const troubleCount = troubleShooting?.length ?? 0;

  return (
    <motion.article
      // 확대(scale)는 썸네일을 흐리게 만든다. 보더 색 전환 + 2px 부양으로 교체.
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex cursor-pointer flex-col rounded-2xl border border-muted/40 bg-surface p-6 transition-colors hover:border-accent/60"
      onClick={() => setOpen(true)}
    >
      {hasImage && (
        <img
          src={imageList![0]}
          alt={`${title} 프로젝트 대표 화면`}
          loading="lazy"
          className="mb-5 aspect-[16/10] w-full rounded-md object-cover"
        />
      )}

      <h3
        className={clsx(
          "break-keep font-semibold text-primary",
          // 이미지가 없는 카드는 제목을 한 단계 키워 빈 자리를 활자가 채우게 한다
          hasImage ? "text-h3" : "text-[1.625rem] leading-snug",
        )}
      >
        {title}
      </h3>

      {periodText && (
        <p className="mt-1.5 text-small tabular-nums text-muted">
          {periodText}
        </p>
      )}

      <p
        className={clsx(
          "mt-2.5 text-body text-muted",
          // 썸네일이 없는 쪽에 더 많은 줄을 허용한다
          hasImage ? "line-clamp-3" : "line-clamp-6",
        )}
      >
        {description}
      </p>

      {/* 카드는 내용 높이를 갖는다(그리드 items-start). 하단을 강제로 맞추면
          UPDEV 처럼 설명이 한 줄인 카드에 300px 넘는 빈 공간이 생긴다. */}
      <div className="pt-5">
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-muted/40 px-2.5 py-[3px] text-[0.6875rem] text-muted"
              >
                {tag}
              </li>
            ))}
            {hiddenTagCount > 0 && (
              <li className="rounded-full border border-muted/40 px-2.5 py-[3px] text-[0.6875rem] text-muted">
                +{hiddenTagCount}
              </li>
            )}
          </ul>
        )}

        {troubleCount > 0 && (
          <p className="mt-3 text-small tabular-nums text-muted">
            문제 해결 {troubleCount}건
          </p>
        )}
      </div>

      {/* portal modal */}
      <ProjectModal open={open} onClose={() => setOpen(false)}>
        <header className="mb-4">
          <h3 className="text-2xl font-semibold text-primary">{title}</h3>
          {periodText && <p className="mt-1 text-xs text-muted">{periodText}</p>}
          <p className="mt-2 text-muted">{description}</p>
        </header>
        <section className="flex-1 overflow-y-auto space-y-4">
          <div
            className="flex gap-2 overflow-auto"
            onWheel={(e) => {
              e.currentTarget.scrollLeft += e.deltaY;
            }}
          >
            {imageList?.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${title} 프로젝트 화면 ${index + 1}`}
                className="mb-4 rounded-md"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span>담당 역할 및 주요 구현 기능</span>
            <div className="flex flex-col gap-1">
              {contentText.map((text, index) => (
                <div key={index} className="flex gap-2 text-muted">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          {stackList && (
            <div className="flex flex-col gap-2">
              <span>기술 스택</span>
              <div className="ml-2 pl-5 text-muted marker:text-primary">
                {stackList?.join(" · ")}
              </div>
            </div>
          )}
          {troubleShooting && (
            <div className="flex flex-col gap-2">
              <span>트러블 슈팅</span>
              <div className="ml-2 pl-5 text-muted marker:text-primary">
                {troubleShooting.map((item, index) => (
                  <div key={index} className="mb-2">
                    {item.title && (
                      <strong className="block mb-1">{item.title}</strong>
                    )}
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <footer className="pc:mt-6 flex justify-between items-center">
          {deployLink ? (
            <a
              href={deployLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-accent text-white rounded-md text-sm hover:opacity-80"
            >
              배포 링크 →
            </a>
          ) : (
            <span />
          )}
          <button
            onClick={() => setOpen(false)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Close
          </button>
        </footer>
      </ProjectModal>
    </motion.article>
  );
}
