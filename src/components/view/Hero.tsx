import { motion, useReducedMotion, type Variants } from "framer-motion";
import { profile } from "@/data/profile";
import HeroLamp from "./HeroLamp";

// 이 페이지에서 과감함을 쓰는 유일한 자리. 나머지 섹션은 조용하게 간다.
// 위계는 색이 아니라 활자 크기와 굵기로만 만든다 (단어 단위 색 강조 없음).
export default function Hero() {
  const reduceMotion = useReducedMotion();

  // href 가 빈 값인 링크는 렌더하지 않는다 — 눌러도 아무 일 없는 링크를 두지 않는다.
  const links = profile.links.filter((link) => link.href !== "");

  // 로드 시 1회만: 모노그램 → 이름 → 역할·카피 → 링크. 마지막 요소가 600ms 안에 끝난다.
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      // 명시적 duration 은 App 의 MotionConfig 기본값을 덮으므로 직접 가드한다
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.24, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      className="relative flex min-h-[calc(86svh-6rem)] w-full flex-col justify-center"
    >
      {/* 다크 모드에서 천장 램프가 내려와 Hero 를 비춘다 */}
      <HeroLamp />

      {/* 모노그램이 흐름 안으로 들어왔으므로 광학 보정용 mb 반응형 분기는 없앴다.
          겹침이 구조적으로 생기지 않고, 간격이 뷰포트 폭에 따라 흔들리지도 않는다. */}
      <div className="relative z-10">
        {/* 램프가 이름 위 자리를 쓰게 되어 모노그램은 뺐다.
            둘 다 스페이드를 말하는데 램프가 훨씬 강해 중복이었다.
            되살리려면 아래 한 줄의 주석을 풀면 된다. */}
        {/* <HeroCardIndex variants={item} /> */}

        <motion.h1 variants={item}>
          <span className="block text-[clamp(3.25rem,7vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
            {profile.name}
          </span>
          <span className="mt-2 block font-display text-[2.25rem] font-normal leading-none text-muted">
            {profile.alias}
          </span>
        </motion.h1>

        <motion.div variants={item} className="mt-9">
          <p className="text-[1.25rem] font-medium text-primary">
            Full Stack Developer
          </p>
          <p className="mt-2 max-w-prose text-body text-muted">
            UI부터 API까지,
            <br />
            서비스의 처음과 끝을 만듭니다.
          </p>
        </motion.div>

        {links.length > 0 && (
          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-3"
          >
            {links.map((link) => (
              <li key={link.label}>
                {/* Hero 에서 밑줄이 유일한 링크 표식이므로 비텍스트 UI 기준(3:1)을 적용한다.
                    muted/85 → 라이트 4.07:1 / 다크 5.64:1 */}
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="text-body text-primary underline decoration-muted/85 decoration-1 underline-offset-4 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  );
}
