import { experienceStacksData, mainStacksData } from "@/data/skiilsList";
import SectionTitle from "../SectionTitle";
import SkillsWrapper from "../skills/SkillsWrapper";

const Skills = () => {
  return (
    <section className="min-h-screen flex flex-col p-6">
      <SectionTitle children="Skills" />
      <div className="flex gap-6">
        <SkillsWrapper
          secTit={mainStacksData.secTit}
          className={mainStacksData.className}
          skillList={mainStacksData.skillList}
        />
        <SkillsWrapper
          secTit={experienceStacksData.secTit}
          className={experienceStacksData.className}
          skillList={experienceStacksData.skillList}
        />
      </div>
    </section>
  );
};

export default Skills;
