import SectionTitle from "../SectionTitle";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="flex flex-col px-6 py-20 bg-background dark:bg-background-dark text-primary dark:text-primary-dark transition-colors duration-500 ease-in-out"
    >
      <div className="max-w-3xl mx-auto text-left">
        <SectionTitle>About Me</SectionTitle>

        <p className="text-lg text-muted dark:text-muted-dark mb-6 leading-relaxed transition-colors duration-500 ease-in-out">
          안녕하세요,{" "}
          <span className="text-accent dark:text-accent-dark font-semibold transition-colors duration-500 ease-in-out">
            Jace
          </span>
          입니다. 약 4년 가까운 경력을 가진 프론트엔드 개발자로, 사용자 경험을
          고려한 안정적이고 유지보수 가능한 웹 애플리케이션을 만드는 데에 집중해
          왔습니다.
        </p>

        <p className="text-lg text-muted dark:text-muted-dark mb-6 leading-relaxed transition-colors duration-500 ease-in-out">
          주로{" "}
          <span className="text-primary dark:text-primary-dark font-medium transition-colors duration-500 ease-in-out">
            React, TypeScript, Next.js, Tailwind CSS
          </span>
          를 기반으로 작업하며, 컴포넌트 구조 설계와 상태 관리, 폼 처리 등
          실무에서 자주 마주치는 문제들을 정리된 코드로 풀어내는 것을 중요하게
          생각합니다.
        </p>

        <p className="text-lg text-muted dark:text-muted-dark leading-relaxed transition-colors duration-500 ease-in-out">
          기능의 핵심 흐름에는 주석을 남기고, 복잡한 로직은 최대한 분리하여 읽기
          쉬운 코드로 정리하려고 노력합니다. 이 포트폴리오는 이력서용
          결과물이자, 그동안의 고민과 학습 과정을 기록하는 공간으로 활용하고
          있습니다.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
