import { motion } from "framer-motion";
import TestImage from "../../assets/image/test_image.png";
import ProjectModal from "./ProjectModal";
import { useState } from "react";
import type { ProjectWrapperType } from "@/types/projectList.types";

export default function ProjectCard(props: ProjectWrapperType) {
  const [open, setOpen] = useState(false);

  const {
    title,
    description,
    contentText,
    imageList,
    stackList,
    troubleShooting,
  } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-colors duration-500 ease-in-out"
      onClick={() => setOpen(true)}
    >
      {imageList && imageList.length > 0 ? (
        <img
          src={imageList && imageList.length > 0 ? imageList[0] : TestImage}
          alt={`${title} project main image`}
          className="w-full h-64 mb-4 rounded-md"
        />
      ) : (
        <div className="w-full h-64 mb-4 flex items-center justify-center rounded-md bg-muted/30 text-muted text-sm">
          이미지가 없는 프로젝트입니다
        </div>
      )}
      <h3 className="text-xl font-semibold break-keep text-primary dark:text-primary-dark mb-2 transition-colors duration-500 ease-in-out">
        {title}
      </h3>
      <p className="text-muted dark:text-muted-dark transition-colors duration-500 ease-in-out">
        {description}
      </p>
      {/* portal modal */}
      <ProjectModal open={open} onClose={() => setOpen(false)}>
        <header className="mb-4">
          <h3 className="text-2xl font-semibold text-primary dark:text-primary-dark transition-colors duration-500">
            {title}
          </h3>
          <p className="mt-2 text-muted dark:text-muted-dark transition-colors duration-500">
            {description}
          </p>
        </header>
        <section className="flex-1 overflow-y-auto space-y-4">
          <div
            className="flex gap-2 overflow-auto"
            onWheel={(e) => {
              e.currentTarget.scrollLeft += e.deltaY;
            }}
          >
            {imageList?.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${title} project image`}
                className="mb-4 rounded-md"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span>담당 역할 및 주요 구현 기능</span>
            <ul className="ml-2 list-disc pl-5 text-muted dark:text-muted-dark marker:text-primary dark:marker:text-primary-dark">
              {contentText.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
          {stackList && (
            <div className="flex flex-col gap-2">
              <span>기술 스택</span>
              <div className="ml-2 pl-5 text-muted dark:text-muted-dark marker:text-primary dark:marker:text-primary-dark">
                {stackList?.join(" · ")}
              </div>
            </div>
          )}
          {troubleShooting && (
            <div className="flex flex-col gap-2">
              <span>트러블 슈팅</span>
              <div className="ml-2 pl-5 text-muted dark:text-muted-dark marker:text-primary dark:marker:text-primary-dark">
                {troubleShooting.map((item, index) => (
                  <div key={index} className="mb-2">
                    {item.title && (
                      <strong className="block mb-1">{item.title}</strong>
                    )}
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <footer className="pc:mt-6 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="mt-4 px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-md transition-colors duration-500 ease-in-out"
          >
            Close
          </button>
        </footer>
      </ProjectModal>
    </motion.div>
  );
}
