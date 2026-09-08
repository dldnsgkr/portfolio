const SectionTitle = ({ children }: { children: React.ReactNode | string }) => {
  return (
    <h2 className="relative text-3xl md:text-4xl font-bold text-primary mb-8 font-serif tracking-wide">
      {children}
      <span className="absolute left-0 -bottom-2 w-12 h-[2px] bg-accent rounded-full"></span>
    </h2>
  );
};

export default SectionTitle;
