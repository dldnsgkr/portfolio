export type ProjectWrapperType = {
  title: string;
  // project의 핵심 간단 설명
  description: string;
  // 서문 및 주요 작업 기능
  contentText: string[];
  // image list
  imageList?: string[];
  // git 주소
  gitLink?: string;
  // 사용된 기술 스택
  stackList?: string[];
  // 문제 발생 및 해결 과정
  troubleShooting?: {
    title: string;
    content: string;
  }[];
};
