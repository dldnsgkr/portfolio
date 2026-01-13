import SectionTitle from "../SectionTitle";

const Contact = () => {
  return (
    <section className="min-h-screen flex flex-col p-6">
      <SectionTitle children="Contact" />
      <p className="text-muted dark:text-muted-dark max-w-2xl transition-colors duration-500 ease-in-out">
        Feel free to reach out for collaborations or just a friendly hello!
      </p>
    </section>
  );
};

export default Contact;
