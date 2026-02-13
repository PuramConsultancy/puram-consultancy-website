export default function FooterContact() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-on-primary)]">
        Contact
      </h3>
      <address className="mt-4 not-italic">
        <ul className="space-y-2.5">
          <li>
            <a
              href="mailto:puramconsultancy@gmail.com"
              className="text-sm text-[var(--color-on-primary-muted)] transition-colors hover:text-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
            >
              puramconsultancy@gmail.com
            </a>
          </li>
          <li>
            <a
              href="tel:+447503704769"
              className="text-sm text-[var(--color-on-primary-muted)] transition-colors hover:text-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
            >
              +44 7503 704769
            </a>
          </li>
          <li className="text-sm text-[var(--color-on-primary-muted)]">New City, NC</li>
          <li className="pt-2 text-sm text-[var(--color-on-primary-muted)]">
            Mon-Fri | 9AM-6PM
          </li>
          <li className="text-sm text-[var(--color-on-primary-muted)]">
            Response within 24 hours
          </li>
        </ul>
      </address>
    </div>
  );
}

