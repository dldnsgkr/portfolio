import { projectListData, toyProjectListData } from "@/data/projectList";
import SectionTitle from "../SectionTitle";
import ProjectWrapper from "../project/ProjectWrapper";

const Project = () => {
  return (
    <section className="min-h-screen flex flex-col p-6">
      <SectionTitle children="Projects" />
      <div className="flex flex-col pc:gap-10 gap-6">
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
    </section>
  );
};

export default Project;
