import clsx from "clsx";
import IconButton from "../button/IconButton";
import type { SkillWrapperType } from "@/types/skillsList.types";

const SkillsWrapper = ({
  mainTit,
  subTit,
  className,
  skillList,
}: SkillWrapperType) => {
  return (
    <div className={clsx("flex flex-col gap-3 flex-1", className)}>
      <div>
        <strong>{mainTit}</strong>
        <p>{subTit}</p>
      </div>
      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-5
        lg:grid-cols-5
        xl:grid-cols-5
        border border-border rounded-md"
      >
        {skillList.map((skillObj) => {
          return (
            <IconButton key={skillObj.name} skillObj={skillObj}>
              {skillObj.imgPath ? (
                <img
                  src={skillObj.imgPath}
                  alt={skillObj.imgAlt}
                  className="w-9 h-9 pointer-events-none pc:grayscale pc:opacity-70 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:opacity-100"
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
