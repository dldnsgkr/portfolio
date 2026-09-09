import clsx from "clsx";
import ProjectCard from "./ProjectCard";
import type { ProjectWrapperType } from "@/types/projectList.types";

const ProjectWrapper = ({
  mainTit,
  subTit,
  projectList,
  className,
}: {
  mainTit: string;
  subTit: string;
  projectList: ProjectWrapperType[];
  className?: string;
}) => {
  return (
    <section className={clsx("flex flex-col", className)}>
      <h3 className="text-h3 font-semibold text-primary">{mainTit}</h3>
      <p className="mt-1 text-small text-muted">{subTit}</p>

      {/* [안 B] auto-rows-fr 제거 + items-start — 카드가 각자 내용 높이를 갖는다.
          auto-rows-fr 만 빼면 그리드 기본 stretch 가 행 안에서 높이를 다시 맞추므로
          items-start 까지 있어야 실제로 "내용 높이"가 된다. */}
      {/* CSS columns 기반 masonry. 카드 높이 편차가 커서(썸네일 유무가 지배적)
          grid 로는 행마다 빈 구멍이 생겼다 — Work 그리드 1071px 중 187px 이 빈 공간이었다.
          JS masonry 는 lazy 이미지 로드마다 재측정이 필요해 레이아웃이 튀므로 CSS 에 맡긴다.
          대가: 시각적 읽는 순서가 행 우선에서 열 우선으로 바뀐다.
          DOM 순서는 그대로라 스크린리더·키보드 Tab 은 원본 순서를 따른다. */}
      <div className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {projectList.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectWrapper;
