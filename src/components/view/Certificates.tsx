import SectionTitle from "../SectionTitle";

type CertificateItem = {
  title: string;
  organization: string;
  date: string;
  description?: string;
};

const certificateData: CertificateItem[] = [
  {
    title: "정보처리기사",
    organization: "한국산업인력공단",
    date: "2025",
    description: "소프트웨어 개발 및 시스템 설계 관련 자격증",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    date: "2026",
    description: "클라우드 기본 개념 및 AWS 서비스 이해",
  },
];

const Certificates = () => {
  return (
    <section
      id="certificates"
      className="flex flex-col p-6 pc:py-20 bg-background dark:bg-background-dark text-primary dark:text-primary-dark transition-colors duration-500 ease-in-out"
    >
      <div className="max-w-5xl mx-auto w-full">
        <SectionTitle>Certificates</SectionTitle>

        <div className="grid grid-cols-1 pc:grid-cols-2 gap-6 mt-10">
          {certificateData.map((item, idx) => (
            <div
              key={idx}
              className="
                p-6 rounded-2xl
                border border-muted dark:border-muted-dark
                bg-white/50 dark:bg-background-dark/50
                backdrop-blur
                transition-all duration-300
                hover:shadow-lg
              "
            >
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted dark:text-muted-dark">
                  {item.date}
                </span>

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <span className="text-sm text-accent dark:text-accent-dark">
                  {item.organization}
                </span>

                {item.description && (
                  <p className="text-sm text-muted dark:text-muted-dark mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
