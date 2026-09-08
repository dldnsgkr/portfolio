import clsx from "clsx";
import IconButton from "../button/IconButton";
import type { SkillWrapperType } from "@/types/skillsList.types";
import { DARK_INVERT_ICONS } from "@/data/iconTone";

// Main 과 Experience 는 subTit 이 이미 위계를 설명하고 있다. 그 위계를 밀도로 보여준다.
// Main 은 크게(아이콘 40px), Experience 는 조밀하게(28px).
type Variant = "main" | "experience";

const SIZES = {
  main: {
    grid: "grid-cols-[repeat(auto-fill,minmax(104px,1fr))]",
    cell: "min-h-[104px] gap-2.5",
    icon: "h-10 w-10",
    label: "text-small",
  },
  experience: {
    grid: "grid-cols-[repeat(auto-fill,minmax(84px,1fr))]",
    cell: "min-h-[80px] gap-2",
    icon: "h-7 w-7",
    label: "text-[0.75rem] leading-tight",
  },
} satisfies Record<Variant, Record<string, string>>;

const SkillsWrapper = ({
  mainTit,
  subTit,
  className,
  skillList,
  variant = "main",
}: SkillWrapperType & { variant?: Variant }) => {
  const size = SIZES[variant];

  return (
    // 바깥 보더 박스는 없앴다 — 회색 슬래브처럼 무거웠고, 그룹 구분은 제목과 여백으로 충분하다.
    <section className={clsx("flex flex-col", className)}>
      <h3 className="text-h3 font-semibold text-primary">{mainTit}</h3>
      <p className="mt-1 text-small text-muted">{subTit}</p>

      <div className={clsx("mt-6 grid gap-y-2", size.grid)}>
        {skillList.map((skillObj) => (
          <IconButton
            key={skillObj.name}
            skillObj={skillObj}
            className={clsx(size.cell, size.label)}
          >
            {skillObj.imgPath ? (
              <img
                src={skillObj.imgPath}
                alt={skillObj.imgAlt}
                loading="lazy"
                className={clsx(
                  size.icon,
                  "pointer-events-none object-contain transition duration-300 ease-out",
                  // 라이트: PC 에서만 grayscale — 터치 기기는 hover 가 없어 회색으로 굳는다
                  "pc:grayscale pc:opacity-70 pc:group-hover:grayscale-0 pc:group-hover:opacity-100",
                  // 다크: grayscale 를 끄고 불투명도를 0.9 로. 딥 그린 위에서 0.7 은 너무 흐리다
                  "dark:pc:grayscale-0 dark:opacity-90 dark:pc:group-hover:opacity-100",
                  // 순수 검정 단색 로고는 다크에서 뒤집지 않으면 형체가 남지 않는다
                  DARK_INVERT_ICONS.has(skillObj.name) && "dark:invert",
                )}
              />
            ) : (
              <span
                className={clsx(
                  size.icon,
                  "flex items-center justify-center text-[0.7rem] font-semibold text-muted",
                )}
                aria-hidden="true"
              >
                {skillObj.name.slice(0, 2)}
              </span>
            )}
            {skillObj.name}
          </IconButton>
        ))}
      </div>
    </section>
  );
};

export default SkillsWrapper;
