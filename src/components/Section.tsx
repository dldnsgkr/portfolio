import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Section({
  id,
  children,
  noPadding,
}: {
  id: string;
  children: React.ReactNode;
  noPadding?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${noPadding ? "" : "py-24"}
        bg-background dark:bg-background-dark
        text-primary dark:text-primary-dark
        border-b border-x-slate-200 dark:border-x-slate-700
        transition-colors duration-500 ease-in-out`}
    >
      {children}
    </motion.section>
  );
}
