import { useState } from "react";
import clsx from "clsx";
import Popup from "../popup/Popup";
import type { SkillWrapperType } from "@/types/skillsList.types";

const IconButton = ({
  children,
  skillObj,
  className,
  magnetic = false,
}: {
  children: React.ReactNode;
  skillObj: SkillWrapperType["skillList"][number];
  className?: string;
  // true 면 useMagneticGrid 가 이 버튼의 transform 을 매 프레임 쓴다.
  // 리빌 애니메이션은 바깥 래퍼가 맡으므로 여기 transform 은 비어 있어야 한다.
  magnetic?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const hasDetails = (skillObj.textDatas?.length ?? 0) > 0;

  return (
    <>
      <button
        {...(magnetic ? { "data-magnet": "" } : {})}
        onClick={() => setOpen(true)}
        type="button"
        // 기존 text-gray-600 / hover:text-gray-900 은 팔레트 밖 회색이라
        // 다크에서 스킬 이름이 배경에 묻혔다. 토큰으로 바꾼다.
        className={clsx(
          "group flex flex-col items-center justify-center break-keep px-1.5 py-2 text-center",
          // grayscale→컬러 hover 를 걷어냈으므로 클릭 가능하다는 신호는 셀이 맡는다
          // transform 도 전환 대상에 넣는다 — 자기장이 매 프레임 목표를 바꾸면
          // 이 전환이 지수적 추종이 되어 커서를 부드럽게 따라온다.
          "text-muted transition-[color,background-color,transform] duration-200 ease-out hover:bg-muted/10 hover:text-primary",
          "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        aria-label={
          hasDetails ? `${skillObj.name} — 사용 경험 보기` : skillObj.name
        }
      >
        {children}
      </button>
      <Popup open={open} title={skillObj.name} onClose={() => setOpen(false)}>
        <ul className="mt-2 list-[upper-roman] pl-5 space-y-1.5 text-sm">
          {skillObj.textDatas?.map((detail, index) => (
            <li key={index} className="leading-relaxed">
              {detail}
            </li>
          ))}
        </ul>
      </Popup>
    </>
  );
};

export default IconButton;
