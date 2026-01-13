export type SkillWrapperType = {
  secTit: string;
  className?: string;
  // skill 목록
  skillList: {
    // 이미지 경로
    imgPath?: string;
    // 이미지 대체 텍스트
    imgAlt?: string;
    // skill 이름
    name: string;
    // 텍스트 데이터
    textDatas?: string[];
  }[];
};
