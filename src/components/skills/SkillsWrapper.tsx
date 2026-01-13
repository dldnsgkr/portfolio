import clsx from "clsx";
import IconButton from "../button/IconButton";
import type { SkillWrapperType } from "@/types/slillsList.types";

const SkillsWrapper = ({ secTit, className, skillList }: SkillWrapperType) => {
  return (
    <div className={clsx("flex-1", className)}>
      <strong>{secTit}</strong>
      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        border border-border rounded-md"
      >
        {skillList.map((skillObj) => {
          return (
            <IconButton>
              {skillObj.imgPath ? (
                <img
                  src={skillObj.imgPath}
                  alt={skillObj.imgAlt}
                  className="w-9 h-9 grayscale opacity-70 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : (
                <span className="w-9 h-9 flex items-center justify-center text-xs font-mono font-semibold">
                  {skillObj.name}
                </span>
              )}
              {skillObj.name}
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsWrapper;
