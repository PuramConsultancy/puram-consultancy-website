import FooterBottom from "./FooterBottom";
import FooterCta from "./FooterCta";
import FooterMain from "./FooterMain";

export default function Footer() {
  return (
    <footer
      className="mt-20 bg-[var(--color-primary)] text-[var(--color-on-primary)]"
      style={{ fontFamily: '"Gill Sans MT", "Gill Sans", Calibri, Arial, sans-serif' }}
    >
      {/* Typography sample: AA BB CC DD EE FF GG HH II JJ KK LL MM NN OO PP QQ RR SS TT UU VV WW XX YY ZZ */}
      <FooterCta />
      <FooterMain />
      <FooterBottom />
    </footer>
  );
}

