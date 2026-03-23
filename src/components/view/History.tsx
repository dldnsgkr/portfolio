import SectionTitle from "../SectionTitle";

type HistoryItem = {
  date: string;
  title: string;
  description?: string;
};

const historyData: HistoryItem[] = [
  {
    date: "2024",
    title: "프론트엔드 개발 시작",
    description: "React, TypeScript 기반 프로젝트 진행",
  },
  {
    date: "2025",
    title: "팀 프로젝트 경험",
    description: "Next.js + TanStack Query 기반 협업 경험",
  },
  {
    date: "2026",
    title: "풀스택 확장",
    description: "Node.js, AWS 기반 배포 및 백엔드 경험",
  },
];

const History = () => {
  return (
    <section
      id="history"
      className="flex flex-col p-6 pc:py-20 bg-background dark:bg-background-dark text-primary dark:text-primary-dark transition-colors duration-500 ease-in-out"
    >
      <div className="max-w-5xl mx-auto w-full">
        <SectionTitle>History</SectionTitle>

        <div className="relative mt-16">
          {/* ✅ PC 중앙 라인 */}
          <div className="hidden pc:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-muted dark:bg-muted-dark" />

          {/* ✅ 모바일 라인 */}
          <div className="pc:hidden absolute left-3 top-0 bottom-0 w-[2px] bg-muted dark:bg-muted-dark" />

          <div className="flex flex-col gap-16">
            {historyData.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex items-center">
                  {/* ===================== */}
                  {/* 💻 PC 지그재그 */}
                  {/* ===================== */}
                  <div
                    className={`hidden pc:flex w-full items-center ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-[45%] ${
                        isLeft ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
                      <span className="text-sm text-muted dark:text-muted-dark">
                        {item.date}
                      </span>

                      <h3 className="text-lg font-semibold mt-1">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-muted dark:text-muted-dark mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===================== */}
                  {/* 📱 모바일 단일 라인 */}
                  {/* ===================== */}
                  <div className="pc:hidden pl-10">
                    <span className="text-sm text-muted dark:text-muted-dark">
                      {item.date}
                    </span>

                    <h3 className="text-lg font-semibold mt-1">{item.title}</h3>

                    {item.description && (
                      <p className="text-sm text-muted dark:text-muted-dark mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* ===================== */}
                  {/* 🔵 공통 점 */}
                  {/* ===================== */}
                  <div
                    className={`
                      absolute w-4 h-4 rounded-full bg-accent dark:bg-accent-dark
                      transition-colors duration-500 ease-in-out
                      ${"pc:left-1/2 pc:-translate-x-1/2 left-1"}
                    `}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
