import { MotionConfig, useReducedMotion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/view/Hero";
import Section from "./components/Section";
import AboutMe from "./components/view/AboutMe";
import Project from "./components/view/Project";
// import Contact from "./components/view/Contact";
import Skills from "./components/view/Skills";
import History from "./components/view/History";
import CoverLetter from "./components/view/CoverLetter";
// import Certificates from "./components/view/Certificates";

export default function App() {
  // 스크롤 스파이는 Header 의 useScrollSpy 로 옮겼다.
  // 여기 있던 scroll 리스너는 offsetTop 을 재고 reduce 로 계산해놓고
  // 결과를 어디에도 쓰지 않았다.
  const reduceMotion = useReducedMotion();

  return (
    // CSS 로는 framer-motion 애니메이션을 막을 수 없다. reducedMotion="user" 가
    // transform·layout 애니메이션을 끄고, duration 0 이 남은 전환까지 즉시로 만든다.
    // 카드 hover, 모달·시트 전환, 헤더 hide/show, 아코디언이 모두 여기에 걸린다.
    <MotionConfig
      reducedMotion="user"
      transition={reduceMotion ? { duration: 0 } : undefined}
    >
      <Header />
      <main className="min-h-screen text-primary">
        {/* 배경 톤을 bg / surface 로 번갈아 주어 섹션 리듬을 만든다 */}
        <Section id="hero" fullHeight>
          <Hero />
        </Section>

        <Section id="about" tone="surface">
          <AboutMe />
        </Section>

        <Section id="cover">
          <CoverLetter />
        </Section>

        <Section id="history" tone="surface">
          <History />
        </Section>

        {/* <Section id="certificates">
          <Certificates />
        </Section> */}

        <Section id="skills">
          <Skills />
        </Section>

        <Section id="projects" tone="surface">
          <Project />
        </Section>

        {/* <Section id="contact">
          <Contact />
        </Section> */}
      </main>
    </MotionConfig>
  );
}
