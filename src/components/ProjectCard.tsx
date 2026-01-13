import { motion } from "framer-motion";
import TestImage from "../assets/image/test_image.png";
import ProjectModal from "./ProjectModal";
import { useState } from "react";

export default function ProjectCard({
  title,
  description,
  contentText,
}: {
  title: string;
  description: string;
  contentText: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-colors duration-500 ease-in-out"
      onClick={() => setOpen(true)}
    >
      <img
        src={TestImage}
        alt={`${title} project image`}
        className="mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-2 transition-colors duration-500 ease-in-out">
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
            This is a detailed description of the project.
          </p>
        </header>
        <section className="space-y-4">
          <img src={TestImage} alt={`${title} project image`} />
          <ul className="m-2 list-disc pl-5 space-y-2 text-muted dark:text-muted-dark marker:text-primary dark:marker:text-primary-dark">
            {contentText.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </section>
        <footer className="mt-6 flex justify-end">
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
