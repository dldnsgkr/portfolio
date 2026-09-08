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
    period,
    contentText,
    imageList,
    stackList,
    troubleShooting,
    deployLink,
  } = props;

  const periodText = period
    ? `${period.start} ~ ${period.end ?? "진행중"}`
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer"
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
      <h3 className="text-xl font-semibold break-keep text-primary mb-2">
        {title}
      </h3>
      {periodText && (
        <p className="text-xs text-muted mb-1">
          {periodText}
        </p>
      )}
      <p className="text-muted">
        {description}
      </p>
      {/* portal modal */}
      <ProjectModal open={open} onClose={() => setOpen(false)}>
        <header className="mb-4">
          <h3 className="text-2xl font-semibold text-primary">
            {title}
          </h3>
          {periodText && (
            <p className="mt-1 text-xs text-muted">
              {periodText}
            </p>
          )}
          <p className="mt-2 text-muted">
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
            <div className="flex flex-col gap-1">
              {contentText.map((text, index) => (
                <div key={index} className="flex gap-2 text-muted">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          {stackList && (
            <div className="flex flex-col gap-2">
              <span>기술 스택</span>
              <div className="ml-2 pl-5 text-muted marker:text-primary">
                {stackList?.join(" · ")}
              </div>
            </div>
          )}
          {troubleShooting && (
            <div className="flex flex-col gap-2">
              <span>트러블 슈팅</span>
              <div className="ml-2 pl-5 text-muted marker:text-primary">
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
        <footer className="pc:mt-6 flex justify-between items-center">
          {deployLink ? (
            <a
              href={deployLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-accent text-white rounded-md text-sm hover:opacity-80"
            >
              배포 링크 →
            </a>
          ) : (
            <span />
          )}
          <button
            onClick={() => setOpen(false)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Close
          </button>
        </footer>
      </ProjectModal>
    </motion.div>
  );
}
