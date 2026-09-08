import { useState } from "react";
import clsx from "clsx";
import Popup from "../popup/Popup";
import type { SkillWrapperType } from "@/types/skillsList.types";

const IconButton = ({
  children,
  skillObj,
  className,
}: {
  children: React.ReactNode;
  skillObj: SkillWrapperType["skillList"][number];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const hasDetails = (skillObj.textDatas?.length ?? 0) > 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        // 기존 text-gray-600 / hover:text-gray-900 은 팔레트 밖 회색이라
        // 다크에서 스킬 이름이 배경에 묻혔다. 토큰으로 바꾼다.
        className={clsx(
          "group flex flex-col items-center justify-center break-keep px-2 py-3 text-center",
          "text-muted hover:text-primary",
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
