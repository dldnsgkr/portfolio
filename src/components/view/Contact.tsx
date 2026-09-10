import SectionTitle from "../SectionTitle";

const Contact = () => {
  return (
    <section className="min-h-screen flex flex-col p-6">
      <SectionTitle children="Contact" />
      <p className="text-muted max-w-2xl">
        Feel free to reach out for collaborations or just a friendly hello!
      </p>
    </section>
  );
};

export default Contact;
