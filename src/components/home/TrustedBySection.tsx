const brands = [
  "Stark Industries",
  "Acme Corp",
  "Globex",
  "TechFlow",
  "GrowthMasters",
];

const TrustedBySection = () => {
  return (
    <section className="py-4 sm:py-5">
      <p className="text-center text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase sm:text-sm">
        Trusted by Ambitious Founders and Scaling Brands
      </p>

      <div className="trusted-marquee mt-5">
        <div className="trusted-marquee-track">
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="trusted-marquee-item text-base font-semibold text-slate-300 sm:text-xl lg:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
