import { projectListData, toyProjectListData } from "@/data/projectList";
import SectionTitle from "../SectionTitle";
import ProjectWrapper from "../project/ProjectWrapper";

const Project = () => {
  return (
    <div>
      <SectionTitle children="Projects" />
      <div className="flex flex-col gap-14">
        <ProjectWrapper
          mainTit="Work Projects"
          subTit="실무 환경에서 참여한 프로젝트"
          projectList={projectListData}
        />
        <ProjectWrapper
          mainTit="Toy Projects"
          subTit="개인적으로 기획·구현한 프로젝트"
          projectList={toyProjectListData}
        />
      </div>
    </div>
  );
};

export default Project;
