const IconButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className="
        group
        flex flex-col justify-center items-center 
        min-w-[80px]
        px-3 py-2
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-white transition-colors duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default IconButton;
