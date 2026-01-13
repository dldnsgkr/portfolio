import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/view/Hero";
import Section from "./components/Section";
import { throttle } from "./lib/utils";
import AboutMe from "./components/view/AboutMe";
import Project from "./components/view/Project";
import Contact from "./components/view/Contact";
import Skills from "./components/view/Skills";

export default function App() {
  const sectionRefs = useRef({
    hero: null as HTMLDivElement | null,
    about: null as HTMLDivElement | null,
    projects: null as HTMLDivElement | null,
    contact: null as HTMLDivElement | null,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      const positions = Object.fromEntries(
        Object.entries(sectionRefs.current).map(([key, el]) => [
          key,
          el ? el.offsetTop : 0,
        ])
      );

      // 👇 여기서 원하는 로직 수행 (예: 현재 섹션 감지)
      const currentSection = Object.entries(positions).reduce(
        (closest, [key, pos]) => (scrollY >= pos - 200 ? key : closest), // 약간의 오차 허용
        "hero"
      );

      console.log("현재 섹션:", currentSection);
    }, 150); // 150ms 단위로 제한

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen transition-colors duration-500 ease-in-out bg-background dark:bg-background-dark text-primary dark:text-primary-dark">
        <Section id="hero" noPadding>
          <Hero />
        </Section>

        <Section id="about">
          <AboutMe />
        </Section>

        <Section id="skills">
          <Skills />
        </Section>

        <Section id="projects">
          <Project />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>
      </main>
    </>
  );
}
