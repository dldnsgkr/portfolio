import clsx from "clsx";
import IconButton from "../button/IconButton";
import type { SkillWrapperType } from "@/types/skillsList.types";
import { DARK_INVERT_ICONS } from "@/data/iconTone";

// Main 과 Experience 는 subTit 이 이미 위계를 설명한다. 그 위계를 밀도로 보여준다.
type Variant = "main" | "experience";

// 셀 폭을 1fr 신축이 아니라 고정값으로 두고 justify-start 로 좌측 정렬한다.
// 1fr 이면 열이 콘텐츠 폭을 정확히 나눠 가져 마지막 줄의 빈 칸이 "표에서 빠진 셀"처럼
// 도드라진다. 고정 폭 + 좌측 정렬이면 남는 자리가 줄 끝 여백이 되어 문장 줄바꿈처럼 읽힌다.
// (항목 19개·43개는 어떤 열 수로도 나누어떨어지지 않는다 — 없앨 수 없는 문제라 덜 보이게 한다.)
const SIZES = {
  main: {
    grid: "grid-cols-[repeat(auto-fill,100px)]",
    cell: "min-h-[104px] gap-2.5",
    icon: "h-10 w-10",
    label: "text-small",
  },
  experience: {
    grid: "grid-cols-[repeat(auto-fill,88px)]",
    cell: "min-h-[64px] gap-1.5",
    icon: "h-6 w-6",
    label: "text-[0.6875rem] leading-[1.25]",
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
    // 바깥 보더 박스는 없앴다 — 회색 슬래브처럼 무거웠고, 구분은 제목과 여백으로 충분하다.
    <section className={clsx("flex flex-col", className)}>
      <h3 className="text-h3 font-semibold text-primary">{mainTit}</h3>
      <p className="mt-1 text-small text-muted">{subTit}</p>

      <div className={clsx("mt-6 grid justify-start gap-y-1", size.grid)}>
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
                  "pointer-events-none object-contain opacity-90 transition duration-300 ease-out group-hover:opacity-100",
                  // grayscale 은 걷어냈다. 측정 결과 라이트·다크 양쪽 가시성 저하의
                  // 직접 원인이었다 — 라이트에서 3:1 미달 28개 중 27개가 채도 0.35 이상,
                  // 즉 색상으로는 구분되는데 grayscale 이 그 색상을 지워 배경과 같은
                  // 밝은 회색으로 만들었다. 불투명도로는 해결되지 않는다(α=1.0 에서도 미달).
                  // 순수 검정 단색 로고만 다크에서 뒤집는다.
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
