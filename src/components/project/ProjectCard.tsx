import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { useId, useState } from "react";
import ProjectModal from "./ProjectModal";
import ProjectImageStrip from "./ProjectImageStrip";
import type { ProjectWrapperType } from "@/types/projectList.types";

// 앞면에 노출할 스택 태그 개수. 넘치면 +N 으로 접고 전체는 모달에서 보여준다.
const MAX_TAGS = 4;

const pill =
  "rounded-full border border-muted/40 px-2.5 py-[3px] text-[0.6875rem] text-muted";

export default function ProjectCard(props: ProjectWrapperType) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const reduceMotion = useReducedMotion();

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
      // reduced-motion 에서는 부양을 없앤다 — 어포던스는 보더 색이 맡는다.
      whileHover={reduceMotion ? undefined : { y: -2 }}
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
        {/* 제목을 버튼으로 감싼다. 카드 전체 onClick 만 두면 키보드로는 열 수가 없고,
            포커스 가능한 트리거가 없어 모달을 닫을 때 되돌릴 대상도 없다. */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {title}
        </button>
      </h3>

      {periodText && (
        <p className="mt-1.5 text-small tabular-nums text-muted">{periodText}</p>
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
              <li key={tag} className={pill}>
                {tag}
              </li>
            ))}
            {hiddenTagCount > 0 && <li className={pill}>+{hiddenTagCount}</li>}
          </ul>
        )}

        {troubleCount > 0 && (
          <p className="mt-3 text-small tabular-nums text-muted">
            문제 해결 {troubleCount}건
          </p>
        )}
      </div>

      {/* 역할 분담 — 앞면은 요약(스택 4개 + 건수), 모달은 전체(스택 전부 + 상세) */}
      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={titleId}
      >
        <header className="shrink-0">
          <h2 id={titleId} className="text-2xl font-semibold text-primary">
            {title}
          </h2>
          {periodText && (
            <p className="mt-1.5 text-small tabular-nums text-muted">
              {periodText}
            </p>
          )}
          <p className="mt-2 text-body text-muted">{description}</p>
        </header>

        <div className="mt-6 flex-1 space-y-7 overflow-y-auto pr-1">
          {hasImage && <ProjectImageStrip images={imageList!} title={title} />}

          <section>
            <h3 className="text-small font-semibold text-primary">
              담당 역할 및 주요 구현 기능
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {contentText.map((text, index) => (
                <li key={index} className="flex gap-2 text-body text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent"
                  >
                    ·
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          {stackList && stackList.length > 0 && (
            <section>
              <h3 className="text-small font-semibold text-primary">
                기술 스택{" "}
                <span className="font-normal tabular-nums text-muted">
                  {stackList.length}개
                </span>
              </h3>
              {/* 앞면은 4개까지만 보여주므로 여기서는 전부 노출한다 */}
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {stackList.map((stack) => (
                  <li key={stack} className={pill}>
                    {stack}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {troubleCount > 0 && (
            <section>
              <h3 className="text-small font-semibold text-primary">
                트러블슈팅{" "}
                <span className="font-normal tabular-nums text-muted">
                  {troubleCount}건
                </span>
              </h3>
              {/* 앞면은 건수만 보여주므로 여기서는 상세를 펼친다 */}
              <ol className="mt-2.5 space-y-4">
                {troubleShooting!.map((item, index) => (
                  <li key={index}>
                    {item.title && (
                      <p className="text-body font-medium text-primary">
                        {item.title}
                      </p>
                    )}
                    {item.content && (
                      <p className="mt-1 text-body text-muted">
                        {item.content}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <footer className="mt-6 flex shrink-0 items-center justify-between gap-3">
          {deployLink ? (
            <a
              href={deployLink}
              target="_blank"
              rel="noopener noreferrer"
              // text-background 는 라이트에서 밝은 글자 / 다크에서 어두운 글자가 되어
              // accent 배경 위 대비를 양쪽에서 확보한다(6.93:1 / 7.71:1).
              className="rounded-md bg-accent px-4 py-2 text-small text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              배포 사이트 열기
            </a>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            // 기존 bg-primary + text-white 는 다크에서 --text 가 near-white 라
            // 흰 배경에 흰 글자(1.03:1)가 됐다. 채우기 없는 보조 버튼으로 교체.
            className="rounded-md border border-muted/40 px-4 py-2 text-small text-primary transition-colors hover:bg-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            닫기
          </button>
        </footer>
      </ProjectModal>
    </motion.article>
  );
}
