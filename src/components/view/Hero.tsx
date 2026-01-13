import { motion } from "framer-motion";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center items-center
        bg-background dark:bg-background-dark
        text-primary dark:text-primary-dark
        transition-colors duration-500 ease-in-out"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={item}
        className="text-5xl font-semibold mb-4 tracking-tight transition-colors duration-500 ease-in-out"
      >
        Hello, I'm{" "}
        <span className="text-accent dark:text-accent-dark transition-colors duration-500 ease-in-out">
          Frontend Developer
        </span>
      </motion.h1>
      <motion.p
        variants={item}
        className="text-muted dark:text-muted-dark text-lg mb-8 max-w-md text-center transition-colors duration-500 ease-in-out"
      >
        I craft clean and modern user interfaces with React and modern web tech.
      </motion.p>
    </motion.section>
  );
}
