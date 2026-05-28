import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { coverLetterData } from "@/data/coverLetter";

export default function CoverLetter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="cover"
      className="flex flex-col p-6 pc:py-20 bg-background dark:bg-background-dark text-primary dark:text-primary-dark transition-colors duration-500 ease-in-out"
    >
      <div className="max-w-3xl mx-auto w-full">
        <SectionTitle>Cover Letter</SectionTitle>

        <div className="mt-10 flex flex-col gap-4">
          {coverLetterData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-border dark:border-border-dark rounded-xl overflow-hidden transition-colors duration-500 ease-in-out"
              >
                <button
                  onClick={() => setOpen(idx, isOpen)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-surface dark:bg-surface-dark hover:bg-muted/10 dark:hover:bg-muted-dark/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-accent dark:text-accent-dark w-6 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-primary dark:text-primary-dark transition-colors duration-500">
                      {item.title}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl text-muted dark:text-muted-dark shrink-0 ml-4"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-border dark:border-border-dark">
                        {item.paragraphs.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-sm leading-relaxed text-muted dark:text-muted-dark transition-colors duration-500"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  function setOpen(idx: number, isOpen: boolean) {
    setOpenIndex(isOpen ? null : idx);
  }
}
