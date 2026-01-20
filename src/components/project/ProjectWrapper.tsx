import clsx from "clsx";
import ProjectCard from "./ProjectCard";
import type { ProjectWrapperType } from "@/types/projectList.types";

const ProjectWrapper = ({
  mainTit,
  subTit,
  projectList,
}: {
  mainTit: string;
  subTit: string;
  projectList: ProjectWrapperType[];
}) => {
  return (
    <div className={clsx("flex flex-col gap-3 flex-1")}>
      <div>
        <strong>{mainTit}</strong>
        <p>{subTit}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            contentText={project.contentText}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectWrapper;
