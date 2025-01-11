const Section = ({ children }) => {
  return (
    <section className=" flex flex-col mt-12 pt-8 rounded-xl border-t border-t-[#1c2338] items-center gap-8">
      {children}
    </section>
  );
};

export default Section;
