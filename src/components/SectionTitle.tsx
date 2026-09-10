import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT, reveal } from "@/lib/reveal";
import { useRevealOnce } from "@/lib/useRevealOnce";

const SectionTitle = ({ children }: { children: React.ReactNode | string }) => {
  const reduceMotion = useReducedMotion();
  const [ref, shown] = useRevealOnce<HTMLHeadingElement>();

  return (
    <h2
      ref={ref}
      className="relative text-3xl md:text-4xl font-bold text-primary mb-8 font-serif tracking-wide"
    >
      {children}
      {/* 액센트 밑줄이 왼쪽에서 그려진다. 섹션마다 공통으로 쓰는 유일한 모션이고,
          제목 자체는 움직이지 않으므로 읽는 데 방해가 되지 않는다. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 -bottom-2 h-[2px] w-12 origin-left rounded-full bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: shown ? 1 : 0 }}
        transition={reveal(reduceMotion, { duration: 0.5, ease: EASE_OUT })}
      />
    </h2>
  );
};

export default SectionTitle;
