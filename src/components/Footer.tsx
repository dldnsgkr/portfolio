const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-12 text-center">
      <section className="max-w-xl mx-auto px-4">
        <p className="text-2xl font-bold mb-4">Thank you for visiting!</p>
        <div className="flex justify-center gap-6 mb-4 text-blue-600">
          <a href="mailto:dldnsgkr3326@gmail.com" className="hover:underline">
            Email
          </a>
          <a
            href="https://github.com/dldnsgkr"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © 2025 Lee Un Hak. All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
