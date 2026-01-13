import { projectListData } from "@/data/projectList";
import ProjectCard from "../ProjectCard";
import SectionTitle from "../SectionTitle";

const Project = () => {
  return (
    <section className="min-h-screen flex flex-col p-6">
      <SectionTitle children="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectListData.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            contentText={project.contentText}
          />
        ))}
      </div>
    </section>
  );
};

export default Project;
