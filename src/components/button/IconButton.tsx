import { useState } from "react";
import Popup from "../popup/Popup";
import type { SkillWrapperType } from "@/types/skillsList.types";

const IconButton = ({
  children,
  skillObj,
}: {
  children: React.ReactNode;
  skillObj: SkillWrapperType["skillList"][number];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="
        group
        flex flex-col justify-center items-center
        min-w-[80px]
        min-h-[112px]
        px-3 py-2
        text-sm
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-white transition-colors duration-300 ease-in-out"
      >
        {children}
      </button>
      <Popup open={open} title={skillObj.name} onClose={() => setOpen(false)}>
        <ul>
          {skillObj.textDatas?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </Popup>
    </>
  );
};

export default IconButton;
