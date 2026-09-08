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
      <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectList.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectWrapper;
