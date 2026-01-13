const SectionTitle = ({ children }: { children: React.ReactNode | string }) => {
  return (
    <h2 className="relative text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark mb-8 font-serif tracking-wide transition-colors duration-500 ease-in-out">
      {children}
      <span className="absolute left-0 -bottom-2 w-12 h-[2px] bg-accent dark:bg-accent-dark rounded-full transition-colors duration-500 ease-in-out"></span>
    </h2>
  );
};

export default SectionTitle;
