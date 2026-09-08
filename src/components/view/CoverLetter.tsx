import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { coverLetterData } from "@/data/coverLetter";

export default function CoverLetter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // 카드는 컨테이너 전체 폭을 쓴다. 여기에 max-w-prose 를 걸면 아래
    // History / Skills / Projects 가 전체 폭을 쓰는 것과 어긋나 오른쪽이 빈다.
    // 줄 길이 제한은 실제로 긴 글이 들어가는 펼친 문단에만 적용한다.
    <div>
      <SectionTitle>Cover Letter</SectionTitle>

      <div className="mt-10 flex flex-col gap-4">
        {coverLetterData.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="border border-border rounded-xl overflow-hidden"
            >
              {/* 번호 마커는 뺐다 — 자기소개서 4개 항목은 시계열도 절차도 아니라
                  순서가 정보를 담지 않는다. 구분은 활자 크기·굵기와 여백으로만. */}
              <button
                type="button"
                onClick={() => setOpen(idx, isOpen)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-surface hover:bg-muted/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <span className="text-h3 font-semibold text-primary">
                  {item.title}
                </span>

                {/* + / − 한 축. 세로 막대만 90° 회전해 닫힘(+) ↔ 열림(−) 이 된다. */}
                <span
                  aria-hidden="true"
                  className="relative grid h-4 w-4 shrink-0 place-items-center"
                >
                  <span className="absolute h-[1.5px] w-4 bg-muted" />
                  <motion.span
                    animate={{ rotate: isOpen ? 0 : 90 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute h-[1.5px] w-4 bg-muted"
                  />
                </span>
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
                    <div className="border-t border-border px-6 pb-6 pt-4">
                      {/* 구분선은 카드 폭 전체, 본문만 68ch */}
                      <div className="flex max-w-prose flex-col gap-4">
                        {item.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-body text-muted">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );

  function setOpen(idx: number, isOpen: boolean) {
    setOpenIndex(isOpen ? null : idx);
  }
}
