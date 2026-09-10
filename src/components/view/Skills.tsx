import { experienceStacksData, mainStacksData } from "@/data/skiilsList";
import SectionTitle from "../SectionTitle";
import SkillsWrapper from "../skills/SkillsWrapper";

const Skills = () => {
  return (
    <div>
      <SectionTitle children="Skills" />

      {/* 좌우 2열을 버리고 세로로 쌓는다. Main 은 짧고 Experience 는 3배 이상 길어서
          나란히 두면 왼쪽 아래가 크게 비고, 마지막 줄에 고아 항목이 남았다.
          전체 폭을 쓰면 열 수가 늘어 두 문제가 같이 완화된다. */}
      <div className="flex flex-col gap-14">
        <SkillsWrapper
          variant="main"
          mainTit={mainStacksData.mainTit}
          subTit={mainStacksData.subTit}
          className={mainStacksData.className}
          skillList={mainStacksData.skillList}
        />
        <SkillsWrapper
          variant="experience"
          mainTit={experienceStacksData.mainTit}
          subTit={experienceStacksData.subTit}
          className={experienceStacksData.className}
          skillList={experienceStacksData.skillList}
        />
      </div>
    </div>
  );
};

export default Skills;
