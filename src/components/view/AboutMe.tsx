import { motion, useReducedMotion, type Variants } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { reveal } from "@/lib/reveal";
import { useRevealOnce } from "@/lib/useRevealOnce";

const AboutMe = () => {
  const reduceMotion = useReducedMotion();
  const [ref, shown] = useRevealOnce<HTMLDivElement>();

  // 산문 섹션이라 동작도 산문의 것으로 둔다 — 읽는 순서대로 문단이 하나씩 들어온다.
  // 이동량을 4px 로 눌러서 "떠오르는 카드"가 아니라 "잉크가 앉는" 느낌에 가깝게 했다.
  const stack: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };
  const line: Variants = {
    hidden: { opacity: 0, y: 4 },
    shown: {
      opacity: 1,
      y: 0,
      transition: reveal(reduceMotion, { duration: 0.4, ease: "easeOut" }),
    },
  };

  return (
    // 문단 강조(색·굵기)는 걷어냈다. 이름은 Hero 가 크게 다루므로 여기서 반복하지 않는다.
    <motion.div
      ref={ref}
      className="max-w-prose"
      variants={stack}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
    >
      <SectionTitle>About Me</SectionTitle>

      <motion.p variants={line} className="text-body-lg text-muted mb-6">
        안녕하세요, Jace입니다. 약 3년간 프론트엔드 개발자로 실무 경험을
        쌓아왔으며, 사용자 경험을 고려한 안정적이고 유지보수 가능한 웹
        애플리케이션을 만드는 데 집중해왔습니다.
      </motion.p>

      <motion.p variants={line} className="text-body-lg text-muted mb-6">
        주로 React, TypeScript, Next.js, Tailwind CSS를 기반으로 작업하며,
        컴포넌트 구조 설계와 상태 관리, 폼 처리 등 실무에서 자주 마주치는
        문제들을 정리된 코드로 풀어내는 것을 중요하게 생각합니다.
      </motion.p>

      <motion.p variants={line} className="text-body-lg text-muted mb-6">
        최근에는 학교 동아리 활동과 개인 프로젝트를 통해 Spring Boot, NestJS,
        FastAPI 등 백엔드 기술도 함께 학습하며 풀스택으로 역량을 확장하고
        있습니다. 프론트엔드의 깊이를 유지하면서도 서비스 전반의 흐름을 이해하는
        개발자가 되는 것이 목표입니다.
      </motion.p>

      <motion.p variants={line} className="text-body-lg text-muted">
        이 포트폴리오는 그동안의 고민과 학습 과정을 기록하는 공간으로 활용하고
        있습니다.
      </motion.p>
    </motion.div>
  );
};

export default AboutMe;
