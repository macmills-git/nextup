const LargeTextBanner = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center select-none">
          <h2
            className="text-[8vw] md:text-[6vw] font-black tracking-tighter leading-none text-foreground/[0.04]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            EVENT NEST
          </h2>
        </div>
      </div>
    </section>
  );
};

export default LargeTextBanner;
