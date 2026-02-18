const brands = [
  "Stark Industries",
  "Acme Corp",
  "Globex",
  "TechFlow",
  "GrowthMasters",
];

const TrustedBySection = () => {
  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold tracking-[0.14em] uppercase text-slate-500 sm:text-base lg:text-xl">
          Trusted by Ambitious Founders and Scaling Brands
        </p>

        <div className="trusted-marquee mt-8 lg:mt-10">
          <div className="trusted-marquee-track">
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className="trusted-marquee-item text-lg font-semibold text-slate-300 sm:text-2xl lg:text-[2.5rem]"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
